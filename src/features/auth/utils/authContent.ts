import type { Session } from 'next-auth';

import {
  AUTH_CONTENT_TEMPLATES,
  DEFAULT_AUTH_CONTENT,
} from '@/features/auth/constants/authContent';

import type { AuthContent, AuthPageType, UserType } from '../types';
import { getUserTypeFromPath, getUserTypeFromSession } from './userType';

/**
 * 사용자 타입에 따라 인증 콘텐츠를 동적으로 생성하는 함수
 */
export const getAuthContent = (
  pageType: AuthPageType,
  userType?: UserType
): AuthContent => {
  if (!userType) {
    return DEFAULT_AUTH_CONTENT[pageType];
  }
  return AUTH_CONTENT_TEMPLATES[userType][pageType];
};

/**
 * 경로와 페이지 타입을 기반으로 인증 콘텐츠를 가져오는 함수
 * @param pathname - 현재 경로
 * @param pageType - 인증 페이지 타입
 * @returns 해당 사용자 타입에 맞는 인증 콘텐츠
 */
export const getAuthContentFromPath = (
  pathname: string,
  pageType: AuthPageType
): AuthContent => {
  const userType = getUserTypeFromPath(pathname);
  return getAuthContent(pageType, userType);
};

/**
 * 세션과 페이지 타입을 기반으로 인증 콘텐츠를 가져오는 함수
 * @param session - NextAuth 세션 객체
 * @param pageType - 인증 페이지 타입
 * @returns 해당 사용자 타입에 맞는 인증 콘텐츠
 */
export const getAuthContentFromSession = (
  session: Session | null,
  pageType: AuthPageType
): AuthContent => {
  const userType = getUserTypeFromSession(session);
  return getAuthContent(pageType, userType);
};

// 기존 호환성을 위한 상수 (deprecated - getAuthContent 함수 사용 권장)
export const AUTH_CONTENT: Record<AuthPageType, AuthContent> =
  DEFAULT_AUTH_CONTENT;
