'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { useAddformApi } from '../api/api';
import {
  CreateFormRequest,
  createFormResponseSchema,
} from '../schema/addform.schema';

export const useAddformMutation = () => {
  const { postAddform } = useAddformApi();
  const router = useRouter();
  return useMutation({
    mutationFn: (form: CreateFormRequest) => postAddform(form),
    onSuccess: response => {
      const parseResponse = createFormResponseSchema.safeParse(response.data);
      if (!parseResponse.success) {
        console.error(
          '서버 응답 데이터 Zod 유효성 검사 실패',
          parseResponse.error
        );
        return;
      }
      router.push(`/alba/${parseResponse.data.id}`);
    },
    onError: error => {
      console.error('폼 제출 실패', error);
    },
  });
};
