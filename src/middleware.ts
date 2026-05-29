// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // 쿠키에서 토큰 확인
  const token = request.cookies.get('access_token')?.value;

  // 사용자가 /admin으로 시작하는 페이지에 접근하려고 할 때
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // 토큰이 없다면 로그인 페이지로 리다이렉트
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

// 미들웨어가 실행될 경로 설정
export const config = {
  matcher: ['/admin/:path*'],
};