import { NextResponse } from 'next/server'

import type { ContactFormPayload } from '@/lib/contact-notifications'
import { dispatchContactForm } from '@/lib/server/contact-form-notifier'
import { readContactNotificationConfig } from '@/lib/server/contact-notification-config'

export const runtime = 'nodejs'

const fieldNames: (keyof ContactFormPayload)[] = ['fullName', 'email', 'phone', 'subject', 'message']

export async function POST(request: Request) {
  const body = (await request.json()) as Partial<ContactFormPayload>
  const settings = await readContactNotificationConfig()

  if (!settings.gmail.enabled && !settings.whatsapp.enabled) {
    return NextResponse.json(
      { success: false, message: 'Hazırda heç bir contact bildiriş kanalı aktiv deyil.' },
      { status: 503 }
    )
  }

  const payload = fieldNames.reduce((acc, field) => {
    acc[field] = String(body[field] || '')
    return acc
  }, {} as ContactFormPayload)

  if (!payload.fullName || !payload.email || !payload.phone || !payload.message) {
    return NextResponse.json(
      { success: false, message: 'Vacib sahələr tamamlanmayıb.' },
      { status: 400 }
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
      { status: 500 }
    )
  }

  return NextResponse.json({
    success: true,
    message:
      dispatchResult.successCount === dispatchResult.enabledCount
        ? 'Mesaj aktiv kanallara göndərildi.'
        : 'Mesaj qismən göndərildi.',
    results: dispatchResult.results,
  })
}
