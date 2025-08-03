import type { UserType } from '@/features/auth/types';

/**
 * 라우트 그룹별 접근 권한 정의
 */
export const ROUTE_PERMISSIONS = {
  // 인증 페이지 (로그인/회원가입)
  auth: {
    requiresAuth: false,
    redirectIfAuthenticated: true,
    redirectTo: '/',
  },
  // 비공개 페이지 (로그인 필수)
  private: {
    requiresAuth: true,
    redirectIfAuthenticated: false,
    redirectTo: '/signin',
  },
  // 공개 페이지 (모든 사용자 접근 가능)
  public: {
    requiresAuth: false,
    redirectIfAuthenticated: false,
    redirectTo: null,
  },
} as const;

/**
 * 역할별 접근 가능한 페이지 정의
 */
export const ROLE_ACCESS = {
  OWNER: {
    // 사장님이 접근 가능한 private 페이지들
    private: [
      '/addform', // 알바폼 등록
      '/myalbalist', // 내 알바 목록
      '/application', // 지원자 관리
      '/mypage', // 마이페이지
    ],
    // 사장님이 접근 가능한 public 페이지들 (모든 public 페이지 접근 가능)
    public: ['*'],
  },
  APPLICANT: {
    // 지원자가 접근 가능한 private 페이지들
    private: [
      '/myalbalist', // 내 알바 지원 목록
      '/myapply', // 내 지원 상세
      '/mypage', // 마이페이지
    ],
    // 지원자가 접근 가능한 public 페이지들 (모든 public 페이지 접근 가능)
    public: ['*'],
  },
} as const;

/**
 * 경로에서 라우트 그룹을 추출하는 함수
 * @param pathname - 현재 경로
 * @returns 라우트 그룹 (auth | private | public | null)
 */
export function getRouteGroup(
  pathname: string
): keyof typeof ROUTE_PERMISSIONS | null {
  // API 라우트는 제외
  if (pathname.startsWith('/api/')) {
    return null;
  }

  // 인증 페이지 확인
  if (
    pathname.startsWith('/signin') ||
    pathname.startsWith('/signup') ||
    pathname.startsWith('/account-info')
  ) {
    return 'auth';
  }

  // private 라우트 그룹 확인
  if (
    pathname.startsWith('/addform') ||
    pathname.startsWith('/myalbalist') ||
    pathname.startsWith('/application') ||
    pathname.startsWith('/myapply') ||
    pathname.startsWith('/mypage')
  ) {
    return 'private';
  }

  // public 라우트 그룹 (기본값)
  return 'public';
}

/**
 * 사용자가 특정 경로에 접근할 권한이 있는지 확인하는 함수
 * @param userRole - 사용자 역할 (OWNER | APPLICANT | undefined)
 * @param pathname - 접근하려는 경로
 * @param routeGroup - 라우트 그룹
 * @returns 접근 권한 여부
 */
export function hasAccessPermission(
  userRole: 'OWNER' | 'APPLICANT' | undefined,
  pathname: string,
  routeGroup: keyof typeof ROUTE_PERMISSIONS
): boolean {
  // public 페이지는 모든 사용자가 접근 가능
  if (routeGroup === 'public') {
    return true;
  }

  // auth 페이지는 모든 사용자가 접근 가능
  if (routeGroup === 'auth') {
    return true;
  }

  // private 페이지는 역할 기반 접근 제어
  if (routeGroup === 'private' && userRole) {
    const allowedPaths = ROLE_ACCESS[userRole].private;
    return allowedPaths.some(path => pathname.startsWith(path));
  }

  return false;
}

/**
 * 기본 사용자 타입을 결정하는 함수
 * @param userRole - 사용자 역할
 * @returns 기본 사용자 타입
 */
export function getDefaultUserType(
  userRole: 'OWNER' | 'APPLICANT' | undefined
): UserType {
  if (userRole === 'OWNER') {
    return 'owner';
  }
  return 'applicant';
}

/**
 * 사용자 역할을 프론트엔드 타입으로 변환하는 함수
 * @param role - 백엔드 역할 (OWNER | APPLICANT)
 * @returns 프론트엔드 사용자 타입
 */
export function mapBackendRoleToUserType(
  role: 'OWNER' | 'APPLICANT'
): UserType {
  return role === 'OWNER' ? 'owner' : 'applicant';
}

/**
 * 프론트엔드 타입을 백엔드 역할로 변환하는 함수
 * @param userType - 프론트엔드 사용자 타입
 * @returns 백엔드 역할
 */
export function mapUserTypeToBackendRole(
  userType: UserType
): 'OWNER' | 'APPLICANT' {
  return userType === 'owner' ? 'OWNER' : 'APPLICANT';
}
