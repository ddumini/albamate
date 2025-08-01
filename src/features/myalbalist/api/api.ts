import { axiosInstance } from '@/shared/lib/axios';

interface PaginationParams {
  page?: number;
  limit?: number;
}

interface OwnerFilterParams extends PaginationParams {
  status?: string;
  keyword?: string;
}

interface ApplicantFilterParams extends PaginationParams {
  keyword?: string;
}

// axiosInstance를 직접 사용하여 API 호출
export const myAlbalistApi = {
  getApplicantMyAlbalist: (params: ApplicantFilterParams = { limit: 10 }) => {
    return axiosInstance.get('users/me/applications', {
      params,
    });
  },
  getOwnerMyAlbalist: (params: OwnerFilterParams = { limit: 10 }) => {
    return axiosInstance.get('users/me/forms', {
      params,
    });
  },
};
