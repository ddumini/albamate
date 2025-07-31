import { useInfiniteQuery } from '@tanstack/react-query';

import { useIntersectionObserver } from './useIntersectionObserver';

// API 응답 타입 정의
interface CursorResponse<T> {
  data: T[];
  nextCursor: number | null;
}

interface PageResponse<T> {
  data: T[];
  currentPage: number;
  totalPages: number;
  totalItemCount: number;
}

type InfiniteScrollMode = 'cursor' | 'page';

interface UseInfiniteScrollOptions<T, P> {
  mode: InfiniteScrollMode;
  queryKey: (string | number)[];
  fetcher: (params: P) => Promise<CursorResponse<T> | PageResponse<T>>;
  initialParams: P;
  enabled?: boolean;
}

export function useInfiniteScroll<T, P extends Record<string, any>>({
  mode,
  queryKey,
  fetcher,
  initialParams,
  enabled = true,
}: UseInfiniteScrollOptions<T, P>) {
  const query = useInfiniteQuery({
    queryKey,
    queryFn: async ({ pageParam }) => {
      if (mode === 'cursor') {
        return await fetcher({ ...initialParams, cursor: pageParam } as any);
      } else {
        return await fetcher({ ...initialParams, page: pageParam } as any);
      }
    },
    initialPageParam: mode === 'cursor' ? null : 1,
    getNextPageParam: lastPage => {
      if (mode === 'cursor') {
        const cursorResponse = lastPage as CursorResponse<T>;
        return cursorResponse.nextCursor ?? undefined;
      } else {
        const pageResponse = lastPage as PageResponse<T>;
        if (pageResponse.currentPage < pageResponse.totalPages) {
          return pageResponse.currentPage + 1;
        }
        return undefined;
      }
    },
    enabled,
  });

  // Intersection Observer 설정
  const loadMoreRef = useIntersectionObserver(() => {
    if (query.hasNextPage && !query.isFetchingNextPage) {
      query.fetchNextPage();
    }
  });

  // 데이터 추출 함수
  const getData = () => {
    if (!query.data?.pages) return [];
    return query.data.pages.flatMap((page: any) => page.data);
  };

  return {
    ...query,
    loadMoreRef,
    getData,
  };
}
