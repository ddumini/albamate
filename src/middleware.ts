import { type NextRequest, NextResponse } from 'next/server';

import { auth } from '@/auth';
import { getUserTypeFromPath } from '@/features/auth/utils/userType';

const loginUserMatchers = ['/signin', '/signup'];

// 타입 가드 함수
function isValidUserRole(role: unknown): role is 'OWNER' | 'APPLICANT' {
  return role === 'OWNER' || role === 'APPLICANT';
}

export async function middleware(request: NextRequest) {
  const session = await auth();
  const user = session?.user;
  const { pathname } = request.nextUrl;

  // 로그인 유저 접근 제한 (Owner + Applicant)
  if (loginUserMatchers.includes(pathname)) {
    if (session) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    // auth 페이지에서 type 파라미터가 없으면 기본값 설정
    const url = new URL(request.url);
    if (!url.searchParams.has('type')) {
      // 세션에서 사용자 타입 우선 확인, 기본값: 지원자
      let defaultType: 'owner' | 'applicant' = 'applicant';

      if (user?.role && isValidUserRole(user.role)) {
        defaultType = user.role === 'OWNER' ? 'owner' : 'applicant';
      }

      url.searchParams.set('type', defaultType);
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  }

  // Owner 접근 제한
  const userTypeFromPath = getUserTypeFromPath(pathname);
  if (userTypeFromPath === 'owner') {
    if (!user?.role || user.role !== 'OWNER') {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  // Applicant 접근 제한
  if (userTypeFromPath === 'applicant') {
    if (!user?.role || user.role !== 'APPLICANT') {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}
