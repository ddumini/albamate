import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useSession } from 'next-auth/react';

import { useAxiosWithAuth } from '@/shared/lib/axios';

// API 훅
export const useApplicationDetailApi = () => {
  const authAxios = useAxiosWithAuth();

  return {
    getAlbaformDetail: (formId: string) => {
      return authAxios.get(`forms/${formId}`);
    },

    getMyApplication: (formId: string) => {
      return authAxios.get(`forms/${formId}/my-application`);
    },

    getApplicationById: (applicationId: string) => {
      return authAxios.get(`applications/${applicationId}`);
    },

    updateApplicationStatus: (applicationId: string, status: string) => {
      return authAxios.patch(`applications/${applicationId}`, { status });
    },
  };
};

// 공통 에러 로깅 함수
const logError = (errorName: string, error: AxiosError) => {
  console.error(`${errorName} 에러:`, {
    message: error.message,
    status: error.response?.status,
    statusText: error.response?.statusText,
    data: error.response?.data,
    url: error.config?.url,
  });

  console.error(
    '에러 응답 데이터:',
    error.response?.data
      ? JSON.stringify(error.response.data, null, 2)
      : '데이터 없음'
  );
};

// 알바폼 상세 조회 쿼리
export const useAlbaformDetailQuery = (formId: string) => {
  const { data: session, status } = useSession();
  const api = useApplicationDetailApi();

  return useQuery({
    queryKey: ['albaformDetail', formId],
    queryFn: async () => {
      try {
        const response = await api.getAlbaformDetail(formId);
        return response.data;
      } catch (error: any) {
        console.error(
          '에러 응답 데이터:',
          JSON.stringify(error.response?.data, null, 2)
        );

        throw error;
      }
    },
    retry: 1,
    retryDelay: 1000,
    enabled: status === 'authenticated' && !!session?.accessToken && !!formId,
    staleTime: 30000,
    gcTime: 5 * 60 * 1000, // 5분 동안 캐시 유지
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};

// 내 지원 내역 조회 쿼리 (지원자용)
export const useMyApplicationQuery = (formId: string, options = {}) => {
  const { data: session, status } = useSession();
  const api = useApplicationDetailApi();

  return useQuery({
    queryKey: ['myApplication', formId],
    queryFn: async () => {
      try {
        const response = await api.getMyApplication(formId);
        return response.data;
      } catch (error: any) {
        logError('내 지원 내역 조회', error);

        // 401이나 404는 null 반환 (지원서 없음)
        if (error.response?.status === 401 || error.response?.status === 404) {
          return null;
        }

        throw error;
      }
    },
    retry: 1,
    retryDelay: 1000,
    enabled: status === 'authenticated' && !!session?.accessToken && !!formId,
    staleTime: 30000,
    gcTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
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

      try {
        const response = await api.getApplicationById(applicationId);
        return response.data;
      } catch (error: any) {
        logError('지원서 ID 조회', error);

        // 404는 null 반환 (지원서 없음)
        if (error.response?.status === 404) {
          return null;
        }

        throw error;
      }
    },
    retry: 1,
    retryDelay: 1000,
    enabled:
      status === 'authenticated' && !!session?.accessToken && !!applicationId,
    staleTime: 30000,
    gcTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    ...options, // 외부 옵션 적용
  });
};
