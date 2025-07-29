import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  CommentsApi,
  EditPassword,
  PostApi,
  ScrapApi,
  UpdateMyProfile,
} from '@/shared/types/mypage';

import useMyPageApi from './api/api';

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
    mutationFn: async (data: UpdateMyProfile) =>
      await api.updateMyProfile(data),
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
