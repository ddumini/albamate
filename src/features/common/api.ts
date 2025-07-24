import { axiosInstance } from '@/shared/lib/axios';

// 이미지 업로드
export const uploadImage = (file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  return axiosInstance.post(`/images/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

// 알바폼 상세 조회
export const getFormDetail = (formId: number) =>
  axiosInstance.get(`/forms/${formId}`);
