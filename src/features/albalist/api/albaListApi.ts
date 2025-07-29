import { useCallback } from 'react';

import { useAxiosWithAuth } from '@/shared/lib/axios';

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

// 커스텀 훅으로 인증된 axios 인스턴스 사용
const useAlbaListApi = () => {
  const authAxios = useAxiosWithAuth();

  const getAlbas = useCallback(
    (params: AlbaFilterParams = { limit: 10 }) => {
      return authAxios.get('forms', { params });
    },
    [authAxios]
  );

  const scrapAlba = useCallback(
    (formId: number) => {
      return authAxios.post(`forms/${formId}/scrap`);
    },
    [authAxios]
  );

  const cancelScrapAlba = useCallback(
    (formId: number) => {
      return authAxios.delete(`forms/${formId}/scrap`);
    },
    [authAxios]
  );

  return { getAlbas, scrapAlba, cancelScrapAlba };
};

export default useAlbaListApi;
