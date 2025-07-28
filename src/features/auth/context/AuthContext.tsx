'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { ReactNode } from 'react';

import { useSessionUtils } from '@/shared/lib/auth/use-session-utils';

import {
  getAuthContentFromPath,
  getAuthContentFromQuery,
  getAuthContentFromSession,
} from '../utils/authContent';
import { getAuthPageType } from '../utils/authUtils';
import {
  getUserTypeFromPath,
  getUserTypeFromQuery,
  getUserTypeFromSession,
} from '../utils/userType';
import { AuthContext, type AuthContextValue } from './AuthContextValue';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { session, isOwner, isApplicant } = useSessionUtils();

  const authPageType = getAuthPageType(pathname);

  // 쿼리 파라미터에서 사용자 타입 감지
  const userTypeFromQuery = getUserTypeFromQuery(searchParams);

  const userTypeFromPath = getUserTypeFromPath(pathname);
  const userTypeFromSession = getUserTypeFromSession(session || null);

  // 우선순위: 쿼리 파라미터 > 세션 > 경로
  const userType = userTypeFromQuery || userTypeFromSession || userTypeFromPath;

  // authContent 결정 로직: 쿼리 파라미터 우선
  let authContent;
  if (userTypeFromQuery) {
    // 쿼리 파라미터가 있으면 쿼리 기반으로 결정
    authContent = getAuthContentFromQuery(searchParams, authPageType);
  } else if (userTypeFromSession) {
    // 세션이 있으면 세션 기반으로 결정
    authContent = getAuthContentFromSession(session || null, authPageType);
  } else {
    // 그 외에는 경로 기반으로 결정
    authContent = getAuthContentFromPath(pathname, authPageType);
  }

  const value: AuthContextValue = {
    authPageType,
    userType: userType || null,
    authContent,
    isOwner: isOwner,
    isApplicant: isApplicant,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
