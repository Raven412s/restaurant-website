import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ✅ Redirect from '/' to '/en' (defaultLocale)
  if (pathname === '/') {
    return NextResponse.redirect(new URL(`/${routing.defaultLocale}`, request.url));
  }

  // Handle everything else via next-intl
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    // Match all routes except the following:
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ],
};
