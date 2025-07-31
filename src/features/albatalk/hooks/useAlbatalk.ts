import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

import { useAxiosWithAuth } from '@/shared/lib/axios';

import {
  addAlbatalkLike,
  fetchAlbatalkDetail,
  fetchAlbatalks,
  removeAlbatalkLike,
} from '../api/albatalkApi';
import type { GetAlbatalksParams } from '../schemas/albatalk.schema';

// 쿼리 키 팩토리
export const albatalkKeys = {
  all: ['albatalk'] as const,
  lists: () => [...albatalkKeys.all, 'list'] as const,
  list: (params: GetAlbatalksParams) =>
    [...albatalkKeys.lists(), params] as const,
  details: () => [...albatalkKeys.all, 'detail'] as const,
  detail: (id: number) => [...albatalkKeys.details(), id] as const,
  comments: (postId: number) =>
    [...albatalkKeys.all, 'comments', postId] as const,
};

/**
 * 게시글 목록 조회 훅
 */
export const useAlbatalks = (params: GetAlbatalksParams) => {
  return useQuery({
    queryKey: albatalkKeys.list(params),
    queryFn: () => fetchAlbatalks(params),
    staleTime: 1000 * 60 * 5, // 5분
    gcTime: 1000 * 60 * 10, // 10분
  });
};

/**
 * 게시글 상세 조회 훅
 * @returns
 */
export const useAlbatalkDetail = (postId: number) => {
  const authAxios = useAxiosWithAuth();
  const { data: session, status } = useSession(); // 세션과 상태 가져오기

  const isSessionLoading = status === 'loading';
  const hasAccessToken = !!session?.accessToken;

  return useQuery({
    queryKey: albatalkKeys.detail(postId),
    queryFn: () => fetchAlbatalkDetail(postId, authAxios),
    enabled: !isSessionLoading && hasAccessToken,
    staleTime: 1000 * 60 * 5, // 5분
    gcTime: 1000 * 60 * 10, // 10분
  });
};

/**
 * 게시글 좋아요 토글 훅
 */
export const useAddAlbatalkLike = () => {
  const queryClient = useQueryClient();
  const authAxios = useAxiosWithAuth();

  return useMutation({
    mutationFn: (postId: number) => addAlbatalkLike(postId, authAxios),
    onSuccess: (_, postId) => {
      // 게시글 상세 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: albatalkKeys.detail(postId),
      });
      // 게시글 목록 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: albatalkKeys.lists(),
      });
    },
    onError: error => {
      console.error('좋아요 실패:', error);
    },
  });
};

/**
 * 게시글 좋아요 취소 훅
 */
export const useRemoveAlbatalkLike = () => {
  const queryClient = useQueryClient();
  const authAxios = useAxiosWithAuth();

  return useMutation({
    mutationFn: (postId: number) => removeAlbatalkLike(postId, authAxios),
    onSuccess: (_, postId) => {
      queryClient.invalidateQueries({
        queryKey: albatalkKeys.detail(postId),
      });
      queryClient.invalidateQueries({
        queryKey: albatalkKeys.lists(),
      });
    },
    onError: error => {
      console.error('좋아요 취소 실패:', error);
    },
  });
};
