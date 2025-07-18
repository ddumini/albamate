import { createContext } from 'react';

import type { AuthContent, AuthPageType, UserType } from '../types';

export interface AuthContextValue {
  authPageType: AuthPageType;
  userType: UserType | null;
  authContent: AuthContent;
  isOwner: boolean;
  isApplicant: boolean;
}

export const AuthContext = createContext<AuthContextValue | null>(null);
