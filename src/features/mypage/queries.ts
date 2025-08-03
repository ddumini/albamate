import {
  InfiniteData,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import {
  CommentCardItem,
  CommentsApi,
  CursorResponse,
  EditPassword,
  PageResponse,
  PostApi,
  PostCardItem,
  ScrapApi,
  ScrapCardItem,
} from '@/shared/types/mypage';

import useMyPageApi from './api/api';
import {
  UpdateOwnerMyProfile,
  UpdateWorkerMyProfileRequest,
} from './schema/mypage.schema';

export const useMyProfileQuery = () => {
  const api = useMyPageApi();

  return useQuery({
    queryKey: ['myProfile'],
    queryFn: async () => await api.getMyProfile(),
  });
};

export const useUpdateMyProfileQuery = () => {
  const queryClient = useQueryClient();
  const api = useMyPageApi();

  return useMutation({
    mutationFn: async (
      data: UpdateOwnerMyProfile | UpdateWorkerMyProfileRequest
    ) => await api.updateMyProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myProfile'] });
    },
  });
};

export const useUpdateMyPasswordQuery = () => {
  const queryClient = useQueryClient();
  const api = useMyPageApi();
  return useMutation({
    mutationFn: async (data: EditPassword) => await api.updatePassword(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['updatePassword'] });
    },
  });
};

// 커서 기반 무한 스크롤 (Post, Scrap)
export const useMyPostsInfiniteQuery = ({
  limit,
  orderBy,
  enabled,
}: Omit<PostApi, 'cursor'> & { enabled?: boolean }) => {
  const api = useMyPageApi();

  return useInfiniteQuery<
    CursorResponse<PostCardItem>,
    Error,
    InfiniteData<CursorResponse<PostCardItem>>,
    (string | number)[],
    number | null
  >({
    queryKey: ['myPosts', limit, orderBy],
    queryFn: async ({ pageParam }) => {
      return await api.getMyPosts({
        limit,
        orderBy,
        cursor: pageParam,
      });
    },
    initialPageParam: null,
    getNextPageParam: lastPage => {
      return lastPage.nextCursor ?? undefined;
    },
    enabled,
  });
};

export const useMyScrapInfiniteQuery = ({
  limit,
  orderBy,
  isPublic,
  isRecruiting,
  enabled,
}: Omit<ScrapApi, 'cursor'> & { enabled?: boolean }) => {
  const api = useMyPageApi();

  return useInfiniteQuery<
    CursorResponse<ScrapCardItem>,
    Error,
    InfiniteData<CursorResponse<ScrapCardItem>>,
    (string | number | boolean | null | undefined)[],
    number | null
  >({
    queryKey: ['myScrap', limit, orderBy, isPublic, isRecruiting],
    queryFn: async ({ pageParam }) => {
      return await api.getMyScrapAlba({
        limit,
        orderBy,
        cursor: pageParam,
        isPublic,
        isRecruiting,
      });
    },
    initialPageParam: null,
    getNextPageParam: lastPage => {
      return lastPage.nextCursor ?? undefined;
    },
    enabled,
  });
};

// 페이지 기반 무한 스크롤 (Comments)
export const useMyCommentsInfiniteQuery = ({
  pageSize,
  enabled,
}: Omit<CommentsApi, 'page'> & { enabled?: boolean }) => {
  const api = useMyPageApi();

  return useInfiniteQuery<
    PageResponse<CommentCardItem>,
    Error,
    InfiniteData<CursorResponse<CommentCardItem>>,
    (string | number)[],
    number
  >({
    queryKey: ['myComments', pageSize],
    queryFn: async ({ pageParam }) => {
      return await api.getMyComments(pageParam, pageSize);
    },
    initialPageParam: 1,
    getNextPageParam: lastPage => {
      if (lastPage.currentPage < lastPage.totalPages) {
        return lastPage.currentPage + 1;
      }
      return undefined;
    },
    enabled,
  });
};

export const useMyPostDelete = () => {
  const api = useMyPageApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postId: number) => api.getDeletePost(postId),
    onSuccess: () => {
      // 삭제 성공 시, 관련 데이터를 다시 가져오게 트리거
      queryClient.invalidateQueries({ queryKey: ['myPosts'] });
    },
    onError: error => {
      console.error('게시글 삭제 실패', error);
    },
  });
};

export const useMyCommentDelete = () => {
  const api = useMyPageApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (commentId: number) => api.getDeleteComments(commentId),
    onSuccess: () => {
      // 삭제 성공 시, 관련 데이터를 다시 가져오게 트리거
      queryClient.invalidateQueries({ queryKey: ['myComments'] });
    },
    onError: error => {
      console.error('댓글 삭제 실패', error);
    },
  });
};

export const useMyScrapDelete = () => {
  const api = useMyPageApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formId: number) => api.getCancelScrap(formId),
    onSuccess: () => {
      // 삭제 성공 시, 관련 데이터를 다시 가져오게 트리거
      queryClient.invalidateQueries({ queryKey: ['myScrap'] });
    },
    onError: error => {
      console.error('스크랩 취소 실패', error);
    },
  });
};

// 내가 작성한 댓글 수정하기
export const useUpdateMyCommentQuery = () => {
  const queryClient = useQueryClient();
  const api = useMyPageApi();

  return useMutation({
    mutationFn: async ({ id, content }: { id: number; content: string }) =>
      await api.updateMyComment(id, content),
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ['myComments'] });
    },
  });
};
