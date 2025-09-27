import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isPublicRoute = createRouteMatcher([
  '/',              
  '/login(.*)',     
  '/register(.*)',  
  '/api/webhooks/(.*)', // Add webhook routes if any
])

export default clerkMiddleware((auth, req) => {
  // Remove async/await - not needed here
  if (!isPublicRoute(req)) {
    auth.protect()
  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}