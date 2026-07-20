import { NextResponse } from 'next/server'

import type { AdminContentData } from '@/lib/admin/types'
import {
  readAdminContentConfig,
  writeAdminContentConfig,
} from '@/lib/server/admin-content-config'

export const runtime = 'nodejs'

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

export async function GET() {
  try {
    const { data, hasStoredData } = await readAdminContentConfig()
    return NextResponse.json({ data, hasStoredData })
  } catch (error) {
    const { code, detail } = databaseErrorDetails(error)
    console.error('Admin content database read failed:', error)
    return NextResponse.json({ error: 'database_unavailable', code, detail }, { status: 503 })
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as AdminContentData
    const data = await writeAdminContentConfig(body)
    return NextResponse.json({ success: true, data })
  } catch (error) {
    const { code, detail } = databaseErrorDetails(error)
    console.error('Admin content database write failed:', error)
    return NextResponse.json({ error: 'database_unavailable', code, detail }, { status: 503 })
  }
}
