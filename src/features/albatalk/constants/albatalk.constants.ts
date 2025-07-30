interface SelectOption {
  value: string;
  label: string;
}

export const ALBATALK_SORT_OPTIONS: SelectOption[] = [
  { value: 'mostRecent', label: '최신순' },
  { value: 'mostCommented', label: '댓글많은순' },
  { value: 'mostLiked', label: '좋아요순' },
];
