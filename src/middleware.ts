import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isPublicRoute = createRouteMatcher([
  '/',
  '/login(.*)',
  '/register(.*)',
]);

export default clerkMiddleware((auth, req) => {
  if (isPublicRoute(req)) {
    return NextResponse.next(); // public route
  }

  // private route → Clerk handle otomatis
  return NextResponse.next();
});

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    '/(api|trpc)(.*)',
  ],
};
