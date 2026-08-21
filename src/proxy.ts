import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export default function proxy(request: NextRequest) {
  const hasToken = request.cookies.get('dispo_access_token')?.value === 'granted'
  const path = request.nextUrl.pathname
  
  // Define which pages don't require the password
  const isPublicPage = path === '/' || path === '/unlock'

  // 1. If they have no token and try to access a private page, kick them to unlock
  if (!hasToken && !isPublicPage) {
    return NextResponse.redirect(new URL('/unlock', request.url))
  }
  
  if (hasToken && path === '/unlock') {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}