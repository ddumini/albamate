'use client';

import ListWrapper from '@common/list/ListWrapper';
import { useCallback, useEffect, useMemo, useState } from 'react';

import FloatingFormButton from '@/features/albalist/components/FloatingFormButton';
import EmptyCard from '@/shared/components/common/EmptyCard';
import LoadingSpinner from '@/shared/components/ui/LoadingSpinner';
import { useInfiniteScroll } from '@/shared/hooks/useInfiniteScroll';
import useViewport from '@/shared/hooks/useViewport';
import { cn } from '@/shared/lib/cn';

import {
  fetchApplicantMyAlbalist,
  fetchOwnerMyAlbalist,
} from '../queries/infiniteQueries';
import { ApplicantMyAlbaItem, OwnerMyAlbaItem } from '../types/myalbalist';
import { FilterState } from '../types/myalbalist';
import { convertFiltersToApiParams } from '../utils/filterUtils';
import MyAlbaCard from './MyAlbaCard';
import AlbaFilterBar from './MyAlbaFilterBar';

interface MyAlbaListProps {
  userRole?: 'OWNER' | 'APPLICANT';
}

const MyAlbaList = ({ userRole }: MyAlbaListProps) => {
  const { isMobile, isTablet } = useViewport();
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

  // 반응형 limit 계산
  const getLimit = useMemo(() => {
    if (isMobile) return 3;
    if (isTablet) return 4;
    return 6; // 데스크탑
  }, [isMobile, isTablet]);

  // 필터 상태를 API 파라미터로 변환
  const apiParams = useMemo(
    () => convertFiltersToApiParams(filters, userRole === 'OWNER', getLimit),
    [filters, userRole, getLimit]
  );

  // 지원자용 무한 스크롤
  const applicantInfiniteQuery = useInfiniteScroll({
    mode: 'cursor',
    queryKey: [
      'applicantMyAlbalist',
      ...Object.values(apiParams).filter(Boolean),
    ],
    fetcher: fetchApplicantMyAlbalist,
    initialParams: apiParams,
    enabled: userRole === 'APPLICANT',
  });

  // 사장님용 무한 스크롤
  const ownerInfiniteQuery = useInfiniteScroll({
    mode: 'cursor',
    queryKey: ['ownerMyAlbalist', ...Object.values(apiParams).filter(Boolean)],
    fetcher: fetchOwnerMyAlbalist,
    initialParams: apiParams,
    enabled: userRole === 'OWNER',
  });

  // 현재 사용자 역할에 맞는 쿼리 선택
  const currentQuery =
    userRole === 'OWNER' ? ownerInfiniteQuery : applicantInfiniteQuery;
  const {
    isLoading,
    isError,
    hasNextPage,
    isFetchingNextPage,
    loadMoreRef,
    getData,
  } = currentQuery;

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
  if (isError) {
    console.error('쿼리 에러:', isError);
    return <div>데이터를 불러오는 중 오류가 발생했습니다.</div>;
  }

  // 데이터 처리
  const items = getData();

  const renderContent = () => {
    // 초기 로딩 중일 때
    if (isLoading) {
      return (
        <div className="flex min-h-[60vh] items-center justify-center">
          <LoadingSpinner size="lg" />
        </div>
      );
    }

    // 데이터가 없는 경우
    if (!items || items.length === 0) {
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
        {/* 무한 스크롤 트리거 요소 */}
        {hasNextPage && (
          <div
            ref={loadMoreRef}
            className="absolute right-0 -bottom-70 left-0 flex flex-col items-center justify-center"
          >
            {isFetchingNextPage ? (
              <LoadingSpinner size="sm" />
            ) : (
              <div className="h-4" /> // 트리거용 빈 공간
            )}
          </div>
        )}
      </ListWrapper>
    );
  };

  return (
    <div className="mb-68">
      {userRole === 'OWNER' && <FloatingFormButton />}
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
