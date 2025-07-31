'use client';

import { AxiosResponse } from 'axios';

import {
  CreateApplicationRequest,
  CreateApplicationResponse,
  UploadResumeResponse,
} from '@/features/apply/schema/apply.schema';
import { axiosInstance } from '@/shared/lib/axios';

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
  return axiosInstance.post(`/resume/upload`, formData);
};
