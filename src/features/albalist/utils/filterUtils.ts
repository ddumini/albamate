import type { AlbaQueryParams } from '../queries/queries';

interface FilterState {
  recruitStatus?: string;
  publicStatus?: string;
  sortStatus?: string;
  searchKeyword?: string;
}

// 정렬 옵션 매핑
const sortMapping: Record<string, AlbaQueryParams['orderBy']> = {
  latest: 'mostRecent',
  'high-wage': 'highestWage',
  'many-applicants': 'mostApplied',
  'many-scraps': 'mostScrapped',
};

// 모집 상태 매핑
export const mapRecruitStatusToApi = (
  recruitValue: string
): boolean | undefined => {
  if (recruitValue === 'recruiting') return true;
  if (recruitValue === 'closed') return false;
  return undefined; // 'total'인 경우
};

// 공개 상태 매핑
export const mapPublicStatusToApi = (
  publicValue: string
): boolean | undefined => {
  if (publicValue === 'public') return true;
  if (publicValue === 'private') return false;
  return undefined; // 'total'인 경우
};

// 필터 상태를 API 파라미터로 변환하는 함수
export const convertFiltersToApiParams = (
  filters: FilterState,
  limit: number = 10
): AlbaQueryParams => {
  const params: AlbaQueryParams = {
    limit,
  };

  // 모집 상태 변환
  if (filters.recruitStatus && filters.recruitStatus !== 'total') {
    params.isRecruiting = mapRecruitStatusToApi(filters.recruitStatus);
  }

  // 공개 상태 변환
  if (filters.publicStatus && filters.publicStatus !== 'total') {
    params.isPublic = mapPublicStatusToApi(filters.publicStatus);
  }

  // 정렬 기준 변환
  if (filters.sortStatus && sortMapping[filters.sortStatus]) {
    params.orderBy = sortMapping[filters.sortStatus];
  }

  // 검색 키워드
  if (filters.searchKeyword && filters.searchKeyword.trim()) {
    params.keyword = filters.searchKeyword.trim();
  }

  return params;
};
