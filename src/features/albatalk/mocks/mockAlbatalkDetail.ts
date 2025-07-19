import { PostDetailResponse } from '../types/albatalk';

const mockAlbatalkDetail: PostDetailResponse = {
  id: 370,
  title: 'ㅂㅈㄷㄱ',
  content: 'ㅂㅈㄷㄱ',
  imageUrl:
    'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Albaform/user/414/1752617866179/coplan.png',
  likeCount: 0,
  commentCount: 2,
  createdAt: '2025-07-15T22:17:48.422Z',
  updatedAt: '2025-07-19T11:42:08.966Z',
  writer: {
    id: 414,
    nickname: '초지동얼음공주',
    imageUrl: null,
  },
  isLiked: false,
};

export default mockAlbatalkDetail;
