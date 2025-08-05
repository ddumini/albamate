import { useCallback } from 'react';

import { axiosInstance } from '@/shared/lib/axios';

interface PaginationParams {
  limit?: number;
  cursor?: number;
}

interface AlbaFilterParams extends PaginationParams {
  orderBy?: 'mostRecent' | 'highestWage' | 'mostApplied' | 'mostScrapped';
  keyword?: string;
  isPublic?: boolean;
  isRecruiting?: boolean;
}

const useAlbaListApi = () => {
  const authAxios = axiosInstance;

  // 알바 리스트 조회
  const getAlbas = useCallback(
    (params: AlbaFilterParams = { limit: 10 }) => {
      return authAxios.get('forms', { params });
    },
    [authAxios]
  );

  // 알바 상세 조회
  const getAlbaDetail = useCallback(
    (formId: number) => {
      return authAxios.get(`forms/${formId}`);
    },
    [authAxios]
  );

  // 스크랩
  const scrapAlba = useCallback(
    (formId: number) => {
      return authAxios.post(`forms/${formId}/scrap`);
    },
    [authAxios]
  );

  // 스크랩 취소
  const cancelScrapAlba = useCallback(
    (formId: number) => {
      return authAxios.delete(`forms/${formId}/scrap`);
    },
    [authAxios]
  );

  return {
    getAlbas,
    getAlbaDetail,
    scrapAlba,
    cancelScrapAlba,
  };
};

export default useAlbaListApi;
