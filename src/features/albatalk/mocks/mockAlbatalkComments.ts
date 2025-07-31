import { CommentsResponse } from '../schemas/albatalk.schema';

const mockAlbatalkComments: CommentsResponse = {
  data: [
    {
      id: 436,
      content: '안녕하세요~',
      createdAt: '2025-07-19T11:42:08.966Z',
      updatedAt: '2025-07-19T11:42:08.966Z',
      writer: {
        id: 446,
        nickname: '펭귄',
        imageUrl: null,
      },
    },
    {
      id: 435,
      content: '좋은 알바 추천해주세요!!',
      createdAt: '2025-07-19T10:27:36.687Z',
      updatedAt: '2025-07-19T10:27:36.687Z',
      writer: {
        id: 446,
        nickname: '펭귄',
        imageUrl: null,
      },
    },
  ],
  totalItemCount: 2,
  currentPage: 1,
  totalPages: 1,
};

export default mockAlbatalkComments;
