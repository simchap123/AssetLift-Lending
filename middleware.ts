import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow login page and login API through unauthenticated
  if (pathname === '/portal' || pathname.startsWith('/portal/api/')) {
    return NextResponse.next();
  }

  // Protect all other /portal/* routes
  if (pathname.startsWith('/portal/')) {
    const auth = request.cookies.get('portal_auth');
    if (!auth || auth.value !== 'authenticated') {
      return NextResponse.redirect(new URL('/portal', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/portal/:path*',
};
