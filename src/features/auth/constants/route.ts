export const AUTH_ROUTES = {
  SIGNIN: '/signin',
  SIGNUP: '/signup',
  ACCOUNT_INFO: '/account-info',
} as const;

export type AuthRoute = (typeof AUTH_ROUTES)[keyof typeof AUTH_ROUTES];

/**
 * 사용자 타입별 인증 라우트 생성 유틸리티
 */
export const createAuthRoute = {
  /**
   * 로그인 페이지 URL 생성
   * @param userType - 사용자 타입 (owner | applicant)
   * @returns 로그인 페이지 URL
   */
  signin: (userType: 'owner' | 'applicant') =>
    `${AUTH_ROUTES.SIGNIN}?type=${userType}`,

  /**
   * 회원가입 페이지 URL 생성
   * @param userType - 사용자 타입 (owner | applicant)
   * @returns 회원가입 페이지 URL
   */
  signup: (userType: 'owner' | 'applicant') =>
    `${AUTH_ROUTES.SIGNUP}?type=${userType}`,

  /**
   * 계정 정보 페이지 URL 생성
   * @param userType - 사용자 타입 (owner | applicant)
   * @returns 계정 정보 페이지 URL
   */
  accountInfo: (userType: 'owner' | 'applicant') =>
    `${AUTH_ROUTES.ACCOUNT_INFO}?type=${userType}`,

  /**
   * 현재 페이지에서 다른 사용자 타입으로 전환하는 URL 생성
   * @param currentPathname - 현재 경로
   * @param userType - 전환할 사용자 타입
   * @returns 전환된 URL
   */
  switchUserType: (
    currentPathname: string,
    userType: 'owner' | 'applicant'
  ) => {
    const baseRoute = Object.values(AUTH_ROUTES).find(route =>
      currentPathname.startsWith(route)
    );

    if (!baseRoute) {
      // 인증 페이지가 아닌 경우 기본 로그인 페이지로
      return createAuthRoute.signin(userType);
    }

    return `${baseRoute}?type=${userType}`;
  },
};
