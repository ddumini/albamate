import { ContentType, SortOption } from '../types/mypage';

export const SORT_OPTIONS: Record<ContentType, SortOption[]> = {
  post: [
    { value: 'mostRecent', label: '최신순' },
    { value: 'mostCommented', label: '댓글 많은 순' },
    { value: 'mostLiked', label: '좋아요 순' },
  ],
  comment: [
    { value: 'mostRecent', label: '최신순' },
    { value: 'mostOld', label: '오래된 순' },
  ],
  scrap: [
    { value: 'mostRecent', label: '최신순' },
    { value: 'highestWage', label: '시급 높은 순' },
    { value: 'mostApplied', label: '지원 많은 순' },
    { value: 'mostScrapped', label: '스크랩 많은 순' },
  ],
};
