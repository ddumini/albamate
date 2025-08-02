import { createContext } from 'react';

import type { AuthContent, AuthPageType, UserType } from '../types';

// 임시 회원가입 데이터 타입
export interface TempSignUpData {
  email: string;
  password: string;
  role: 'OWNER' | 'APPLICANT';
}

export interface AuthContextValue {
  authPageType: AuthPageType;
  userType: UserType | null;
  authContent: AuthContent;
  isOwner: boolean;
  isApplicant: boolean;
  // 임시 회원가입 데이터 관리
  tempSignUpData: TempSignUpData | null;
  setTempSignUpData: (data: TempSignUpData | null) => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);
