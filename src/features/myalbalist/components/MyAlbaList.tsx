'use client';

import ListWrapper from '@common/list/ListWrapper';
import { useCallback, useEffect, useMemo, useState } from 'react';

import FloatingFormButton from '@/features/albalist/components/FloatingFormButton';
import { useSessionUtils } from '@/shared/lib/auth/use-session-utils';
import { cn } from '@/shared/lib/cn';

import {
  useApplicantMyAlbalistQuery,
  useOwnerMyAlbalistQuery,
} from '../queries/queries';
import { ApplicantMyAlbaItem, OwnerMyAlbaItem } from '../types/myalbalist';
import { convertFiltersToApiParams } from '../utils/filterUtils';
import MyAlbaCard from './MyAlbaCard';
import AlbaFilterBar from './MyAlbaFilterBar';

interface FilterState {
  recruitStatus?: string;
  publicStatus?: string;
  sortStatus?: string;
  searchKeyword?: string;
}

const AlbaListPage = () => {
  const {
    isOwner,
    user,
    isLoading: isSessionLoading,
    session,
    isAuthenticated,
  } = useSessionUtils();
  const [filters, setFilters] = useState<FilterState>({});
  const [searchInput, setSearchInput] = useState('');
  const [debouncedSearchKeyword, setDebouncedSearchKeyword] = useState('');

  // 디바운스된 검색어 업데이트
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchKeyword(searchInput);
    }, 500); // 500ms 디바운스

    return () => clearTimeout(timer);
  }, [searchInput]);

  // 디바운스된 검색어를 필터에 반영
  useEffect(() => {
    setFilters(prev => ({
      ...prev,
      searchKeyword: debouncedSearchKeyword,
    }));
  }, [debouncedSearchKeyword]);

  // 필터 상태를 API 파라미터로 변환 (limit 포함)
  const apiParams = useMemo(
    () => convertFiltersToApiParams(filters, isOwner, 10),
    [filters, isOwner]
  );

  // 사용자 역할에 따라 다른 쿼리 사용
  const {
    data: applicantData,
    isLoading: isApplicantLoading,
    error: applicantError,
    refetch: refetchApplicant,
  } = useApplicantMyAlbalistQuery(apiParams);

  const {
    data: ownerData,
    isLoading: isOwnerLoading,
    error: ownerError,
    refetch: refetchOwner,
  } = useOwnerMyAlbalistQuery(apiParams);

  // 현재 사용자 역할에 맞는 데이터 선택
  const currentData = isOwner ? ownerData : applicantData;
  const isLoadingData = isOwner ? isOwnerLoading : isApplicantLoading;
  const error = isOwner ? ownerError : applicantError;

  // 필터 변경 핸들러
  const handleFilterChange = useCallback(
    (newFilters: Partial<FilterState>) => {
      setFilters(prev => {
        const updated = {
          ...prev,
          ...newFilters,
        };
        return updated;
      });
    },
    [filters]
  );

  // 검색 입력 변경 핸들러
  const handleSearchChange = useCallback((value: string) => {
    setSearchInput(value);
  }, []);

  // 초기 로딩 (세션 로딩)일 때만 전체 페이지 로딩
  if (isSessionLoading) {
    return <div>로딩 중...</div>;
  }

  // 사용자 정보가 없을 때 처리
  if (!user) {
    return <div>로그인이 필요합니다.</div>;
  }

  // 에러 처리
  if (error) {
    console.error('쿼리 에러:', error);
    return <div>데이터를 불러오는 중 오류가 발생했습니다.</div>;
  }

  // 데이터 처리 로직 개선
  let items: (ApplicantMyAlbaItem | OwnerMyAlbaItem)[] = [];

  if (currentData) {
    if (Array.isArray(currentData)) {
      items = currentData;
    } else if (currentData.data && Array.isArray(currentData.data)) {
      items = currentData.data;
    } else if (currentData.items && Array.isArray(currentData.items)) {
      items = currentData.items;
    } else {
      console.warn('예상하지 못한 데이터 구조:', currentData);
      items = [];
    }
  }

  return (
    <div className="mb-68">
      {/* 필터바는 항상 렌더링 (로딩 상태와 무관) */}
      <AlbaFilterBar
        isOwner={isOwner}
        publicValue={filters.publicStatus}
        recruitValue={filters.recruitStatus}
        searchValue={searchInput}
        sortValue={filters.sortStatus}
        onFilterChange={handleFilterChange}
        onSearchChange={handleSearchChange}
      />

      {/* 
        TODO: 추후 스켈레톤 로딩 구현
        - 로딩 중일 때 리스트 부분만 스켈레톤 표시
      */}
      <ListWrapper
        className={cn(!isOwner && '!gap-y-10 md:!gap-y-20 lg:!gap-y-40')}
        items={items}
        renderItem={(item: ApplicantMyAlbaItem | OwnerMyAlbaItem) => (
          <MyAlbaCard key={`${item.id}`} isOwner={isOwner} item={item} />
        )}
      >
        {isOwner && <FloatingFormButton />}
      </ListWrapper>
    </div>
  );
};

export default AlbaListPage;
