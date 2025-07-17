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
    <section className="flex flex-col justify-between xl:mb-24 xl:flex-row xl:items-center">
      <span className="h-60">
        <Tab tabs={['내가 쓴 글', '내가 쓴 댓글', '스크랩']} />
      </span>
      <span className="h-34 self-end">
        <Select
          options={sortOption}
          placeholder="최신순"
          variant="sort"
          onSelect={value => {
            console.log('.정렬:', value);
          }}
        />
      </span>
    </section>
  );
};

export default MyPageFilters;
