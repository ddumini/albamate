'use client';

import FilterBar from '@common/list/FilterBar';

interface FilterState {
  recruit?: string;
  isPublic?: string;
  sort?: string;
  search?: string;
}

interface Props {
  isOwner: boolean;
  filters: FilterState;
  setFilters: (filters: Partial<FilterState>) => void;
}

const AlbaFilterBar = ({ isOwner, filters, setFilters }: Props) => {
  const handleFilterChange = (value: string) => {
    setFilters({ recruit: value });
  };

  const handlePublicFilterChange = (value: string) => {
    setFilters({ isPublic: value });
  };

  const handleSortChange = (value: string) => {
    setFilters({ sort: value });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ search: e.target.value });
  };

  const handleIconClick = () => {
    // 검색 아이콘 클릭 시 현재 입력된 검색어로 검색 실행
    setFilters({ search: filters.search });
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setFilters({ search: filters.search }); // Enter 시 검색
    }
  };

  return (
    <FilterBar
      filterHandlers={{
        handleRecruitChange: handleFilterChange,
        handlePublicChange: handlePublicFilterChange,
        handleSortChange: handleSortChange,
      }}
      isOwner={isOwner}
      publicValue={filters.isPublic || ''}
      recruitValue={filters.recruit || ''}
      searchHandlers={{
        onIconClick: handleIconClick,
        onInputChange: handleInputChange,
        onInputKeyDown: handleInputKeyDown,
      }}
      searchPlaceholder="어떤 알바를 찾고 계세요?"
      searchValue={filters.search || ''}
      sortValue={filters.sort || ''}
    />
  );
};

export default AlbaFilterBar;
