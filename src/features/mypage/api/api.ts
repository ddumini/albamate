import { useAxiosWithAuth } from '@/shared/lib/axios';
import {
  EditPassword,
  PostApi,
  ScrapApi,
  UpdateMyProfile,
} from '@/shared/types/mypage';

const useMyPageApi = () => {
  const authAxios = useAxiosWithAuth();

  return {
    // 내 정보 조회
    getMyProfile: () => authAxios.get('/users/me'),

    // 내 정보 수정
    updateMyProfile: (data: UpdateMyProfile) =>
      authAxios.patch('/users/me', data),

    // 비밀번호 변경
    updatePassword: (data: EditPassword) =>
      authAxios.patch('/users/me/password', data),

    // 내가 작성한 게시글 목록 조회
    getMyPosts: ({ limit, orderBy, cursor }: PostApi) =>
      authAxios
        .get(`/users/me/posts?limit=${limit}&orderBy=${orderBy}`, {
          params: {
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
        .get(`/users/me/scrap?limit=${limit}&orderBy=${orderBy}`, {
          params: {
            cursor,
            isPublic,
            isRecruiting,
          },
        })
        .then(res => res.data),
  };
};
export default useMyPageApi;
