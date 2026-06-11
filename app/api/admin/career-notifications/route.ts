import { NextResponse } from 'next/server'

import type { CareerNotificationSettings } from '@/lib/career-notifications'
import {
  readCareerNotificationConfig,
  writeCareerNotificationConfig,
} from '@/lib/server/career-notification-config'

export async function GET() {
  const config = await readCareerNotificationConfig()
  return NextResponse.json(config)
}

export async function PUT(request: Request) {
  const body = (await request.json()) as CareerNotificationSettings
  const saved = await writeCareerNotificationConfig(body)
  return NextResponse.json(saved)
}
