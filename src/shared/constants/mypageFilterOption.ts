import { ContentType, SortOption } from '../types/mypage';

export const SORT_OPTIONS: Record<ContentType, SortOption[]> = {
  post: [
    { value: 'latest', label: '최신순' },
    { value: 'comments', label: '댓글 많은 순' },
    { value: 'like', label: '좋아요 순' },
  ],
  comment: [
    { value: 'latest', label: '최신순' },
    { value: 'old', label: '오래된 순' },
  ],
  scrap: [
    { value: 'latest', label: '최신순' },
    { value: 'scrap', label: '스크랩 많은 순' },
    { value: 'apply', label: '지원 많은 순' },
  ],
};
