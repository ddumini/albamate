'use client';

import { AxiosResponse } from 'axios';

import {
  CreateFormRequest,
  CreateFormResponse,
} from '@/features/addform/schema/addform.schema';
import { useAxiosWithAuth } from '@/shared/lib/axios';
import { generateUniqueFileName } from '@/shared/utils/generateUniqueFileName';

export const useAddformApi = () => {
  const authAxios = useAxiosWithAuth();

  return {
    postAddform: (
      form: CreateFormRequest
    ): Promise<AxiosResponse<CreateFormResponse>> => {
      return authAxios.post('/forms', form);
    },
    editAddform: (
      form: CreateFormRequest
    ): Promise<AxiosResponse<CreateFormResponse>> => {
      return authAxios.patch('/forms', form);
    },
    uploadImage: (file: File): Promise<AxiosResponse<{ url: string }>> => {
      const formData = new FormData();
      const newFileName = generateUniqueFileName(file);
      formData.append('image', file, newFileName);
      return authAxios.post('/images/upload', formData);
    },
  };
};
