import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { EditPassword, UpdateMyProfile } from '@/shared/types/mypage';

import {
  getMyComments,
  getMyPosts,
  getMyProfile,
  getMyScrapAlbaForms,
  updateMyProfile,
  updatePassword,
} from '../user/api';

export const useMyProfileQuery = () => {
  return useQuery({
    queryKey: ['myProfile'],
    queryFn: () => getMyProfile(),
  });
};

export const useUpdateMyProfileQuery = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateMyProfile) => updateMyProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myProfile'] });
    },
  });
};

export const useUpdateMyPasswordQuery = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: EditPassword) => updatePassword(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['updatePassword'] });
    },
  });
};

export const useMyScrapQuery = () =>
  useQuery({
    queryKey: ['myScrap'],
    queryFn: () => getMyScrapAlbaForms(),
  });

export const useMyPostsQuery = (limit: number) =>
  useQuery({
    queryKey: ['myPosts', limit],
    queryFn: () => getMyPosts(limit),
  });

export const useMyCommentsQuery = (page: number, pageSize: number) =>
  useQuery({
    queryKey: ['myComment', page, pageSize],
    queryFn: () => getMyComments(page, pageSize),
  });
