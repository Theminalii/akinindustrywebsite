import 'server-only'

const attempts = new Map<string, number[]>()

export function requestIp(request: Request) {
  return (
    request.headers.get('cf-connecting-ip') ||
    request.headers.get('x-real-ip') ||
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    'unknown'
  )
}

export function isRateLimited(key: string, limit: number, windowMs: number) {
  const now = Date.now()
  const recent = (attempts.get(key) ?? []).filter((timestamp) => now - timestamp < windowMs)
  recent.push(now)
  attempts.set(key, recent)

  if (attempts.size > 5_000) {
    for (const [storedKey, timestamps] of attempts) {
      if (!timestamps.some((timestamp) => now - timestamp < windowMs)) attempts.delete(storedKey)
    }
  }

  return recent.length > limit
}

export function hasValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= 254
}

export function hasOversizedFields(values: string[], maxLength: number) {
  return values.some((value) => value.length > maxLength)
}
