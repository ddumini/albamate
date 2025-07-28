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
  console.log('모집 상태 매핑 입력:', recruitValue);
  if (recruitValue === 'recruiting') return true;
  if (recruitValue === 'closed') return false;
  return undefined; // 'total'인 경우
};

// 공개 상태 매핑
export const mapPublicStatusToApi = (
  publicValue: string
): boolean | undefined => {
  console.log('공개 상태 매핑 입력:', publicValue);
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
) => {
  console.log('convertFiltersToApiParams 입력:', { filters, isOwner, limit });

  const params: any = {
    limit, // 기본 limit 값 추가
  };

  if (filters.searchKeyword) {
    params.keyword = filters.searchKeyword;
  }

  if (isOwner) {
    // 사장님용 파라미터
    console.log('사장님용 파라미터 처리');
    if (filters.sortStatus && filters.sortStatus !== 'total') {
      params.orderBy = mapOwnerSortToApi(filters.sortStatus);
      console.log('정렬 파라미터 추가:', params.orderBy);
    }
    if (filters.recruitStatus && filters.recruitStatus !== 'total') {
      params.isRecruiting = mapRecruitStatusToApi(filters.recruitStatus);
      console.log('모집 상태 파라미터 추가:', params.isRecruiting);
    }
    if (filters.publicStatus && filters.publicStatus !== 'total') {
      params.isPublic = mapPublicStatusToApi(filters.publicStatus);
      console.log('공개 상태 파라미터 추가:', params.isPublic);
    }
  } else {
    // 지원자용 파라미터
    console.log('지원자용 파라미터 처리');
    // 지원자용에서는 recruitStatus를 status로 처리
    if (filters.recruitStatus && filters.recruitStatus !== 'total') {
      params.status = mapApplicantStatusToApi(filters.recruitStatus);
      console.log('지원자 상태 파라미터 추가:', params.status);
    }
    // sortStatus도 처리 (정렬 기능이 있다면)
    if (filters.sortStatus && filters.sortStatus !== 'total') {
      params.orderBy = mapOwnerSortToApi(filters.sortStatus);
      console.log('지원자 정렬 파라미터 추가:', params.orderBy);
    }
  }

  console.log('최종 API 파라미터:', params);
  return params;
};
