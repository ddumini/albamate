import { axiosInstance, useAxiosWithAuth } from '@/shared/lib/axios';

// 이미지 업로드
export const useUploadImage = () => {
  const authAxios = useAxiosWithAuth();

  return {
    getImageUrl: (file: File) => {
      const formData = new FormData();
      formData.append('image', file);
      return authAxios.post(`/images/upload`, formData).then(res => res.data);
    },
  };
};

// 알바폼 상세 조회
export const getFormDetail = (formId: number) =>
  axiosInstance.get(`/forms/${formId}`);
