import { axiosInstance } from '@/shared/lib/axios';

const albaApi = () => {
  const authAxios = axiosInstance;

  const deleteForm = async (formId: number) => {
    return await authAxios.delete(`/forms/${formId}`);
  };

  return {
    deleteForm,
  };
};

export default albaApi;
