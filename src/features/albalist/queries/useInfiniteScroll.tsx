import { useInfiniteQuery } from '@tanstack/react-query';
import { useCallback } from 'react';

import useAlbaListApi from '../api/albaListApi';

// 기존 AlbaFilterParams 타입을 그대로 사용하기 위해 재정의
interface InfiniteAlbaParams {
  limit?: number;
  orderBy?: 'mostRecent' | 'highestWage' | 'mostApplied' | 'mostScrapped';
  keyword?: string;
  isPublic?: boolean;
  isRecruiting?: boolean;
  enabled?: boolean;
}

interface AlbaListResponse {
  nextCursor: number | null;
  data: Array<{
    id: number;
    title: string;
    recruitmentStartDate: string;
    recruitmentEndDate: string;
    imageUrls: string[];
    applyCount: number;
    scrapCount: number;
    isPublic: boolean;
    createdAt: string;
    updatedAt: string;
  }>;
}

const useInfiniteAlbaList = (params: InfiniteAlbaParams = {}) => {
  const { getAlbas } = useAlbaListApi();
  const { enabled = true, ...queryParams } = params;

  const query = useInfiniteQuery({
    queryKey: ['albaList', 'infinite', queryParams],
    queryFn: async ({ pageParam = undefined }) => {
      const response = await getAlbas({
        ...queryParams,
        cursor: pageParam,
      });
      return response.data as AlbaListResponse;
    },
    getNextPageParam: lastPage => {
      // nextCursor가 null이면 더 이상 페이지가 없음
      return lastPage.nextCursor ?? undefined;
    },
    initialPageParam: undefined as number | undefined,
    enabled,
    staleTime: 1000 * 60 * 5, // 5분
    refetchOnWindowFocus: false,
  });

  // 모든 페이지의 데이터를 하나의 배열로 합치기
  const flatData = query.data?.pages.flatMap(page => page.data) ?? [];

  // 다음 페이지 로딩 함수
  const loadMore = useCallback(() => {
    if (query.hasNextPage && !query.isFetchingNextPage) {
      query.fetchNextPage();
    }
  }, [query]);

  return {
    // 데이터
    data: flatData,

    // 로딩 상태
    isLoading: query.isLoading,
    isLoadingMore: query.isFetchingNextPage,

    // 에러
    error: query.error,

    // 페이지네이션 상태
    hasNextPage: query.hasNextPage,

    // 액션
    loadMore,

    // 원본 쿼리 객체 (필요시 사용)
    query,
  };
};

export default useInfiniteAlbaList;
