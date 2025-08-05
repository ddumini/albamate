'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

import { createAuthRoute } from '@/features/auth/constants/route';
import type { UserType } from '@/features/auth/types';

/**
 * 인증 페이지 네비게이션을 위한 커스텀 훅
 *
 * @example
 * const { switchToUserType, navigateToAuthPage, currentUserType } = useAuthNavigation();
 *
 * // 사장님으로 전환
 * switchToUserType('owner');
 *
 * // 지원자 회원가입으로 이동
 * navigateToAuthPage('signup', 'applicant');
 */
export const useAuthNavigation = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // 현재 사용자 타입
  const currentUserType = (() => {
    const typeParam = searchParams.get('type');
    return typeParam === 'owner' || typeParam === 'applicant'
      ? typeParam
      : null;
  })();

  /**
   * 다른 사용자 타입으로 전환
   * @param userType - 전환할 사용자 타입
   */
  const switchToUserType = useCallback(
    (userType: UserType) => {
      const newUrl = createAuthRoute.switchUserType(pathname, userType);
      router.push(newUrl);
    },
    [pathname, router]
  );

  /**
   * 특정 인증 페이지로 이동
   * @param pageType - 이동할 페이지 타입 (signin | signup | accountInfo)
   * @param userType - 사용자 타입 (기본값: 현재 사용자 타입)
   */
  const navigateToAuthPage = useCallback(
    (pageType: 'signin' | 'signup' | 'accountInfo', userType?: UserType) => {
      const targetUserType = userType || currentUserType || 'applicant';

      switch (pageType) {
        case 'signin':
          router.push(createAuthRoute.signin(targetUserType));
          break;
        case 'signup':
          router.push(createAuthRoute.signup(targetUserType));
          break;
        case 'accountInfo':
          router.push(createAuthRoute.accountInfo(targetUserType));
          break;
      }
    },
    [router, currentUserType]
  );

  /**
   * 현재 사용자 타입을 유지하면서 다른 페이지로 이동
   * @param pageType - 이동할 페이지 타입
   */
  const navigateWithCurrentType = useCallback(
    (pageType: 'signin' | 'signup' | 'accountInfo') => {
      navigateToAuthPage(pageType, currentUserType || 'applicant');
    },
    [navigateToAuthPage, currentUserType]
  );

  return {
    currentUserType,
    switchToUserType,
    navigateToAuthPage,
    navigateWithCurrentType,
  };
};
