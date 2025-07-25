import { type NextRequest, NextResponse } from 'next/server';

import { auth } from '@/auth';

const ownerMatchers = ['/owner'];
const applicantMatchers = ['/applicant'];
const loginUserMatchers = ['/signin', '/signup'];

export async function middleware(request: NextRequest) {
  const session = await auth();
  const { pathname } = request.nextUrl;

  // 로그인 유저 접근 제한 (Owner + Applicant)
  if (loginUserMatchers.includes(pathname)) {
    if (session) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    // auth 페이지에서 type 파라미터가 없으면 기본값 설정
    const url = new URL(request.url);
    if (!url.searchParams.has('type')) {
      url.searchParams.set('type', 'worker'); // 기본값: 지원자
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  }

  // Owner 접근 제한
  if (ownerMatchers.includes(pathname)) {
    if (session?.user?.role !== 'OWNER') {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  // Applicant 접근 제한
  if (applicantMatchers.includes(pathname)) {
    if (session?.user?.role !== 'APPLICANT') {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}
