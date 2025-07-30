'use client';

import { AxiosResponse } from 'axios';

import { axiosInstance } from '@/shared/lib/axios';

import {
  CreateApplicationRequest,
  CreateApplicationResponse,
  UploadResumeResponse,
} from '../schema/apply.schema';

export const postApplication = ({
  formId,
  form,
}: {
  formId: number;
  form: CreateApplicationRequest;
}): Promise<AxiosResponse<CreateApplicationResponse>> => {
  return axiosInstance.post(`/forms/${formId}/applications`, form);
};

export const postResume = (
  file: File
): Promise<AxiosResponse<UploadResumeResponse>> => {
  const formData = new FormData();
  formData.append('file', file);
  return axiosInstance.post(`/resume/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
