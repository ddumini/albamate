// types/filter.ts

export interface SearchHandlers {
  onInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onIconClick?: () => void;
  onInputKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export interface FilterHandlers {
  handleRecruitChange: (value: string) => void;
  handlePublicChange: (value: string) => void;
  handleSortChange: (value: string) => void;
}

export interface FilterBarProps {
  isOwner: boolean;
  searchPlaceholder?: string;
  searchValue?: string;
  recruitValue?: string;
  publicValue?: string;
  sortValue?: string;
  searchHandlers?: SearchHandlers;
  filterHandlers: FilterHandlers;
}
