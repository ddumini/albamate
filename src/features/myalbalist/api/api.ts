import { axiosInstance } from '@/shared/lib/axios';

export const getApplicantMyAlbalist = () =>
  axiosInstance.get(`/users/me/applications`);

export const getOwnerMyAlbalist = () => axiosInstance.get(`/users/me/forms`);
