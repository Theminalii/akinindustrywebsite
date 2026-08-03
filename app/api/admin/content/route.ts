import { NextRequest, NextResponse } from 'next/server'

import type { AdminContentData } from '@/lib/admin/types'
import {
  readAdminContentConfig,
  writeAdminContentConfig,
} from '@/lib/server/admin-content-config'
import {
  ADMIN_SESSION_COOKIE,
  sessionMatchesAccount,
} from '@/lib/server/admin-session'
import { adminContentSchema } from '@/lib/server/admin-content-validation'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const noStoreHeaders = {
  'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
  'CDN-Cache-Control': 'no-store',
  'Vercel-CDN-Cache-Control': 'no-store',
}

function databaseErrorDetails(error: unknown) {
  if (typeof error !== 'object' || !error) {
    return { code: 'UNKNOWN', detail: 'Unknown database error' }
  }

  const value = error as { code?: unknown; sqlMessage?: unknown; message?: unknown }
  return {
    code: value.code ? String(value.code) : 'UNKNOWN',
    detail: value.sqlMessage ? String(value.sqlMessage) : String(value.message ?? 'Unknown database error'),
  }
}

export async function GET(request: NextRequest) {
  try {
    const { data, hasStoredData } = await readAdminContentConfig()
    const account = sessionMatchesAccount(
      request.cookies.get(ADMIN_SESSION_COOKIE)?.value,
      data.adminAccounts
    )
    const safeData = account
      ? data
      : {
          ...data,
          adminAccounts: [],
        }
    return NextResponse.json({ data: safeData, hasStoredData }, { headers: noStoreHeaders })
  } catch (error) {
    const { code } = databaseErrorDetails(error)
    console.error('Admin content database read failed:', error)
    return NextResponse.json(
      { error: 'database_unavailable', code },
      { status: 503, headers: noStoreHeaders }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { data: currentData } = await readAdminContentConfig()
    const account = sessionMatchesAccount(
      request.cookies.get(ADMIN_SESSION_COOKIE)?.value,
      currentData.adminAccounts
    )
    if (!account) {
      return NextResponse.json(
        { error: 'unauthorized' },
        { status: 401, headers: noStoreHeaders }
      )
    }

    const contentLength = Number(request.headers.get('content-length') || 0)
    if (contentLength > 12 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'payload_too_large' },
        { status: 413, headers: noStoreHeaders }
      )
    }

    const parsed = adminContentSchema.safeParse(await request.json())
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'invalid_content', issues: parsed.error.issues.slice(0, 10) },
        { status: 400, headers: noStoreHeaders }
      )
    }
    const data = await writeAdminContentConfig(parsed.data as AdminContentData)
    return NextResponse.json({ success: true, data }, { headers: noStoreHeaders })
  } catch (error) {
    const { code } = databaseErrorDetails(error)
    console.error('Admin content database write failed:', error)
    return NextResponse.json(
      { error: 'database_unavailable', code },
      { status: 503, headers: noStoreHeaders }
    )
  }
}
