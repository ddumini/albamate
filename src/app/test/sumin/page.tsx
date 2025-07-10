'use client';

import Filter from '@/shared/components/common/filter';

const filterOptions = [
  { value: 'latest', label: '전체' },
  { value: 'popular', label: '공개' },
  { value: 'oldest', label: '비공개' },
];
const Sumin = () => {
  const handleFilterChange = (filterId: string) => {
    console.log(filterId);
    // API 호출 또는 데이터 필터링 로직
  };

  return (
    <div>
      <section>
        <p>Dropdown - filter</p>
        <Filter options={filterOptions} onFilterChange={handleFilterChange} />
      </section>
      <section>
        <p>Dropdown - sort</p>
      </section>
      <section>
        <p>Dropdown - input</p>
      </section>
    </div>
  );
};

export default Sumin;
