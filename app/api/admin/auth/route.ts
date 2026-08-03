import { NextRequest, NextResponse } from 'next/server'

import {
  ADMIN_SESSION_COOKIE,
  adminSessionCookieOptions,
  createAdminSession,
  sessionMatchesAccount,
} from '@/lib/server/admin-session'
import { readAdminContentConfig } from '@/lib/server/admin-content-config'
import { isRateLimited, requestIp } from '@/lib/server/request-guard'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const headers = { 'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0' }

export async function GET(request: NextRequest) {
  try {
    const { data } = await readAdminContentConfig()
    const account = sessionMatchesAccount(
      request.cookies.get(ADMIN_SESSION_COOKIE)?.value,
      data.adminAccounts
    )
    return NextResponse.json(
      { authenticated: Boolean(account), email: account?.email ?? null },
      { headers }
    )
  } catch {
    return NextResponse.json({ authenticated: false, email: null }, { headers })
  }
}

export async function POST(request: NextRequest) {
  try {
    if (isRateLimited(`admin-login:${requestIp(request)}`, 8, 15 * 60 * 1000)) {
      return NextResponse.json(
        { authenticated: false, error: 'too_many_attempts' },
        { status: 429, headers }
      )
    }

    const body = (await request.json()) as { email?: string; password?: string }
    const email = body.email?.trim().toLowerCase() ?? ''
    const password = body.password ?? ''
    const { data } = await readAdminContentConfig()
    const account = data.adminAccounts.find(
      (item) => item.email.trim().toLowerCase() === email && item.password === password
    )

    if (!account || !password) {
      return NextResponse.json({ authenticated: false }, { status: 401, headers })
    }

    const response = NextResponse.json(
      { authenticated: true, email: account.email },
      { headers }
    )
    response.cookies.set(
      ADMIN_SESSION_COOKIE,
      createAdminSession(account.email),
      adminSessionCookieOptions
    )
    return response
  } catch {
    return NextResponse.json({ authenticated: false }, { status: 503, headers })
  }
}

export async function DELETE() {
  const response = NextResponse.json({ authenticated: false }, { headers })
  response.cookies.set(ADMIN_SESSION_COOKIE, '', {
    ...adminSessionCookieOptions,
    maxAge: 0,
  })
  return response
}
