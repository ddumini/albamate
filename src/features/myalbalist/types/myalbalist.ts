interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface OwnerFilterParams extends PaginationParams {
  status?: string;
  keyword?: string;
}

export interface ApplicantFilterParams extends PaginationParams {
  keyword?: string;
}

export interface ApplicantMyAlbaItem {
  updatedAt: string;
  createdAt: string;
  status: 'REJECTED' | 'INTERVIEW_PENDING' | 'INTERVIEW_COMPLETED' | 'HIRED';
  resumeName: string;
  resumeId: number;
  form: {
    owner: {
      imageUrl: string;
      storeName: string;
      id: number;
    };
    recruitmentEndDate: string;
    recruitmentStartDate: string;
    description: string;
    title: string;
    id: number;
  };
  id: number;
}

export interface OwnerMyAlbaItem {
  updatedAt: string;
  createdAt: string;
  isPublic: boolean;
  scrapCount: number;
  applyCount: number;
  imageUrls: string[];
  recruitmentEndDate: string;
  recruitmentStartDate: string;
  title: string;
  id: number;
}

export type UserRole = 'APPLICANT' | 'OWNER';

export interface User {
  role: UserRole;
}

export interface ApplicantQueryParams {
  limit?: number;
  cursor?: number;
  status?: 'REJECTED' | 'INTERVIEW_PENDING' | 'INTERVIEW_COMPLETED' | 'HIRED';
  keyword?: string;
}

export interface OwnerQueryParams {
  limit?: number;
  cursor?: number;
  orderBy?: 'mostRecent' | 'highestWage' | 'mostApplied' | 'mostScrapped';
  keyword?: string;
  isPublic?: boolean;
  isRecruiting?: boolean;
}

export interface FilterState {
  recruitStatus?: string;
  publicStatus?: string;
  sortStatus?: string;
  searchKeyword?: string;
}
