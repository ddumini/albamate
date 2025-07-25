import { type NextRequest, NextResponse } from 'next/server';

import { auth } from '@/auth';
import { User } from '@/features/auth/types/auth.types';
import { getUserTypeFromPath } from '@/features/auth/utils/userType';

const loginUserMatchers = ['/signin', '/signup'];

export async function middleware(request: NextRequest) {
  const session = await auth();
  const user = session?.user as User | undefined;
  const { pathname } = request.nextUrl;

  // 로그인 유저 접근 제한 (Owner + Applicant)
  if (loginUserMatchers.includes(pathname)) {
    if (session) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    // auth 페이지에서 type 파라미터가 없으면 기본값 설정
    const url = new URL(request.url);
    if (!url.searchParams.has('type')) {
      // 세션에서 사용자 타입 우선 확인
      let defaultType = 'applicant'; // 기본값: 지원자

      if (user?.role) {
        defaultType = user.role === 'OWNER' ? 'owner' : 'applicant';
      }

      url.searchParams.set('type', defaultType);
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  }

  // Owner 접근 제한 - 기존 getUserTypeFromPath 함수 활용
  const userTypeFromPath = getUserTypeFromPath(pathname);
  if (userTypeFromPath === 'owner') {
    if (user?.role !== 'OWNER') {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  // Applicant 접근 제한
  if (userTypeFromPath === 'applicant') {
    if (user?.role !== 'APPLICANT') {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}
