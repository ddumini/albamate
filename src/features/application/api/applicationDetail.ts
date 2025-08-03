import { axiosInstance } from '@/shared/lib/axios';

export const useApplicationDetailApi = () => {
  const authAxios = axiosInstance;

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

    // 이력서 다운로드
    downloadResume: (resumeId: string) => {
      return authAxios.get(`${resumeId}/download`, {
        responseType: 'blob',
      });
    },

    // 지원 상태 수정 (사장님용)
    updateApplicationStatus: (
      applicationId: string,
      data: { status: string }
    ) => {
      return authAxios.patch(`/applications/${applicationId}`, data);
    },
  };
};
