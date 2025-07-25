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
      // Referer 헤더를 확인하여 이전 페이지에서 온 사용자 타입 추론
      const referer = request.headers.get('referer');
      let defaultType = 'applicant'; // 기본값: 지원자

      if (referer) {
        const refererUrl = new URL(referer);
        const refererPath = refererUrl.pathname;

        // 이전 페이지가 owner 관련 페이지였다면 owner로 설정
        if (refererPath.startsWith('/owner') || refererPath.includes('owner')) {
          defaultType = 'owner';
        }
        // 이전 페이지가 applicant 관련 페이지였다면 applicant로 설정
        else if (
          refererPath.startsWith('/applicant') ||
          refererPath.includes('applicant')
        ) {
          defaultType = 'applicant';
        }
      }

      url.searchParams.set('type', defaultType);
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
