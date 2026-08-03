import 'server-only'

import { createHmac, timingSafeEqual } from 'node:crypto'

import type { AdminAccount } from '@/lib/admin/types'

export const ADMIN_SESSION_COOKIE = 'akin_admin_session'
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 12

function sessionSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET?.trim() || process.env.MYSQL_PASSWORD?.trim()
  if (!secret) throw new Error('ADMIN_SESSION_SECRET or MYSQL_PASSWORD is required.')
  return secret
}

function signature(value: string) {
  return createHmac('sha256', sessionSecret()).update(value).digest('base64url')
}

export function createAdminSession(email: string) {
  const expiresAt = Date.now() + SESSION_MAX_AGE_SECONDS * 1000
  const payload = Buffer.from(
    JSON.stringify({ email: email.trim().toLowerCase(), expiresAt })
  ).toString('base64url')
  return `${payload}.${signature(payload)}`
}

export function readAdminSession(token?: string) {
  if (!token) return null
  const [payload, suppliedSignature] = token.split('.')
  if (!payload || !suppliedSignature) return null

  const expectedSignature = signature(payload)
  const supplied = Buffer.from(suppliedSignature)
  const expected = Buffer.from(expectedSignature)
  if (supplied.length !== expected.length || !timingSafeEqual(supplied, expected)) return null

  try {
    const value = JSON.parse(Buffer.from(payload, 'base64url').toString()) as {
      email?: string
      expiresAt?: number
    }
    if (!value.email || !value.expiresAt || value.expiresAt <= Date.now()) return null
    return value.email.trim().toLowerCase()
  } catch {
    return null
  }
}

export function sessionMatchesAccount(token: string | undefined, accounts: AdminAccount[]) {
  const email = readAdminSession(token)
  if (!email) return null
  return accounts.find((account) => account.email.trim().toLowerCase() === email) ?? null
}

export const adminSessionCookieOptions = {
  httpOnly: true,
  sameSite: 'strict' as const,
  secure: process.env.NODE_ENV === 'production',
  path: '/',
  maxAge: SESSION_MAX_AGE_SECONDS,
}
