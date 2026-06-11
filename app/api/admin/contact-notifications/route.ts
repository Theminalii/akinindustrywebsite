import { NextResponse } from 'next/server'

import type { ContactNotificationSettings } from '@/lib/contact-notifications'
import {
  readContactNotificationConfig,
  writeContactNotificationConfig,
} from '@/lib/server/contact-notification-config'

export async function GET() {
  const config = await readContactNotificationConfig()
  return NextResponse.json(config)
}

export async function PUT(request: Request) {
  const body = (await request.json()) as ContactNotificationSettings
  const saved = await writeContactNotificationConfig(body)
  return NextResponse.json(saved)
}
