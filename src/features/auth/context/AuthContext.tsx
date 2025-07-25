'use client';

import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

import { useSessionUtils } from '@/shared/lib/auth/use-session-utils';

import {
  getAuthContentFromPath,
  getAuthContentFromSession,
} from '../utils/authContent';
import { getAuthPageType } from '../utils/authUtils';
import { getUserTypeFromPath, getUserTypeFromSession } from '../utils/userType';
import { AuthContext, type AuthContextValue } from './AuthContextValue';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const { session, isOwner, isApplicant } = useSessionUtils();

  const authPageType = getAuthPageType(pathname);
  const userTypeFromPath = getUserTypeFromPath(pathname);
  const userTypeFromSession = getUserTypeFromSession(session || null);
  const userType = userTypeFromSession || userTypeFromPath;

  const authContent = userTypeFromSession
    ? getAuthContentFromSession(session || null, authPageType)
    : getAuthContentFromPath(pathname, authPageType);

  const value: AuthContextValue = {
    authPageType,
    userType: userType || null,
    authContent,
    isOwner: isOwner,
    isApplicant: isApplicant,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
