import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const CANONICAL_HOST = 'assetliftlending.com';

export function middleware(request: NextRequest) {
  const { nextUrl, headers } = request;
  const forwardedProto = headers.get('x-forwarded-proto');
  const rawForwardedHost = headers.get('x-forwarded-host') ?? headers.get('host') ?? nextUrl.host;
  const forwardedHost = rawForwardedHost.split(':')[0];

  if (forwardedHost === `www.${CANONICAL_HOST}`) {
    const redirectUrl = new URL(request.url);
    redirectUrl.host = CANONICAL_HOST;
    redirectUrl.protocol = 'https:';
    return NextResponse.redirect(redirectUrl, 301);
  }

  if (forwardedProto === 'http') {
    const redirectUrl = new URL(request.url);
    redirectUrl.protocol = 'https:';
    redirectUrl.host = CANONICAL_HOST;
    return NextResponse.redirect(redirectUrl, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
