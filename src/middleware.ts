import { type NextRequest, NextResponse } from 'next/server';

import { auth } from '@/auth';
import {
  getDefaultUserType,
  getRouteGroup,
  hasAccessPermission,
  ROUTE_PERMISSIONS,
} from '@/features/auth/utils/routePermissions';

// 타입 가드 함수
function isValidUserRole(role: unknown): role is 'OWNER' | 'APPLICANT' {
  return role === 'OWNER' || role === 'APPLICANT';
}

export async function middleware(request: NextRequest) {
  const session = await auth();
  const user = session?.user;
  const { pathname } = request.nextUrl;

  // API 라우트는 미들웨어 처리 제외
  if (pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  const routeGroup = getRouteGroup(pathname);

  // 라우트 그룹을 찾을 수 없는 경우 (예: 404 페이지 등)
  if (!routeGroup) {
    return NextResponse.next();
  }

  const permissions = ROUTE_PERMISSIONS[routeGroup];

  // 1. 인증이 필요한 페이지에 비인증 사용자 접근 시
  if (permissions.requiresAuth && !session?.user) {
    const redirectUrl = new URL(permissions.redirectTo!, request.url);

    // 인증 후 원래 페이지로 돌아가기 위해 returnUrl 설정
    redirectUrl.searchParams.set('returnUrl', pathname);

    return NextResponse.redirect(redirectUrl);
  }

  // 2. 이미 로그인한 사용자가 인증 페이지 접근 시
  if (permissions.redirectIfAuthenticated && session?.user) {
    return NextResponse.redirect(new URL(permissions.redirectTo!, request.url));
  }

  // 3. 인증 페이지에서 type 파라미터가 없으면 기본값 설정
  if (routeGroup === 'auth') {
    const url = new URL(request.url);
    if (!url.searchParams.has('type')) {
      const defaultType = getDefaultUserType(user?.role);
      url.searchParams.set('type', defaultType);
      return NextResponse.redirect(url);
    }
  }

  // 4. private 페이지에 대한 역할 기반 접근 제어
  if (routeGroup === 'private' && session?.user) {
    const userRole = user?.role;

    if (!userRole || !isValidUserRole(userRole)) {
      return NextResponse.redirect(new URL('/signin', request.url));
    }

    if (!hasAccessPermission(userRole, pathname, routeGroup)) {
      // 권한이 없는 경우 홈페이지로 리다이렉트
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

// 미들웨어가 실행될 경로 설정
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
};
