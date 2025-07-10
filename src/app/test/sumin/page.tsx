'use client';

import Filter from '@/shared/components/common/filter';
import Sort from '@/shared/components/common/sort';

const filterOptions = [
  { value: 'latest', label: '전체' },
  { value: 'popular', label: '공개' },
  { value: 'oldest', label: '비공개' },
];
const sortOptions = [
  { value: 'latest', label: '최신순' },
  { value: 'high-wage', label: '시급높은순' },
  { value: 'many-applicants', label: '지원자 많은순' },
  { value: 'many-scraps', label: '스크랩 많은순' },
];
const Sumin = () => {
  const handleFilterChange = (filterId: string) => {
    console.log(filterId);
    // API 호출 또는 데이터 필터링 로직
  };

  const handleSortChange = (sortId: string) => {
    console.log(sortId);
    // API 호출 또는 데이터 정렬 로직
  };

  return (
    <div>
      <section>
        <p>Dropdown - filter</p>
        <Filter options={filterOptions} onFilterChange={handleFilterChange} />
      </section>
      <section>
        <p>Dropdown - sort</p>
        <Sort options={sortOptions} onSortChange={handleSortChange} />
      </section>
      <section>
        <p>Dropdown - input</p>
      </section>
    </div>
  );
};

export default Sumin;
