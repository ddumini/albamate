import { useAxiosWithAuth } from '@/shared/lib/axios';

interface PaginationParams {
  limit?: number;
  offset?: number;
  page?: number;
}

// 커스텀 훅으로 인증된 axios 인스턴스 사용
export const useMyAlbalistApi = () => {
  const authAxios = useAxiosWithAuth();

  return {
    getApplicantMyAlbalist: (params: PaginationParams = { limit: 10 }) =>
      authAxios.get('users/me/applications', {
        params,
      }),
    getOwnerMyAlbalist: (params: PaginationParams = { limit: 10 }) =>
      authAxios.get('users/me/forms', {
        params,
      }),
  };
};
