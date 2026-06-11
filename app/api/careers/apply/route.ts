import { NextResponse } from 'next/server'

import type { CareerApplicationPayload } from '@/lib/career-notifications'
import { dispatchCareerApplication } from '@/lib/server/career-application-notifier'
import { readCareerNotificationConfig } from '@/lib/server/career-notification-config'

export const runtime = 'nodejs'

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
  const formData = await request.formData()
  const settings = await readCareerNotificationConfig()

  if (!settings.gmail.enabled && !settings.telegram.enabled && !settings.whatsapp.enabled) {
    return NextResponse.json(
      { success: false, message: 'Hazırda heç bir bildiriş kanalı aktiv deyil.' },
      { status: 503 }
    )
  }

  const payload = fieldNames.reduce((acc, field) => {
    acc[field] = String(formData.get(field) || '')
    return acc
  }, {} as CareerApplicationPayload)

  if (!payload.fullName || !payload.email || !payload.phone || !payload.position || !payload.coverLetter) {
    return NextResponse.json(
      { success: false, message: 'Vacib sahələr tamamlanmayıb.' },
      { status: 400 }
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
      { status: 500 }
    )
  }

  return NextResponse.json({
    success: true,
    message:
      dispatchResult.successCount === dispatchResult.enabledCount
        ? 'Müraciət aktiv kanallara göndərildi.'
        : 'Müraciət qismən göndərildi.',
    results: dispatchResult.results,
  })
}
