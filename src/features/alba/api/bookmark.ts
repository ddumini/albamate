// import { axiosInstance } from '@/shared/lib/axios';

export const addBookmark = async (formId: string | number) => {
  console.log(`[MOCK] POST /forms/${formId}/scrap`);
  return Promise.resolve(); // 실제 API 대신 성공 응답 시뮬레이션
};

export const removeBookmark = async (formId: string | number) => {
  console.log(`[MOCK] DELETE /forms/${formId}/scrap`);
  return Promise.resolve(); // 실제 API 대신 성공 응답 시뮬레이션
};
