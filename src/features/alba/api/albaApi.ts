import { axiosInstance } from '@/shared/lib/axios';

interface ApplicationQueryParams {
  limit?: number;
  cursor?: number;
  [key: string]: any;
}

interface VerifyMyApplicationRequest {
  name: string;
  phoneNumber: string;
  password: string;
}

const albaApi = () => {
  const authAxios = axiosInstance;

  const deleteForm = async (formId: number) => {
    return await authAxios.delete(`/forms/${formId}`);
  };

  // 지원 현황 목록 조회
  const getApplications = async (
    formId: number,
    params: ApplicationQueryParams = { limit: 10 }
  ) => {
    return await authAxios.get(`/forms/${formId}/applications`, { params });
  };

  // 비회원의 내 지원 내역 조회
  const verifyMyApplication = async (
    formId: number,
    body: VerifyMyApplicationRequest
  ) => {
    return await authAxios.post(`/forms/${formId}/my-application/verify`, body);
  };

  return {
    deleteForm,
    getApplications,
    verifyMyApplication,
  };
};

export default albaApi;
