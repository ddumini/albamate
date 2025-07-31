import { AxiosInstance } from 'axios';

import { axiosInstance } from '@/shared/lib/axios';

import {
  type AlbatalkDetailResponse,
  AlbatalkDetailResponseSchema,
  type AlbatalksResponse,
  AlbatalksResponseSchema,
  type GetAlbatalksParams,
  GetAlbatalksParamsSchema,
} from '../schemas/albatalk.schema';

/**
 * 게시글 목록 조회 API
 */
export const fetchAlbatalks = async (
  params: GetAlbatalksParams
): Promise<AlbatalksResponse> => {
  // 파라미터 검증
  const validatedParams = GetAlbatalksParamsSchema.parse(params);

  const queryParams = {
    limit: validatedParams.limit,
    ...(validatedParams.cursor && { cursor: validatedParams.cursor }),
    ...(validatedParams.orderBy && { orderBy: validatedParams.orderBy }),
    ...(validatedParams.keyword && { keyword: validatedParams.keyword }),
  };

  const response = await axiosInstance.get('/posts', {
    params: queryParams,
  });

  // 응답 데이터 검증
  return AlbatalksResponseSchema.parse(response.data);
};

/**
 * 게시글 상세 조회 API
 */
export const fetchAlbatalkDetail = async (
  postId: number,
  authAxios: AxiosInstance
): Promise<AlbatalkDetailResponse> => {
  const response = await authAxios.get(`/posts/${postId}`);

  return AlbatalkDetailResponseSchema.parse(response.data);
};

/**
 * 게시글 좋아요 토글 API
 */
export const addAlbatalkLike = async (
  postId: number,
  authAxios: AxiosInstance
): Promise<void> => {
  await authAxios.post(`/posts/${postId}/like`);
};

/**
 * 게시글 좋아요 취소 API
 */
export const removeAlbatalkLike = async (
  postId: number,
  authAxios: AxiosInstance
): Promise<void> => {
  await authAxios.delete(`/posts/${postId}/like`);
};
