import { ReadonlyURLSearchParams } from 'next/navigation';
import { Session } from 'next-auth';

import type { UserType } from '@/features/auth/types';

import { mapBackendRoleToUserType } from './routePermissions';

/**
 * 경로에서 사용자 타입을 감지하는 함수 (하위 호환성을 위해 유지)
 * @deprecated 새로운 라우트 그룹 기반 구조에서는 getRouteGroup을 사용하세요
 * @param pathname - 현재 경로
 * @returns 사용자 타입 (owner | applicant | undefined)
 */
export const getUserTypeFromPath = (pathname: string): UserType | undefined => {
  // 새로운 라우트 그룹 기반 로직으로 변경
  if (
    pathname.startsWith('/addform') ||
    pathname.startsWith('/myalbalist') ||
    pathname.startsWith('/application')
  ) {
    return 'owner';
  }
  if (pathname.startsWith('/myapply')) {
    return 'applicant';
  }
  return undefined;
};

/**
 * 쿼리 파라미터에서 사용자 타입을 감지하는 함수
 * @param searchParams - URL 검색 파라미터
 * @returns 사용자 타입 (owner | applicant | undefined)
 */
export const getUserTypeFromQuery = (
  searchParams: ReadonlyURLSearchParams | null
): UserType | undefined => {
  if (!searchParams) return undefined;

  const type = searchParams.get('type');
  if (type === 'owner' || type === 'applicant') {
    return type;
  }
  return undefined;
};

/**
 * 세션에서 사용자 타입을 가져오는 함수
 * @param session - NextAuth 세션 객체
 * @returns 사용자 타입 (owner | applicant | undefined)
 */
export const getUserTypeFromSession = (
  session: Session | null
): UserType | undefined => {
  if (!session?.user?.role) return undefined;

  // 백엔드에서 받은 역할을 프론트엔드 타입으로 매핑
  switch (session.user.role) {
    case 'OWNER':
      return 'owner';
    case 'APPLICANT':
      return 'applicant';
    default:
      return undefined;
  }
};

/**
 * 세션에서 사용자 타입을 가져오는 함수 (새로운 방식)
 * @param session - NextAuth 세션 객체
 * @returns 사용자 타입 (owner | applicant | undefined)
 */
export const getUserTypeFromSessionNew = (
  session: Session | null
): UserType | undefined => {
  if (!session?.user?.role) return undefined;

  // 새로운 유틸리티 함수 사용
  return mapBackendRoleToUserType(session.user.role as 'OWNER' | 'APPLICANT');
};

/**
 * 사용자 타입 결정 우선순위 함수
 * @param pathname - 현재 경로
 * @param searchParams - URL 검색 파라미터
 * @param session - NextAuth 세션 객체
 * @returns 결정된 사용자 타입
 */
export const determineUserType = (
  pathname: string,
  searchParams: ReadonlyURLSearchParams | null,
  session: Session | null
): UserType | undefined => {
  // 우선순위: 쿼리 파라미터 > 세션 > 경로
  const userTypeFromQuery = getUserTypeFromQuery(searchParams);
  if (userTypeFromQuery) return userTypeFromQuery;

  const userTypeFromSession = getUserTypeFromSession(session);
  if (userTypeFromSession) return userTypeFromSession;

  return getUserTypeFromPath(pathname);
};
