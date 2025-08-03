import { CursorResponse } from '@/shared/types/mypage';

import { myAlbalistApi } from '../api/api';
import { ApplicantMyAlbaItem, OwnerMyAlbaItem } from '../types/myalbalist';

// 지원자용 무한 스크롤 fetcher
export const fetchApplicantMyAlbalist = async (params: {
  limit?: number;
  cursor?: number | null;
  status?: 'REJECTED' | 'INTERVIEW_PENDING' | 'INTERVIEW_COMPLETED' | 'HIRED';
  keyword?: string;
}): Promise<CursorResponse<ApplicantMyAlbaItem>> => {
  const response = await myAlbalistApi.getApplicantMyAlbalist(params);
  return response.data;
};

// 사장님용 무한 스크롤 fetcher
export const fetchOwnerMyAlbalist = async (params: {
  limit?: number;
  cursor?: number | null;
  orderBy?: 'mostRecent' | 'highestWage' | 'mostApplied' | 'mostScrapped';
  keyword?: string;
  isPublic?: boolean;
  isRecruiting?: boolean;
}): Promise<CursorResponse<OwnerMyAlbaItem>> => {
  const response = await myAlbalistApi.getOwnerMyAlbalist(params);
  return response.data;
};
