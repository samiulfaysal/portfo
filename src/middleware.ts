import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET
  });

  const { pathname } = req.nextUrl;

  // Protect admin routes
  if (pathname.startsWith('/admin') && !token) {
    const url = req.nextUrl.clone();
    url.pathname = '/admin/signin';
    return NextResponse.redirect(url);
  }

  // Redirect authenticated users away from sign-in page
  if (pathname === '/admin/signin' && token) {
    const url = req.nextUrl.clone();
    url.pathname = '/admin/dashboard';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};