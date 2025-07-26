import { axiosInstance } from '@/shared/lib/axios';
import {
  CommentCardItem,
  EditPassword,
  PostCardItem,
  ScrapCardItem,
  UpdateMyProfile,
} from '@/shared/types/mypage';

// 내 정보 조회
export const getMyProfile = () => axiosInstance.get('/users/me');

// 내 정보 수정
export const updateMyProfile = (data: UpdateMyProfile) =>
  axiosInstance.patch('/users/me', data);

// 비밀번호 변경
export const updatePassword = (data: EditPassword) =>
  axiosInstance.patch('/users/me/password', data);

// 내가 작성한 게시글 목록 조회
export const getMyPosts = (limit: number): Promise<PostCardItem[]> =>
  axiosInstance.get(`/users/me/posts?limit=${limit}`).then(res => res.data);

// 내가 작성한 댓글 목록 조회
export const getMyComments = (
  page = 1,
  pageSize = 10
): Promise<CommentCardItem[]> =>
  axiosInstance
    .get(`/users/me/comments?page=${page}&pageSize=${pageSize}`)
    .then(res => res.data);

// 내가 스크랩한 알바폼 목록 조회
export const getMyScrapAlbaForms = (): Promise<ScrapCardItem[]> =>
  axiosInstance.get('/users/me/scrap').then(res => res.data);
