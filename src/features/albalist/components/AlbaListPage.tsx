'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

import FloatingFormButton from '@/features/albalist/components/FloatingFormButton';
import { useSessionUtils } from '@/shared/lib/auth/use-session-utils';

import useInfiniteScroll from '../queries/useInfiniteScroll';
import { convertFiltersToApiParams } from '../utils/filterUtils';
import AlbaFilterBar from './AlbaFilterBar';
import InfiniteScroll from './InfiniteScroll';

interface FilterState {
  recruitStatus?: string;
  publicStatus?: string; // 사장님만 UI 노출
  sortStatus?: string;
  searchKeyword?: string;
}

const AlbaListPage = () => {
  const { isOwner, isLoading: isSessionLoading } = useSessionUtils();

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
  const infiniteApiParams = useMemo(
    () => convertFiltersToApiParams(filters, 10),
    [filters]
  );

  // 무한스크롤 쿼리
  const { data, isLoading, isLoadingMore, error, hasNextPage, loadMore } =
    useInfiniteScroll({
      ...infiniteApiParams,
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

  if (isSessionLoading) return <div>로딩 중...</div>;

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
        data={data}
        emptyDescription="1분 만에 등록하고 알바를 구해보세요!"
        emptyTitle="등록된 알바폼이 없어요."
        error={error}
        hasNextPage={hasNextPage}
        isLoading={isLoading}
        isLoadingMore={isLoadingMore}
        onLoadMore={loadMore}
      >
        {isOwner && <FloatingFormButton />}
      </InfiniteScroll>
    </div>
  );
};

export default AlbaListPage;
