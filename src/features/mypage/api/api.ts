import { axiosInstance } from '@/shared/lib/axios';
import { EditPassword, PostApi, ScrapApi } from '@/shared/types/mypage';
import { generateUniqueFileName } from '@/shared/utils/generateUniqueFileName';

import {
  UpdateOwnerMyProfile,
  UpdateWorkerMyProfileRequest,
} from '../schema/mypage.schema';

const useMyPageApi = () => {
  const authAxios = axiosInstance;

  return {
    // 이미지 업로드
    updateImage: (file: File) => {
      const formData = new FormData();
      const newFile = generateUniqueFileName(file);
      formData.append('image', file, newFile);
      return authAxios.post(`/images/upload`, formData).then(res => res.data);
    },

    // 내 정보 조회
    getMyProfile: () => authAxios.get('/users/me'),

    // 내 정보 수정
    updateMyProfile: (
      data: UpdateWorkerMyProfileRequest | UpdateOwnerMyProfile
    ) =>
      authAxios.patch('/users/me', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      }),

    // 비밀번호 변경
    updatePassword: (data: EditPassword) =>
      authAxios.patch('/users/me/password', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      }),

    // 내가 작성한 게시글 목록 조회
    getMyPosts: ({ limit, orderBy, cursor }: PostApi) =>
      authAxios
        .get(`/users/me/posts`, {
          params: {
            limit,
            orderBy,
            cursor,
          },
        })
        .then(res => res.data),

    // 내가 작성한 댓글 목록 조회
    getMyComments: (page = 1, pageSize = 6) =>
      authAxios
        .get(`/users/me/comments?page=${page}&pageSize=${pageSize}`)
        .then(res => res.data),

    // 내가 스크랩한 알바폼 목록 조회
    getMyScrapAlba: ({
      limit,
      orderBy,
      cursor,
      isPublic,
      isRecruiting,
    }: ScrapApi) =>
      authAxios
        .get(`/users/me/scrap`, {
          params: {
            limit,
            orderBy,
            cursor,
            isPublic,
            isRecruiting,
          },
        })
        .then(res => res.data),

    // 내가 작성한 게시글 삭제
    getDeletePost: async (postId: number): Promise<void> =>
      await authAxios.delete(`/posts/${postId}`),

    // 내가 작성한 댓글 삭제
    getDeleteComments: async (commentId: number): Promise<void> =>
      await authAxios.delete(`/comments/${commentId}`),

    // 내가 작성한 댓글 수정
    updateMyComment: (commentId: number, content: string) =>
      authAxios.patch(
        `/comments/${commentId}`,
        { content },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      ),

    // 내 스크랩 취소
    getCancelScrap: async (formId: number) =>
      await authAxios.delete(`/forms/${formId}/scrap`),
  };
};
export default useMyPageApi;
