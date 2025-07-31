'use client';

import { AxiosResponse } from 'axios';

import {
  CreateFormRequest,
  CreateFormResponse,
} from '@/features/addform/schema/addform.schema';
import { useAxiosWithAuth } from '@/shared/lib/axios';

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
  };
};
