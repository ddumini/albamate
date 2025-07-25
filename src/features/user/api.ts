import { axiosInstance } from '@/shared/lib/axios';
import { EditPassword, UpdateMyProfile } from '@/shared/types/mypage';

// 내 정보 조회
export const getMyProfile = () => axiosInstance.get('/users/me');

// 내 정보 수정
export const updateMyProfile = (data: UpdateMyProfile) =>
  axiosInstance.patch('/users/me', data);

// 비밀번호 변경
export const updatePassword = (data: EditPassword) =>
  axiosInstance.patch('/users/me/password', data);

// 내가 스크랩한 알바폼 목록 조회
export const getMyScrapAlbaForms = () => axiosInstance.get('/users/me/scrap');

// 내가 작성한 게시글 목록 조회
export const getMyPosts = (limit: number) =>
  axiosInstance.get(`/users/me/posts?limit=${limit}`);

// 내가 작성한 댓글 목록 조회
export const getMyComments = (page = 1, pageSize = 10) =>
  axiosInstance.get(`/users/me/comments?page=${page}&pageSize=${pageSize}`);
