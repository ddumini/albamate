'use client';

import ListWrapper from '@common/list/ListWrapper';
import { useCallback, useEffect, useMemo, useState } from 'react';

import FloatingFormButton from '@/features/albalist/components/FloatingFormButton';
import EmptyCard from '@/shared/components/common/EmptyCard';
import LoadingSpinner from '@/shared/components/ui/LoadingSpinner';
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
  const [isInitialLoad, setIsInitialLoad] = useState(true); // 초기 로딩 상태 추가

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
    isFetching: isApplicantFetching,
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
    isFetching: isOwnerFetching,
    error: ownerError,
  } = useOwnerMyAlbalistQuery(
    userRole === 'OWNER' ? (apiParams as OwnerQueryParams) : { limit: 10 },
    userRole
  );

  // 현재 사용자 역할에 맞는 상태 선택
  const currentData = userRole === 'OWNER' ? ownerData : applicantData;
  const isLoadingData =
    userRole === 'OWNER' ? isOwnerLoading : isApplicantLoading;
  const isFetchingData =
    userRole === 'OWNER' ? isOwnerFetching : isApplicantFetching;
  const error = userRole === 'OWNER' ? ownerError : applicantError;

  // 초기 로딩 완료 감지
  useEffect(() => {
    if (!isLoadingData && isInitialLoad) {
      setIsInitialLoad(false);
    }
  }, [isLoadingData, isInitialLoad]);

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
    // 초기 로딩 중이거나 데이터를 가져오는 중일 때
    if (isLoadingData || isFetchingData) {
      return (
        <div className="flex min-h-[60vh] items-center justify-center">
          <LoadingSpinner size="lg" />
        </div>
      );
    }

    // 데이터가 없고 로딩도 완료된 경우에만 EmptyCard 표시
    if (!currentData || items.length === 0) {
      return userRole === 'APPLICANT' ? (
        <EmptyCard
          description="알바폼을 둘러보고 지원해보세요!"
          title="지원한 알바폼이 없어요."
          type="albaList"
        />
      ) : (
        <EmptyCard
          description="1분 만에 등록하고 알바를 구해보세요!"
          title="등록된 알바폼이 없어요."
          type="albaList"
        />
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
