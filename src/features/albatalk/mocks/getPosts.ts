import { PostsResponse } from '@/features/albatalk/types/albatalk';

const mockPostsData: PostsResponse = {
  data: [
    {
      id: 370,
      title: 'ㅂㅈㄷㄱ',
      content: 'ㅂㅈㄷㄱ',
      imageUrl:
        'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Albaform/user/414/1752617866179/coplan.png',
      likeCount: 0,
      commentCount: 0,
      createdAt: '2025-07-15T22:17:48.422Z',
      updatedAt: '2025-07-15T22:17:48.422Z',
      writer: {
        id: 414,
        nickname: '초지동얼음공주',
        imageUrl: null,
      },
    },
    {
      id: 231,
      title: '테스트',
      content: '테스트입니다.',
      imageUrl: '',
      likeCount: 0,
      commentCount: 2,
      createdAt: '2024-12-28T06:48:18.678Z',
      updatedAt: '2025-07-15T22:16:31.662Z',
      writer: {
        id: 193,
        nickname: '전상민',
        imageUrl: '',
      },
    },
    {
      id: 221,
      title: '내년 크리스마스는',
      content: '제~~~~~~~발',
      imageUrl: '',
      likeCount: 1,
      commentCount: 5,
      createdAt: '2024-12-25T06:29:46.248Z',
      updatedAt: '2024-12-26T19:33:39.762Z',
      writer: {
        id: 193,
        nickname: '전상민',
        imageUrl: null,
      },
    },
    {
      id: 220,
      title: '캐캐싱싱테테스트',
      content: 'ㅋㅅㅌㅅㅌ',
      imageUrl:
        'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Albaform/user/193/1735108004862/screencapture-localhost-3000-mypage-2024-12-23-12_58_12.png',
      likeCount: 0,
      commentCount: 1,
      createdAt: '2024-12-25T06:26:46.329Z',
      updatedAt: '2024-12-26T23:53:11.237Z',
      writer: {
        id: 193,
        nickname: '전상민',
        imageUrl: null,
      },
    },
    {
      id: 219,
      title: '캐싱 테스트',
      content: '태그 캐싱',
      imageUrl:
        'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Albaform/user/193/1735107937845/screencapture-localhost-3000-albatalk-2024-12-25-03_22_59.png',
      likeCount: 0,
      commentCount: 0,
      createdAt: '2024-12-25T06:25:39.802Z',
      updatedAt: '2024-12-25T06:25:39.802Z',
      writer: {
        id: 193,
        nickname: '전상민',
        imageUrl:
          'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Albaform/user/190/1732608458993/profile.png',
      },
    },
    {
      id: 218,
      title: '메리스크리마스욧',
      content: '후 크리스마스라니',
      imageUrl: '',
      likeCount: 0,
      commentCount: 0,
      createdAt: '2024-12-25T06:04:23.104Z',
      updatedAt: '2024-12-25T06:04:23.104Z',
      writer: {
        id: 193,
        nickname: '전상민',
        imageUrl:
          'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Albaform/user/246/1735158934022/screencapture-localhost-3000-albatalk-2024-12-25-03_22_59.png',
      },
    },
  ],
  nextCursor: 218,
};

export default mockPostsData;
