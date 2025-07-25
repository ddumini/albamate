import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { signOut, useSession } from 'next-auth/react';

import { auth } from '@/auth';

// 쿼리 키 상수
export const SESSION_QUERY_KEYS = {
  session: ['session'] as const,
  user: ['user'] as const,
} as const;

/**
 * 서버 사이드에서 세션을 가져오는 함수
 */
async function fetchSession() {
  try {
    const session = await auth();
    return session;
  } catch (error) {
    console.error('세션 가져오기 실패:', error);
    return null;
  }
}

/**
 * 클라이언트 사이드에서 세션을 쿼리로 관리하는 훅
 */
export function useSessionQuery() {
  const { data: session, status, update } = useSession();

  return useQuery({
    queryKey: SESSION_QUERY_KEYS.session,
    queryFn: () => Promise.resolve(session),
    enabled: status !== 'loading',
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분
  });
}

/**
 * 사용자 정보를 쿼리로 관리하는 훅
 */
export function useUserQuery() {
  const { data: session } = useSessionQuery();

  return useQuery({
    queryKey: SESSION_QUERY_KEYS.user,
    queryFn: () => Promise.resolve(session?.user || null),
    enabled: !!session?.user,
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * 세션 갱신 뮤테이션
 */
export function useRefreshSessionMutation() {
  const queryClient = useQueryClient();
  const { update } = useSession();

  return useMutation({
    mutationFn: async () => {
      const result = await update();
      return result;
    },
    onSuccess: newSession => {
      // 쿼리 캐시 업데이트
      queryClient.setQueryData(SESSION_QUERY_KEYS.session, newSession);
      queryClient.setQueryData(SESSION_QUERY_KEYS.user, newSession?.user);
    },
    onError: error => {
      console.error('세션 갱신 실패:', error);
      // 에러 시 로그아웃 처리
      signOut({ callbackUrl: '/signin' });
    },
  });
}

/**
 * 로그아웃 뮤테이션
 */
export function useLogoutMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await signOut({ callbackUrl: '/signin' });
    },
    onSuccess: () => {
      // 쿼리 캐시 무효화
      queryClient.removeQueries({ queryKey: SESSION_QUERY_KEYS.session });
      queryClient.removeQueries({ queryKey: SESSION_QUERY_KEYS.user });
    },
  });
}
