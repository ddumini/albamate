import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

import { useAxiosWithAuth } from '@/shared/lib/axios';

import {
  addAlbatalkLike,
  createComment,
  deleteComment,
  fetchAlbatalkDetail,
  fetchAlbatalks,
  // 댓글 관련 API 함수들
  fetchComments,
  removeAlbatalkLike,
  updateComment,
} from '../api/albatalkApi';
import type {
  GetAlbatalksParams,
  GetCommentsParams,
} from '../schemas/albatalk.schema';

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
  commentsList: (postId: number, params?: GetCommentsParams) =>
    [...albatalkKeys.comments(postId), 'list', params] as const,
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

// ========== 댓글 관련 훅들 ==========

/**
 * 댓글 목록 조회 훅
 */
export const useAlbatalkComments = (
  postId: number,
  params?: GetCommentsParams
) => {
  const authAxios = useAxiosWithAuth();
  const { data: session, status } = useSession();

  const isSessionLoading = status === 'loading';
  const hasAccessToken = !!session?.accessToken;

  return useQuery({
    queryKey: albatalkKeys.commentsList(postId, params),
    queryFn: () => fetchComments(postId, authAxios, params),
    enabled: !isSessionLoading && hasAccessToken,
    staleTime: 1000 * 60 * 5, // 5분
    gcTime: 1000 * 60 * 10, // 10분
  });
};

/**
 * 댓글 작성 훅
 */
export const useCreateAlbatalkComment = () => {
  const queryClient = useQueryClient();
  const authAxios = useAxiosWithAuth();

  return useMutation({
    mutationFn: ({ postId, content }: { postId: number; content: string }) =>
      createComment(postId, content, authAxios),
    onSuccess: (_, { postId }) => {
      // 해당 게시글의 댓글 목록 무효화
      queryClient.invalidateQueries({
        queryKey: albatalkKeys.comments(postId),
      });

      // 게시글 상세 정보도 무효화 (댓글 수 업데이트를 위해)
      queryClient.invalidateQueries({
        queryKey: albatalkKeys.detail(postId),
      });
    },
    onError: error => {
      console.error('댓글 작성 실패:', error);
    },
  });
};

/**
 * 댓글 수정 훅
 */
export const useUpdateAlbatalkComment = () => {
  const queryClient = useQueryClient();
  const authAxios = useAxiosWithAuth();

  return useMutation({
    mutationFn: ({
      commentId,
      content,
      postId,
    }: {
      commentId: number;
      content: string;
      postId: number;
    }) => updateComment(commentId, content, authAxios),
    onSuccess: (_, { postId }) => {
      // 해당 게시글의 댓글 목록 무효화
      queryClient.invalidateQueries({
        queryKey: albatalkKeys.comments(postId),
      });
    },
    onError: error => {
      console.error('댓글 수정 실패', error);
    },
  });
};

/**
 * 댓글 삭제 훅
 */
export const useDeleteAlbatalkComment = () => {
  const queryClient = useQueryClient();
  const authAxios = useAxiosWithAuth();

  return useMutation({
    mutationFn: ({
      commentId,
      postId,
    }: {
      commentId: number;
      postId: number;
    }) => deleteComment(commentId, authAxios),
    onSuccess: (_, { postId }) => {
      // 해당 게시글의 댓글 목록 무효화
      queryClient.invalidateQueries({
        queryKey: albatalkKeys.comments(postId),
      });

      // 게시글 상세 정보도 무효화 (댓글 수 업데이트를 위해)
      queryClient.invalidateQueries({
        queryKey: albatalkKeys.detail(postId),
      });
    },
    onError: error => {
      console.error('댓글 삭제 실패:', error);
    },
  });
};
