'use client';

import Select from '@/shared/components/common/select';
import Tab from '@/shared/components/common/tab/Tab';

const MyPageFilters = () => {
  const sortOption = [
    { value: 'latest', label: '최신순' },
    { value: 'comments', label: '댓글많은순' },
    { value: 'like', label: '좋아요순' },
  ];
  return (
    <section className="flex items-center justify-between">
      <Tab />
      <Select
        options={sortOption}
        placeholder="최신순"
        variant="sort"
        onSelect={value => {
          console.log('.정렬:', value);
        }}
      />
    </section>
  );
};

export default MyPageFilters;
