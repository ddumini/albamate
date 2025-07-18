export interface FilterBarProps {
  isOwner: boolean;
  searchPlaceholder?: string;
  onInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onIconClick?: () => void;
  onRecruitFilterChange: (value: string) => void;
  onPublicFilterChange: (value: string) => void;
  onSortChange: (value: string) => void;
}
