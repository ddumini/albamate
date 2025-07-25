'use client';

import {
  useRefreshSessionMutation,
  useSessionQuery,
  useUserQuery,
} from './session-query';

/**
 * TanStack Query 기반 세션 유틸리티 훅
 *
 * 세션 관리에 필요한 모든 기능을 통합하여 제공하는 편의 훅입니다.
 *
 * @example
 *
 * ```typescript
 * // 기본 사용법 - 인증 상태 확인
 * function AuthGuard({ children }: { children: React.ReactNode }) {
 *   const { isAuthenticated, isLoading } = useSessionUtils();
 *
 *   if (isLoading) return <div>인증 확인 중...</div>;
 *   if (!isAuthenticated) return <div>로그인이 필요합니다.</div>;
 *
 *   return <>{children}</>;
 * }
 *
 * // 사용자 역할에 따른 조건부 렌더링
 * function Dashboard() {
 *   const { isOwner, isApplicant, user } = useSessionUtils();
 *
 *   return (
 *     <div>
 *       <h1>안녕하세요, {user?.name}님!</h1>
 *
 *       {isOwner && (
 *         <div>
 *           <h2>사장님 대시보드</h2>
 *           <OwnerFeatures />
 *         </div>
 *       )}
 *
 *       {isApplicant && (
 *         <div>
 *           <h2>알바생 대시보드</h2>
 *           <ApplicantFeatures />
 *         </div>
 *       )}
 *     </div>
 *   );
 * }
 *
 * // 동적 권한 확인
 * function ProtectedComponent() {
 *   const { hasRole, isAuthenticated } = useSessionUtils();
 *
 *   if (!isAuthenticated) {
 *     return <div>로그인이 필요합니다.</div>;
 *   }
 *
 *   // 특정 역할만 접근 가능한 기능
 *   if (hasRole('OWNER')) {
 *     return (
 *       <div>
 *         <h2>관리자 전용 기능</h2>
 *         <AdminPanel />
 *       </div>
 *     );
 *   }
 *
 *   return <div>접근 권한이 없습니다.</div>;
 * }
 *
 * // 세션 갱신 기능
 * function SessionManager() {
 *   const { refreshSession, isAuthenticated, error } = useSessionUtils();
 *
 *   const handleRefresh = async () => {
 *     try {
 *       await refreshSession();
 *       alert('세션이 갱신되었습니다.');
 *     } catch (error) {
 *       alert('세션 갱신에 실패했습니다.');
 *     }
 *   };
 *
 *   if (error) {
 *     return (
 *       <div>
 *         <p>세션 오류가 발생했습니다.</p>
 *         <button onClick={handleRefresh}>세션 갱신</button>
 *       </div>
 *     );
 *   }
 *
 *   return null;
 * }
 *
 * // API 호출 시 액세스 토큰 사용
 * function ApiCallExample() {
 *   const { accessToken, isAuthenticated } = useSessionUtils();
 *
 *   const fetchProtectedData = async () => {
 *     if (!isAuthenticated || !accessToken) {
 *       throw new Error('인증이 필요합니다.');
 *     }
 *
 *     const response = await fetch('/api/protected-data', {
 *       headers: {
 *         'Authorization': `Bearer ${accessToken}`,
 *         'Content-Type': 'application/json',
 *       },
 *     });
 *
 *     return response.json();
 *   };
 *
 *   return (
 *     <button onClick={fetchProtectedData}>
 *       보호된 데이터 가져오기
 *     </button>
 *   );
 * }
 *
 * // 로딩 상태 처리
 * function LoadingExample() {
 *   const { isLoading, isAuthenticated, user } = useSessionUtils();
 *
 *   if (isLoading) {
 *     return (
 *       <div className="loading-container">
 *         <div className="spinner"></div>
 *         <p>사용자 정보를 불러오는 중...</p>
 *       </div>
 *     );
 *   }
 *
 *   if (!isAuthenticated) {
 *     return <LoginPrompt />;
 *   }
 *
 *   return <UserProfile user={user} />;
 * }
 * ```
 */
export function useSessionUtils() {
  const {
    data: session,
    isLoading: sessionLoading,
    error: sessionError,
  } = useSessionQuery();
  const { data: user, isLoading: userLoading } = useUserQuery();
  const refreshSessionMutation = useRefreshSessionMutation();

  const isAuthenticated = !!session?.user && !session?.error;
  const isLoading = sessionLoading || userLoading;

  const hasRole = (role: 'OWNER' | 'APPLICANT'): boolean => {
    return user?.role === role;
  };

  const isOwner = hasRole('OWNER');
  const isApplicant = hasRole('APPLICANT');

  const refreshSession = async () => {
    await refreshSessionMutation.mutateAsync();
  };

  return {
    // 세션 데이터
    session,
    user,
    accessToken: session?.accessToken,

    // 상태
    isLoading,
    isAuthenticated,
    isOwner,
    isApplicant,

    // 유틸리티 함수
    hasRole,
    refreshSession,

    // 에러
    error: sessionError,
  };
}
