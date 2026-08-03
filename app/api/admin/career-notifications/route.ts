import { NextRequest, NextResponse } from 'next/server'

import type { CareerNotificationSettings } from '@/lib/career-notifications'
import {
  readCareerNotificationConfig,
  writeCareerNotificationConfig,
} from '@/lib/server/career-notification-config'
import { readAdminContentConfig } from '@/lib/server/admin-content-config'
import { ADMIN_SESSION_COOKIE, sessionMatchesAccount } from '@/lib/server/admin-session'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const headers = { 'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0' }

async function isAuthorized(request: NextRequest) {
  const { data } = await readAdminContentConfig()
  return Boolean(
    sessionMatchesAccount(request.cookies.get(ADMIN_SESSION_COOKIE)?.value, data.adminAccounts)
  )
}

export async function GET(request: NextRequest) {
  try {
    if (!(await isAuthorized(request))) {
      return NextResponse.json({ error: 'unauthorized' }, { status: 401, headers })
    }
    return NextResponse.json(await readCareerNotificationConfig(), { headers })
  } catch {
    return NextResponse.json({ error: 'database_unavailable' }, { status: 503, headers })
  }
}

export async function PUT(request: NextRequest) {
  try {
    if (!(await isAuthorized(request))) {
      return NextResponse.json({ error: 'unauthorized' }, { status: 401, headers })
    }
    const body = (await request.json()) as CareerNotificationSettings
    return NextResponse.json(await writeCareerNotificationConfig(body), { headers })
  } catch {
    return NextResponse.json({ error: 'save_failed' }, { status: 503, headers })
  }
}
