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
