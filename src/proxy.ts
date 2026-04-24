import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function proxy(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const { pathname } = req.nextUrl;

  if (pathname.startsWith('/admin') && pathname !== '/admin/signin' && !token) {
    const url = req.nextUrl.clone();
    url.pathname = '/admin/signin';
    return NextResponse.redirect(url);
  }

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
