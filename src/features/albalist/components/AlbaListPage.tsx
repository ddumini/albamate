'use client';

import ListWrapper from '@common/list/ListWrapper';
import { useCallback, useEffect, useMemo, useState } from 'react';

import FloatingFormButton from '@/features/albalist/components/FloatingFormButton';
import { useSessionUtils } from '@/shared/lib/auth/use-session-utils';
import type { AlbaItem } from '@/shared/types/alba';

import { useAlbalistQuery } from '../queries/queries';
import { convertFiltersToApiParams } from '../utils/filterUtils';
import AlbaCard from './AlbaCard';
import AlbaFilterBar from './AlbaFilterBar';

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
  const apiParams = useMemo(
    () => convertFiltersToApiParams(filters, 10),
    [filters]
  );

  // 데이터 쿼리
  const { data, isLoading, error } = useAlbalistQuery(apiParams);

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
  if (error) return <div>데이터를 불러오는 중 오류가 발생했습니다.</div>;

  const items: AlbaItem[] = data ?? [];

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

      <ListWrapper
        items={items}
        renderItem={(item: AlbaItem) => <AlbaCard key={item.id} item={item} />}
      >
        {isOwner && <FloatingFormButton />}
      </ListWrapper>
    </div>
  );
};

export default AlbaListPage;
