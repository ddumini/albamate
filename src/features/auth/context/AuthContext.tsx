'use client';

import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

import { AUTH_ROUTES } from '../constants/route';
import { mockUser } from '../mocks';
import type { AuthPageType } from '../types';
import {
  getAuthContentFromPath,
  getAuthContentFromSession,
} from '../utils/authContent';
import { getUserTypeFromPath, getUserTypeFromSession } from '../utils/userType';
import { AuthContext, type AuthContextValue } from './AuthContextValue';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();

  // 임시로 mock 세션 사용
  const mockSession = {
    user: mockUser,
    expires: '2099-12-31T23:59:59.999Z',
  };

  const getAuthPageType = (pathname: string): AuthPageType => {
    switch (pathname) {
      case AUTH_ROUTES.SIGNIN:
        return 'signin';
      case AUTH_ROUTES.SIGNUP:
        return 'signup';
      case AUTH_ROUTES.ACCOUNT_INFO:
        return 'accountInfo';
      default:
        return 'signin';
    }
  };

  const authPageType = getAuthPageType(pathname);
  const userTypeFromPath = getUserTypeFromPath(pathname);
  const userTypeFromSession = getUserTypeFromSession(mockSession);
  const userType = userTypeFromSession || userTypeFromPath;

  const authContent = userTypeFromSession
    ? getAuthContentFromSession(mockSession, authPageType)
    : getAuthContentFromPath(pathname, authPageType);

  const value: AuthContextValue = {
    authPageType,
    userType: userType || null,
    authContent,
    isOwner: userType === 'owner',
    isApplicant: userType === 'applicant',
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
