import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

import { MockAlbaItem } from '@/features/alba/types/MockAlbaItem';

import { useApplicationDetailApi } from '../api/applicationDetail';

const DEFAULT_QUERY_OPTIONS = {
  retry: 1,
  retryDelay: 1000,
  staleTime: 30000,
  gcTime: 5 * 60 * 1000, // 5분 동안 캐시 유지
  refetchOnWindowFocus: false,
  refetchOnMount: false,
};

// 알바폼 상세 조회 쿼리
export const useAlbaformDetailQuery = (
  formId: string,
  initialData?: MockAlbaItem,
  options = {}
) => {
  const { data: session, status } = useSession();
  const api = useApplicationDetailApi();

  return useQuery({
    queryKey: ['albaformDetail', formId],
    queryFn: async () => {
      const response = await api.getAlbaformDetail(formId);
      return response.data;
    },
    enabled: status === 'authenticated' && !!session?.accessToken && !!formId,
    initialData,
    ...DEFAULT_QUERY_OPTIONS,
    ...options,
  });
};

// 내 지원 내역 조회 쿼리 (지원자용)
export const useMyApplicationQuery = (formId: string, options = {}) => {
  const { data: session, status } = useSession();
  const api = useApplicationDetailApi();

  return useQuery({
    queryKey: ['myApplication', formId],
    queryFn: async () => {
      const response = await api.getMyApplication(formId);
      return response.data;
    },
    enabled: status === 'authenticated' && !!session?.accessToken && !!formId,
    ...DEFAULT_QUERY_OPTIONS,
    ...options, // 외부 옵션 적용
  });
};

// 특정 지원서 조회 쿼리 (사장님용)
export const useApplicationByIdQuery = (
  applicationId: string | undefined,
  options = {}
) => {
  const { data: session, status } = useSession();
  const api = useApplicationDetailApi();

  return useQuery({
    queryKey: ['applicationById', applicationId],
    queryFn: async () => {
      if (!applicationId) return null;

      const response = await api.getApplicationById(applicationId);
      return response.data;
    },
    enabled:
      status === 'authenticated' && !!session?.accessToken && !!applicationId,
    ...DEFAULT_QUERY_OPTIONS,
    ...options, // 외부 옵션 적용
  });
};
