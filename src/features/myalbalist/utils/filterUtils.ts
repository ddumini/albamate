interface ApiParams {
  limit: number;
  keyword?: string;
  orderBy?: string;
  isRecruiting?: boolean;
  isPublic?: boolean;
  status?: string;
}

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
  filters: {
    recruitStatus?: string;
    publicStatus?: string;
    sortStatus?: string;
    searchKeyword?: string;
  },
  isOwner: boolean,
  limit: number = 10
): ApiParams => {
  const params: ApiParams = {
    limit, // 기본 limit 값 추가
  };

  if (filters.searchKeyword) {
    params.keyword = filters.searchKeyword;
  }

  if (isOwner) {
    // 사장님용 파라미터
    if (filters.sortStatus && filters.sortStatus !== 'total') {
      params.orderBy = mapOwnerSortToApi(filters.sortStatus);
    }
    if (filters.recruitStatus && filters.recruitStatus !== 'total') {
      params.isRecruiting = mapRecruitStatusToApi(filters.recruitStatus);
    }
    if (filters.publicStatus && filters.publicStatus !== 'total') {
      params.isPublic = mapPublicStatusToApi(filters.publicStatus);
    }
  } else {
    // 지원자용 파라미터
    if (filters.sortStatus && filters.sortStatus !== 'total') {
      params.status = mapApplicantStatusToApi(filters.sortStatus);
    }
  }

  return params;
};
