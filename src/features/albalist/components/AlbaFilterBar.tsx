'use client';

import FilterBar from '@common/list/FilterBar';

interface Props {
  isOwner: boolean;
}

const AlbaFilterBar = ({ isOwner }: Props) => {
  // 추후 API 연동 시 검색, 필터, 정렬 기능 구현
  const handleFilterChange = (value: string) => {
    console.log('모집 여부 필터 변경:', value);
  };
  const handlePublicFilterChange = (value: string) => {
    console.log('공개/비공개 필터 변경:', value);
  };
  const handleSortChange = (value: string) => {
    console.log('정렬 변경:', value);
  };
  const handleIconClick = () => {
    alert('검색 아이콘 클릭');
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('검색어 입력:', e.target.value);
  };

  return (
    <FilterBar
      isOwner={isOwner}
      searchPlaceholder="어떤 알바를 찾고 계세요?"
      onIconClick={handleIconClick}
      onInputChange={handleInputChange}
      onPublicFilterChange={handlePublicFilterChange}
      onRecruitFilterChange={handleFilterChange}
      onSortChange={handleSortChange}
    />
  );
};

export default AlbaFilterBar;
