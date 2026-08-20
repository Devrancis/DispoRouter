import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const hasToken = request.cookies.get('dispo_access_token')?.value === 'granted'
  
  const isUnlockPage = request.nextUrl.pathname === '/unlock'

  // If they have no token and are trying to view the dashboard/submit, kick them to /unlock
  if (!hasToken && !isUnlockPage) {
    return NextResponse.redirect(new URL('/unlock', request.url))
  }

  // If they already have the token and try to view the unlock page, send them to the dashboard
  if (hasToken && isUnlockPage) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

// Tell Next.js to run this check on every page EXCEPT standard static files/images
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}