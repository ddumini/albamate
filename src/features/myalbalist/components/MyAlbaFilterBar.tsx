'use client';

import FilterBar from '@common/list/FilterBar';

interface Props {
  isOwner: boolean;
  searchValue: string;
  recruitValue?: string;
  publicValue?: string;
  sortValue?: string;
  onSearchChange: (value: string) => void;
  onFilterChange: (filters: FilterState) => void;
}

interface FilterState {
  recruitStatus?: string;
  publicStatus?: string;
  sortStatus?: string;
  searchKeyword?: string;
}

const AlbaFilterBar = ({
  isOwner,
  searchValue,
  recruitValue,
  publicValue,
  sortValue,
  onSearchChange,
  onFilterChange,
}: Props) => {
  const handleFilterChange = (value: string) => {
    console.log('모집 여부 필터 변경:', value);
    onFilterChange({ recruitStatus: value });
  };

  const handlePublicFilterChange = (value: string) => {
    console.log('공개/비공개 필터 변경:', value);
    onFilterChange({ publicStatus: value });
  };

  const handleSortChange = (value: string) => {
    console.log('정렬 변경:', value);
    onFilterChange({ sortStatus: value });
  };

  const handleIconClick = () => {
    // 검색 아이콘 클릭 시 즉시 검색 실행
    onFilterChange({ searchKeyword: searchValue });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 입력값을 부모 컴포넌트로 전달
    onSearchChange(e.target.value);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      // Enter 키 입력 시 즉시 검색 실행
      const value = e.currentTarget.value;
      onSearchChange(value);
      onFilterChange({ searchKeyword: value });
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
      publicValue={publicValue}
      recruitValue={recruitValue}
      searchHandlers={{
        onIconClick: handleIconClick,
        onInputChange: handleInputChange,
        onInputKeyDown: handleInputKeyDown,
      }}
      searchPlaceholder="검색어로 조회해보세요."
      searchValue={searchValue}
      sortValue={sortValue}
    />
  );
};

export default AlbaFilterBar;
