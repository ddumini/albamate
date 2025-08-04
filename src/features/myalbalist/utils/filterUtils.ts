import {
  ApplicantQueryParams,
  FilterState,
  OwnerQueryParams,
} from '../types/myalbalist';

// 사장님용 정렬 옵션 매핑
export const mapOwnerSortToApi = (sortValue: string): string | undefined => {
  const sortMapping: Record<string, string> = {
    latest: 'mostRecent',
    'high-wage': 'highestWage',
    'many-applicants': 'mostApplied',
    'many-scraps': 'mostScrapped',
  };
  return sortMapping[sortValue];
};

// 지원자용 상태 매핑
export const mapApplicantStatusToApi = (
  statusValue: string
): string | undefined => {
  const statusMapping: Record<string, string> = {
    rejected: 'REJECTED',
    'interview-pending': 'INTERVIEW_PENDING',
    'interview-completed': 'INTERVIEW_COMPLETED',
    hired: 'HIRED',
  };
  return statusMapping[statusValue];
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

// 필터 상태를 API 파라미터로 변환
export const convertFiltersToApiParams = (
  filters: FilterState,
  isOwner: boolean,
  limit: number = 10,
  cursor?: number | null
): ApplicantQueryParams | OwnerQueryParams => {
  const baseParams = {
    limit,
    ...(cursor !== undefined && { cursor }),
  };

  if (isOwner) {
    return {
      ...baseParams,
      ...(filters.searchKeyword && { keyword: filters.searchKeyword }),
      ...(filters.sortStatus && {
        orderBy: mapOwnerSortToApi(filters.sortStatus),
      }),
      ...(filters.publicStatus && {
        isPublic: mapPublicStatusToApi(filters.publicStatus),
      }),
      ...(filters.recruitStatus && {
        isRecruiting: mapRecruitStatusToApi(filters.recruitStatus),
      }),
    } as OwnerQueryParams;
  } else {
    return {
      ...baseParams,
      ...(filters.searchKeyword && { keyword: filters.searchKeyword }),
      ...(filters.recruitStatus && {
        status: mapApplicantStatusToApi(filters.recruitStatus),
      }),
    } as ApplicantQueryParams;
  }
};
