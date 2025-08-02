import { ReadonlyURLSearchParams } from 'next/navigation';
import { Session } from 'next-auth';

import type { UserType } from '@/features/auth/types';

/**
 * 경로에서 사용자 타입을 감지하는 함수
 * @param pathname - 현재 경로
 * @returns 사용자 타입 (owner | applicant | undefined)
 */
export const getUserTypeFromPath = (pathname: string): UserType | undefined => {
  if (pathname.startsWith('/owner') || pathname.includes('/application/')) {
    return 'owner';
  }
  if (pathname.startsWith('/applicant')) {
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
