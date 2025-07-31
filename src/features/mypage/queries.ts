import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import {
  CommentsApi,
  EditPassword,
  PostApi,
  ScrapApi,
} from '@/shared/types/mypage';

import useMyPageApi from './api/api';
import {
  UpdateMyProfileRequest,
  UpdateWorkerMyProfileRequest,
} from './schema/mypage.schema';

// API 응답 타입 정의
interface CursorResponse<T> {
  data: T[];
  nextCursor: number | null;
}

interface PageResponse<T> {
  data: T[];
  currentPage: number;
  totalPages: number;
  totalItemCount: number;
}

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
      data: UpdateMyProfileRequest | UpdateWorkerMyProfileRequest
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
    CursorResponse<any>,
    Error,
    any,
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
    CursorResponse<any>,
    Error,
    any,
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
    PageResponse<any>,
    Error,
    any,
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

// 기존 쿼리들 (하위 호환성을 위해 유지)
export const useMyScrapQuery = ({
  limit,
  orderBy,
  cursor,
  isPublic,
  isRecruiting,
  enabled,
}: ScrapApi) => {
  const api = useMyPageApi();
  return useQuery({
    queryKey: ['myScrap', orderBy, cursor, isPublic, isRecruiting],
    queryFn: async () =>
      await api.getMyScrapAlba({
        limit,
        orderBy,
        cursor,
        isPublic,
        isRecruiting,
      }),
    enabled,
  });
};

export const useMyPostsQuery = ({
  limit,
  orderBy,
  cursor,
  enabled,
}: PostApi) => {
  const api = useMyPageApi();
  return useQuery({
    queryKey: ['myPosts', limit, orderBy, cursor],
    queryFn: async () => await api.getMyPosts({ limit, orderBy, cursor }),
    enabled,
  });
};

export const useMyCommentsQuery = ({
  page,
  pageSize,
  enabled,
}: CommentsApi) => {
  const api = useMyPageApi();
  return useQuery({
    queryKey: ['myComment', page, pageSize],
    queryFn: async () => await api.getMyComments(page, pageSize),
    enabled,
  });
};
