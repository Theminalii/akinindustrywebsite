import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

function unauthorizedResponse() {
  return new NextResponse('Authentication required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area"',
    },
  })
}

export function proxy(request: NextRequest) {
  const adminUsername = process.env.ADMIN_USERNAME
  const adminPassword = process.env.ADMIN_PASSWORD

  if (!adminUsername || !adminPassword) {
    return NextResponse.next()
  }

  const authHeader = request.headers.get('authorization')

  if (!authHeader?.startsWith('Basic ')) {
    return unauthorizedResponse()
  }

  const encodedCredentials = authHeader.split(' ')[1]
  const decodedCredentials = Buffer.from(encodedCredentials, 'base64').toString('utf-8')
  const [username, password] = decodedCredentials.split(':')

  if (username !== adminUsername || password !== adminPassword) {
    return unauthorizedResponse()
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
}
