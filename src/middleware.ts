import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

// 1. Use Clerk's robust route matcher for your public pages
const isPublicRoute = createRouteMatcher([
  '/',
  '/unlock',
  '/docs(.*)',
  '/status(.*)',
  '/sign-in(.*)',
  '/sign-up(.*)'
])

export default clerkMiddleware(async (auth, request) => {
  // 2. Protect private routes. 
  // (Clerk's engine is smart enough to bypass this check for /__clerk internal files)
  if (!isPublicRoute(request)) {
    await auth.protect()
  }
})

export const config = {
  matcher: [
    '/__clerk/(.*)',
    // Skip Next.js internals and static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}