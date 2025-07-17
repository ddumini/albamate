'use client';

import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { ReactNode } from 'react';

import { AUTH_ROUTES } from '../constants/route';
import type { AuthPageType } from '../types';
import {
  getAuthContentFromPath,
  getAuthContentFromSession,
} from '../utils/authContent';
import { getUserTypeFromPath, getUserTypeFromSession } from '../utils/userType';
import { AuthContext, type AuthContextValue } from './AuthContextValue';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const { data: session } = useSession();

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
  const userTypeFromSession = getUserTypeFromSession(session);
  const userType = userTypeFromSession || userTypeFromPath;

  const authContent = userTypeFromSession
    ? getAuthContentFromSession(session, authPageType)
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
