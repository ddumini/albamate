'use client';

import FilterBar from '@common/list/FilterBar';

interface Props {
  isOwner: boolean;
  searchValue: string;
  recruitValue?: string;
  sortValue?: string;
  onSearchChange: (value: string) => void;
  onFilterChange: (filters: FilterState) => void;
}

interface FilterState {
  recruitStatus?: string;
  sortStatus?: string;
  searchKeyword?: string;
}

const AlbaFilterBar = ({
  isOwner,
  searchValue,
  recruitValue,
  sortValue,
  onSearchChange,
  onFilterChange,
}: Props) => {
  const handleFilterChange = (value: string) => {
    onFilterChange({ recruitStatus: value });
  };

  const handleSortChange = (value: string) => {
    onFilterChange({ sortStatus: value });
  };

  const handleIconClick = () => {
    onFilterChange({ searchKeyword: searchValue });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const value = e.currentTarget.value;
      onSearchChange(value);
      onFilterChange({ searchKeyword: value });
    }
  };

  return (
    <FilterBar
      filterHandlers={{
        handleRecruitChange: handleFilterChange,
        handleSortChange: handleSortChange,
      }}
      isOwner={isOwner}
      recruitValue={recruitValue}
      searchHandlers={{
        onIconClick: handleIconClick,
        onInputChange: handleInputChange,
        onInputKeyDown: handleInputKeyDown,
      }}
      searchPlaceholder="어떤 알바를 찾고 계세요?"
      searchValue={searchValue}
      sortValue={sortValue}
    />
  );
};

export default AlbaFilterBar;
