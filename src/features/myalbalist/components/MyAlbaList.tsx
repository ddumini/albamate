'use client';

import ListWrapper from '@common/list/ListWrapper';
import { useCallback, useEffect, useMemo, useState } from 'react';

import FloatingFormButton from '@/features/albalist/components/FloatingFormButton';
import { cn } from '@/shared/lib/cn';

import {
  type ApplicantQueryParams,
  type OwnerQueryParams,
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
interface MyAlbaListProps {
  userRole?: 'OWNER' | 'APPLICANT';
}

const MyAlbaList = ({ userRole }: MyAlbaListProps) => {
  const [filters, setFilters] = useState<FilterState>({});
  const [searchInput, setSearchInput] = useState('');
  const [debouncedSearchKeyword, setDebouncedSearchKeyword] = useState('');

  // 디바운스된 검색어 업데이트
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchKeyword(searchInput);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchInput]);

  // 디바운스된 검색어를 필터에 반영
  useEffect(() => {
    setFilters(prev => ({
      ...prev,
      searchKeyword: debouncedSearchKeyword,
    }));
  }, [debouncedSearchKeyword]);

  // 필터 상태를 API 파라미터로 변환
  const apiParams = useMemo(
    () => convertFiltersToApiParams(filters, userRole === 'OWNER', 10),
    [filters, userRole]
  );

  // 지원자용 쿼리
  const {
    data: applicantData,
    isLoading: isApplicantLoading,
    error: applicantError,
  } = useApplicantMyAlbalistQuery(
    userRole === 'APPLICANT'
      ? (apiParams as ApplicantQueryParams)
      : { limit: 10 },
    userRole
  );

  // 사장님용 쿼리
  const {
    data: ownerData,
    isLoading: isOwnerLoading,
    error: ownerError,
  } = useOwnerMyAlbalistQuery(
    userRole === 'OWNER' ? (apiParams as OwnerQueryParams) : { limit: 10 },
    userRole
  );

  // 현재 사용자 역할에 맞는 데이터 선택
  const currentData = userRole === 'OWNER' ? ownerData : applicantData;
  const isLoadingData =
    userRole === 'OWNER' ? isOwnerLoading : isApplicantLoading;
  const error = userRole === 'OWNER' ? ownerError : applicantError;

  // 필터 변경 핸들러
  const handleFilterChange = useCallback((newFilters: Partial<FilterState>) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters,
    }));
  }, []);

  // 검색 입력 변경 핸들러
  const handleSearchChange = useCallback((value: string) => {
    setSearchInput(value);
  }, []);

  // 에러 처리
  if (error) {
    console.error('쿼리 에러:', error);
    return <div>데이터를 불러오는 중 오류가 발생했습니다.</div>;
  }

  // 데이터 처리 로직
  let items: (ApplicantMyAlbaItem | OwnerMyAlbaItem)[] = [];

  if (currentData) {
    if (Array.isArray(currentData)) {
      items = currentData;
    } else if (currentData.data && Array.isArray(currentData.data)) {
      items = currentData.data;
    } else if (currentData.items && Array.isArray(currentData.items)) {
      items = currentData.items;
    }
  }

  const renderContent = () => {
    if (isLoadingData) {
      return (
        <div className="flex min-h-[60vh] items-center justify-center">
          <div>데이터를 불러오는 중...</div>
        </div>
      );
    }

    if (items.length === 0) {
      return (
        <div className="flex min-h-[60vh] items-center justify-center">
          <div>등록된 알바가 없습니다.</div>
        </div>
      );
    }

    return (
      <ListWrapper
        className={cn(
          userRole !== 'OWNER' && '!gap-y-10 md:!gap-y-20 lg:!gap-y-40'
        )}
        items={items}
        renderItem={(item: ApplicantMyAlbaItem | OwnerMyAlbaItem) => (
          <MyAlbaCard
            key={`${item.id}`}
            isOwner={userRole === 'OWNER'}
            item={item}
          />
        )}
      >
        {userRole === 'OWNER' && <FloatingFormButton />}
      </ListWrapper>
    );
  };

  return (
    <div className="mb-68">
      <AlbaFilterBar
        isOwner={userRole === 'OWNER'}
        publicValue={filters.publicStatus}
        recruitValue={filters.recruitStatus}
        searchValue={searchInput}
        sortValue={filters.sortStatus}
        onFilterChange={handleFilterChange}
        onSearchChange={handleSearchChange}
      />

      {renderContent()}
    </div>
  );
};

export default MyAlbaList;
