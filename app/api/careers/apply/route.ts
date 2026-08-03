import { NextResponse } from 'next/server'

import type { CareerApplicationPayload } from '@/lib/career-notifications'
import { dispatchCareerApplication } from '@/lib/server/career-application-notifier'
import { readCareerNotificationConfig } from '@/lib/server/career-notification-config'
import {
  hasOversizedFields,
  hasValidEmail,
  isRateLimited,
  requestIp,
} from '@/lib/server/request-guard'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const MAX_REQUEST_BYTES = 6 * 1024 * 1024
const MAX_CV_BYTES = 5 * 1024 * 1024
const allowedCvTypes = new Set([
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
])
const responseHeaders = { 'Cache-Control': 'no-store' }

const fieldNames: (keyof CareerApplicationPayload)[] = [
  'fullName',
  'email',
  'phone',
  'city',
  'position',
  'department',
  'experienceYears',
  'education',
  'specialization',
  'currentCompany',
  'currentRole',
  'expectedSalary',
  'availability',
  'employmentType',
  'projectExperience',
  'softwareSkills',
  'certifications',
  'languages',
  'references',
  'coverLetter',
  'drivingLicense',
  'hseTraining',
  'travelReady',
  'shiftReady',
  'englishLevel',
  'cvFileName',
]

export async function POST(request: Request) {
  if (isRateLimited(`career:${requestIp(request)}`, 5, 10 * 60 * 1000)) {
    return NextResponse.json(
      { success: false, message: 'Çox sayda sorğu göndərildi. Bir qədər sonra yenidən sınayın.' },
      { status: 429, headers: responseHeaders }
    )
  }

  const contentLength = Number(request.headers.get('content-length') || 0)
  if (contentLength > MAX_REQUEST_BYTES) {
    return NextResponse.json(
      { success: false, message: 'Müraciət və CV faylı maksimum 6 MB ola bilər.' },
      { status: 413, headers: responseHeaders }
    )
  }

  const formData = await request.formData()
  const settings = await readCareerNotificationConfig()

  if (!settings.gmail.enabled && !settings.telegram.enabled && !settings.whatsapp.enabled) {
    return NextResponse.json(
      { success: false, message: 'Hazırda heç bir bildiriş kanalı aktiv deyil.' },
      { status: 503, headers: responseHeaders }
    )
  }

  const payload = fieldNames.reduce((acc, field) => {
    acc[field] = String(formData.get(field) || '')
    return acc
  }, {} as CareerApplicationPayload)

  if (!payload.fullName || !payload.email || !payload.phone || !payload.position || !payload.coverLetter) {
    return NextResponse.json(
      { success: false, message: 'Vacib sahələr tamamlanmayıb.' },
      { status: 400, headers: responseHeaders }
    )
  }

  if (!hasValidEmail(payload.email)) {
    return NextResponse.json(
      { success: false, message: 'Email ünvanı düzgün deyil.' },
      { status: 400, headers: responseHeaders }
    )
  }

  if (hasOversizedFields(Object.values(payload), 10_000)) {
    return NextResponse.json(
      { success: false, message: 'Müraciətdə icazə verilən həcmdən böyük mətn var.' },
      { status: 400, headers: responseHeaders }
    )
  }

  const cvFile = formData.get('cvFile')
  let attachment:
    | {
        buffer: Buffer
        filename: string
        mimeType: string
      }
    | undefined

  if (cvFile instanceof File && cvFile.size > 0) {
    if (cvFile.size > MAX_CV_BYTES) {
      return NextResponse.json(
        { success: false, message: 'CV faylı maksimum 5 MB ola bilər.' },
        { status: 413, headers: responseHeaders }
      )
    }
    if (!allowedCvTypes.has(cvFile.type)) {
      return NextResponse.json(
        { success: false, message: 'CV yalnız PDF, DOC və ya DOCX formatında olmalıdır.' },
        { status: 415, headers: responseHeaders }
      )
    }
    const arrayBuffer = await cvFile.arrayBuffer()
    attachment = {
      buffer: Buffer.from(arrayBuffer),
      filename: cvFile.name,
      mimeType: cvFile.type || 'application/octet-stream',
    }
  }

  const dispatchResult = await dispatchCareerApplication(settings, payload, attachment)

  if (dispatchResult.successCount === 0) {
    return NextResponse.json(
      {
        success: false,
        message: 'Müraciət heç bir aktiv kanala göndərilə bilmədi.',
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
          ? 'Müraciət aktiv kanallara göndərildi.'
          : 'Müraciət qismən göndərildi.',
      results: dispatchResult.results,
    },
    { headers: responseHeaders }
  )
}
