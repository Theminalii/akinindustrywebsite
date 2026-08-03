import { NextResponse } from 'next/server'

import type { ContactFormPayload } from '@/lib/contact-notifications'
import { dispatchContactForm } from '@/lib/server/contact-form-notifier'
import { readContactNotificationConfig } from '@/lib/server/contact-notification-config'
import {
  hasOversizedFields,
  hasValidEmail,
  isRateLimited,
  requestIp,
} from '@/lib/server/request-guard'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
const responseHeaders = { 'Cache-Control': 'no-store' }

const fieldNames: (keyof ContactFormPayload)[] = ['fullName', 'email', 'phone', 'subject', 'message']

export async function POST(request: Request) {
  if (isRateLimited(`contact:${requestIp(request)}`, 8, 10 * 60 * 1000)) {
    return NextResponse.json(
      { success: false, message: 'Çox sayda sorğu göndərildi. Bir qədər sonra yenidən sınayın.' },
      { status: 429, headers: responseHeaders }
    )
  }

  const contentLength = Number(request.headers.get('content-length') || 0)
  if (contentLength > 64 * 1024) {
    return NextResponse.json(
      { success: false, message: 'Mesaj icazə verilən həcmdən böyükdür.' },
      { status: 413, headers: responseHeaders }
    )
  }

  const body = (await request.json()) as Partial<ContactFormPayload>
  const settings = await readContactNotificationConfig()

  if (!settings.gmail.enabled && !settings.whatsapp.enabled) {
    return NextResponse.json(
      { success: false, message: 'Hazırda heç bir contact bildiriş kanalı aktiv deyil.' },
      { status: 503, headers: responseHeaders }
    )
  }

  const payload = fieldNames.reduce((acc, field) => {
    acc[field] = String(body[field] || '')
    return acc
  }, {} as ContactFormPayload)

  if (!payload.fullName || !payload.email || !payload.phone || !payload.message) {
    return NextResponse.json(
      { success: false, message: 'Vacib sahələr tamamlanmayıb.' },
      { status: 400, headers: responseHeaders }
    )
  }

  if (!hasValidEmail(payload.email) || hasOversizedFields(Object.values(payload), 10_000)) {
    return NextResponse.json(
      { success: false, message: 'Email və ya mesaj formatı düzgün deyil.' },
      { status: 400, headers: responseHeaders }
    )
  }

  const dispatchResult = await dispatchContactForm(settings, payload)

  if (dispatchResult.successCount === 0) {
    return NextResponse.json(
      {
        success: false,
        message: 'Mesaj heç bir aktiv kanala göndərilə bilmədi.',
        results: dispatchResult.results,
      },
      { status: 500, headers: responseHeaders }
    )
  }

  return NextResponse.json(
    {
      success: true,
      message:
        dispatchResult.successCount === dispatchResult.enabledCount
          ? 'Mesaj aktiv kanallara göndərildi.'
          : 'Mesaj qismən göndərildi.',
      results: dispatchResult.results,
    },
    { headers: responseHeaders }
  )
}
