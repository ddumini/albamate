'use client';

import { AxiosResponse } from 'axios';

import { useAxiosWithAuth } from '@/shared/lib/axios';

import {
  CreateFormRequest,
  CreateFormResponse,
} from '../schema/addform.schema';

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
