import { useAxiosWithAuth } from '@/shared/lib/axios';

export const useApplicationDetailApi = () => {
  const authAxios = useAxiosWithAuth();

  return {
    // 알바폼 상세 조회
    getAlbaformDetail: (formId: string) => {
      return authAxios.get(`forms/${formId}`);
    },

    // 내 지원서 조회
    getMyApplication: (formId: string) => {
      return authAxios.get(`forms/${formId}/my-application`);
    },

    // 특정 지원서 조회 (사장님용)
    getApplicationById: (applicationId: string) => {
      return authAxios.get(`applications/${applicationId}`);
    },
  };
};
