import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'

const PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ?? ''
// Valid Clerk keys are pk_test_<base64-domain> or pk_live_<...> — always much longer than stubs
const hasValidKey = PUBLISHABLE_KEY.startsWith('pk_') && PUBLISHABLE_KEY.length > 30

const isPublicRoute = createRouteMatcher([
  '/',
  '/pricing',
  '/how-it-works',
  '/blog(.*)',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/api/webhooks(.*)',
])

// Clerk handler — created at module load, but only CALLED when we have a real key
// (key validation inside Clerk happens at request-processing time, not at creation time)
const clerkHandler = clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    const { userId } = await auth()
    if (!userId) {
      const signInUrl = new URL('/sign-in', req.url)
      signInUrl.searchParams.set('redirect_url', req.url)
      return NextResponse.redirect(signInUrl)
    }
  }
})

// Wrapper: skip Clerk entirely when no valid key (local dev without credentials)
export default function middleware(req: NextRequest) {
  if (!hasValidKey) return NextResponse.next()
  return (clerkHandler as (req: NextRequest) => Response | NextResponse | void)(req)
}

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
