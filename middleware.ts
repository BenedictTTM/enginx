import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const session = request.cookies.get('enginx_session');
  const { pathname } = request.nextUrl;

  // Protect /dashboard and /dashboard/* routes
  if (pathname.startsWith('/dashboard')) {
    if (!session || session.value !== 'authenticated') {
      const loginUrl = new URL('/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Redirect authenticated users away from /login
  if (pathname === '/login') {
    if (session && session.value === 'authenticated') {
      const dashboardUrl = new URL('/dashboard', request.url);
      return NextResponse.redirect(dashboardUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/login'],
};
