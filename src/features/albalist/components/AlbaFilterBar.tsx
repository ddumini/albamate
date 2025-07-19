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
  // 'Enter' 키를 눌렀을 때 검색을 실행하는 핸들러 추가
  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      alert('Enter 키로 검색!');
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
      searchHandlers={{
        onIconClick: handleIconClick,
        onInputChange: handleInputChange,
        onInputKeyDown: handleInputKeyDown,
      }}
      searchPlaceholder="어떤 알바를 찾고 계세요?"
    />
  );
};

export default AlbaFilterBar;
