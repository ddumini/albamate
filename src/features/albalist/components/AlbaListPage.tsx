'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

import FloatingFormButton from '@/features/albalist/components/FloatingFormButton';
import LoadingSpinner from '@/shared/components/ui/LoadingSpinner';
import { useInfiniteScroll } from '@/shared/hooks/useInfiniteScroll';
import { useSessionUtils } from '@/shared/lib/auth/use-session-utils';

import useAlbaListApi from '../api/albaListApi';
import { convertFiltersToApiParams } from '../utils/filterUtils';
import AlbaFilterBar from './AlbaFilterBar';
import InfiniteScroll from './InfiniteScroll';

interface FilterState {
  recruitStatus?: string;
  publicStatus?: string;
  sortStatus?: string;
  searchKeyword?: string;
}

const AlbaListPage = () => {
  const { isOwner, isLoading: isSessionLoading } = useSessionUtils();
  const { getAlbas } = useAlbaListApi();

  const [filters, setFilters] = useState<FilterState>({});
  const [searchInput, setSearchInput] = useState('');
  const [debouncedSearchKeyword, setDebouncedSearchKeyword] = useState('');

  // 검색어 디바운스
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearchKeyword(searchInput), 500);
    return () => clearTimeout(timer);
  }, [searchInput]);

  // 디바운스된 검색어 필터에 반영
  useEffect(() => {
    setFilters(prev => ({
      ...prev,
      searchKeyword: debouncedSearchKeyword,
    }));
  }, [debouncedSearchKeyword]);

  // 필터 → API 파라미터 변환
  const apiParams = useMemo(
    () => convertFiltersToApiParams(filters, 6),
    [filters]
  );

  // queryKey에서 객체를 문자열로 변환
  const queryKey = useMemo(
    () => ['albaList', 'infinite', JSON.stringify(apiParams)],
    [apiParams]
  );

  // 공용 무한스크롤 훅 사용
  const {
    isLoading,
    isError,
    isFetchingNextPage: isLoadingMore,
    loadMoreRef,
    getData,
    error,
  } = useInfiniteScroll({
    mode: 'cursor',
    queryKey,
    fetcher: async params => {
      const response = await getAlbas(params);
      return response.data;
    },
    initialParams: apiParams,
    enabled: !isSessionLoading, // 세션 로딩 완료 후 데이터 로드
  });

  const handleFilterChange = useCallback((newFilters: Partial<FilterState>) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters,
    }));
  }, []);

  const handleSearchChange = useCallback(
    (value: string) => setSearchInput(value),
    []
  );

  if (isSessionLoading) return <LoadingSpinner size="sm" />;

  return (
    <div className="mb-68">
      <AlbaFilterBar
        isOwner={isOwner}
        recruitValue={filters.recruitStatus}
        searchValue={searchInput}
        sortValue={filters.sortStatus}
        onFilterChange={handleFilterChange}
        onSearchChange={handleSearchChange}
      />

      <InfiniteScroll
        data={getData()}
        error={isError ? error : null}
        isLoading={isLoading}
        isLoadingMore={isLoadingMore}
        loadMoreRef={loadMoreRef}
      >
        {isOwner && <FloatingFormButton />}
      </InfiniteScroll>
    </div>
  );
};

export default AlbaListPage;
