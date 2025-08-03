import { axiosInstance } from '@/shared/lib/axios';

import { ApplicantFilterParams, OwnerFilterParams } from '../types/myalbalist';

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
  deleteForm: (formId: number) => {
    return axiosInstance.delete(`forms/${formId}`);
  },
};
