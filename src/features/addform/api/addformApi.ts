'use client';

import { useAxiosWithAuth } from '@/shared/lib/axios';

import { CreateFormRequest } from '../schema/addform.schema';

export const useAddformApi = () => {
  const authAxios = useAxiosWithAuth();

  return {
    postAddform: (form: CreateFormRequest) => {
      return authAxios.post('/forms', form);
    },
    editAddform: (form: CreateFormRequest) => {
      return authAxios.patch('/forms', form);
    },
  };
};
