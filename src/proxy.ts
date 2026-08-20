import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export default function proxy(request: NextRequest) {
  const hasToken = request.cookies.get('dispo_access_token')?.value === 'granted'
  const path = request.nextUrl.pathname
  
  // Define which pages don't require the password
  const isPublicPage = path === '/' || path === '/unlock'

  // If they have no token and try to access a private page, kick them to unlock
  if (!hasToken && !isPublicPage) {
    return NextResponse.redirect(new URL('/unlock', request.url))
  }

  // If they already have the token and try to view the unlock page or landing page, send them to the dashboard
  if (hasToken && isPublicPage) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}