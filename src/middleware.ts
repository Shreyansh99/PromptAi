import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  // Log request for debugging
  console.log(`Middleware: ${req.method} ${req.url}`)

  // Auth callback handling - let it pass through
  if (req.nextUrl.pathname.startsWith('/auth/callback')) {
    console.log('Auth callback detected, allowing through')
    return NextResponse.next()
  }

  // For now, just log and pass through - client-side auth handling is sufficient
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
