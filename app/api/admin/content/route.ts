import { NextResponse } from 'next/server'

import type { AdminContentData } from '@/lib/admin/types'
import {
  readAdminContentConfig,
  writeAdminContentConfig,
} from '@/lib/server/admin-content-config'

export const runtime = 'nodejs'

export async function GET() {
  try {
    const { data, hasStoredData } = await readAdminContentConfig()
    return NextResponse.json({ data, hasStoredData })
  } catch (error) {
    const code =
      typeof error === 'object' && error && 'code' in error ? String(error.code) : 'UNKNOWN'
    console.error('Admin content database read failed:', error)
    return NextResponse.json({ error: 'database_unavailable', code }, { status: 503 })
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as AdminContentData
    const data = await writeAdminContentConfig(body)
    return NextResponse.json({ success: true, data })
  } catch (error) {
    const code =
      typeof error === 'object' && error && 'code' in error ? String(error.code) : 'UNKNOWN'
    console.error('Admin content database write failed:', error)
    return NextResponse.json({ error: 'database_unavailable', code }, { status: 503 })
  }
}
