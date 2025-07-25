import { AUTH_ROUTES } from '../constants/route';
import type { AuthPageType } from '../types';

/**
 * 경로에서 인증 페이지 타입을 가져오는 함수
 *
 * @example
 * ```typescript
 * // AuthContext에서 사용
 * const authPageType = getAuthPageType(pathname);
 *
 * // AuthTitleArea에서 사용
 * const authPageType = getAuthPageType(pathname);
 * const { title, description } = getAuthContentFromPath(pathname, authPageType);
 * ```
 */
export const getAuthPageType = (pathname: string): AuthPageType => {
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
