import { Session } from 'next-auth';

import type { UserType } from '@/features/auth/types';

/**
 * 경로에서 사용자 타입을 감지하는 함수
 * @param pathname - 현재 경로
 * @returns 사용자 타입 (owner | applicant | undefined)
 */
export const getUserTypeFromPath = (pathname: string): UserType | undefined => {
  if (pathname.startsWith('/owner')) {
    return 'owner';
  }
  if (pathname.startsWith('/applicant')) {
    return 'applicant';
  }
  return undefined;
};

/**
 * 세션에서 사용자 타입을 가져오는 함수 (향후 NextAuth 세션 완성 시 사용)
 * @param session - NextAuth 세션 객체
 * @returns 사용자 타입 (owner | applicant | undefined)
 */
export const getUserTypeFromSession = (
  _session: Session | null
): UserType | undefined => {
  // TODO: NextAuth 세션에서 사용자 타입을 가져오는 로직 구현, under score 삭제 후 사용
  // 예시: return session?.user?.role as UserType;
  return undefined;
};
