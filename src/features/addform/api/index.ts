'use client';

import { AxiosResponse } from 'axios';

import {
  CreateFormRequest,
  CreateFormResponse,
} from '@/features/addform/schema/addform.schema';
import { axiosInstance } from '@/shared/lib/axios';

export const useAddformApi = () => {
  const authAxios = axiosInstance;

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
      formData.append('image', file);
      return authAxios.post('/images/upload', formData);
    },
  };
};
