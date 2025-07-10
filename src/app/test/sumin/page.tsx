'use client';

import Filter from '@/shared/components/common/filter';

const filterOptions = [
  { id: 'latest', label: '최신순' },
  { id: 'popular', label: '인기순' },
  { id: 'oldest', label: '오래된순' },
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
        <Filter
          defaultFilter="latest"
          options={filterOptions}
          onFilterChange={handleFilterChange}
        />
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
