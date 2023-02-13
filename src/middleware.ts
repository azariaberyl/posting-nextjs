// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const userCookie = request.cookies.get('_UserAccess') || '';
  const url = request.nextUrl.clone();

  if (userCookie) {
    // If there is login user, it will redirect to dashboard
    if (url.pathname === '/auth/login' || url.pathname === '/auth/register') {
      console.log('cookie');
      url.pathname = '/';
      return NextResponse.redirect(url);
    }
  }

  if (!userCookie) {
    if (url.pathname === '/' || url.pathname.startsWith('/add') || url.pathname.startsWith('/edit')) {
      console.log('nouser');
      // If there is no login user, it will redirect to login
      url.pathname = '/auth/login';
      return NextResponse.redirect(url);
    }
  }

  console.log('nothing', url.pathname);
}

export const config = {
  matcher: ['/add', '/', '/edit/[id]', '/auth/login', '/auth/register'],
};
