'use client';
import { useSearchParams } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { useEffect } from 'react';

import { ERROR_MESSAGES } from '@/features/auth/constants/auth.message';
import { getUserTypeFromQuery } from '@/features/auth/utils/userType';

/**
 * 인증 세션을 관리하는 커스텀 훅
 *
 * 기능:
 * - 세션 정보 제공
 * - 토큰 만료 시 자동 로그아웃 처리
 * - 에러 상태 모니터링
 */
export const useAuthSession = () => {
  const { data: session, status, update } = useSession();

  // 토큰 갱신 에러 감지 시 자동 로그아웃
  useEffect(() => {
    if (
      session &&
      'error' in session &&
      session.error === 'RefreshAccessTokenError'
    ) {
      console.warn('토큰 갱신 오류 감지. 로그아웃을 진행합니다.');
      signOut({
        callbackUrl: '/signin',
        redirect: true,
      });
    }
  }, [session]);

  /**
   * 세션 강제 갱신
   */
  const refreshSession = async () => {
    try {
      await update();
    } catch (error) {
      console.error('세션 갱신 실패:', error);
      // 사용자에게 알림(toast/alert 등)을 띄우거나 호출부에서 에러를 처리할 수 있도록 전파 (추후 구현)
      throw error;
    }
  };

  /**
   * 인증된 사용자인지 확인
   */
  const isAuthenticated =
    status === 'authenticated' &&
    session &&
    (!('error' in session) || session.error !== 'RefreshAccessTokenError');

  /**
   * 로딩 상태인지 확인
   */
  const isLoading = status === 'loading';

  /**
   * 에러 메시지 반환
   */
  const getErrorMessage = () => {
    if (
      session &&
      'error' in session &&
      session.error === 'RefreshAccessTokenError'
    ) {
      return ERROR_MESSAGES.TOKEN_REFRESH_FAILED;
    }
    return null;
  };

  return {
    session,
    status,
    isAuthenticated,
    isLoading,
    refreshSession,
    errorMessage: getErrorMessage(),
    user: session?.user || null,
    accessToken:
      session && 'accessToken' in session ? session.accessToken : null,
  };
};

/**
 * 쿼리 파라미터에서 사용자 타입을 가져오는 커스텀 훅
 *
 * @example
 
 * function AuthComponent() {
 *   const { userType } = useAuthQueryParams();
 *
 *   if (userType === 'owner') {
 *     return <OwnerForm />;
 *   }
 *
 *   return <ApplicantForm />;
 * }
 */
export const useAuthQueryParams = () => {
  const searchParams = useSearchParams();
  const userType = getUserTypeFromQuery(searchParams);

  return {
    userType,
    isOwner: userType === 'owner',
    isApplicant: userType === 'applicant',
  };
};
