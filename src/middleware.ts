import { clerkMiddleware } from '@clerk/nextjs/server'

export default clerkMiddleware(async (auth, request) => {
  const path = request.nextUrl.pathname
  
  // Standard JavaScript checks instead of the deprecated matcher
  const isPublicPage = 
    path === '/' || 
    path === '/unlock' ||
    path.startsWith('/docs') || 
    path.startsWith('/status') || 
    path.startsWith('/sign-in') || 
    path.startsWith('/sign-up')

  // If it's a private page, await the protect function
  if (!isPublicPage) {
    await auth.protect()
  }
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}