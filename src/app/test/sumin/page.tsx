'use client';

import DatePicker from '@/shared/components/common/DatePicker';
import InputDropdown from '@/shared/components/common/input-dropdown';
import Select from '@/shared/components/common/select';

const Sumin = () => {
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
  const inputOptions = [{ value: '전체' }, { value: '없음' }];

  const handleFilterChange = (filterId: string) => {
    console.log(filterId);
    // API 호출 또는 데이터 필터링 로직
  };

  const handleSortChange = (sortId: string) => {
    console.log(sortId);
    // API 호출 또는 데이터 정렬 로직
  };

  return (
    <div className="mx-auto max-w-640 px-24 pt-120">
      <section className="mb-80">
        <p className="mb-24 text-2xl font-bold">Dropdown - filter</p>
        <Select
          options={filterOptions}
          placeholder="전체"
          variant="filter"
          onSelect={handleFilterChange}
        />
      </section>
      <section className="mb-80">
        <p className="mb-24 text-2xl font-bold">Dropdown - sort</p>
        <Select
          options={sortOptions}
          variant="sort"
          onSelect={handleSortChange}
        />
      </section>
      <section className="max-w-327 lg:max-w-none">
        <p className="mb-24 text-2xl font-bold">Dropdown - input</p>
        <InputDropdown options={inputOptions} />
      </section>

      <section className="mb-80">
        <p className="mb-24 text-2xl font-bold">DatePicker</p>
        <DatePicker />
      </section>
    </div>
  );
};

export default Sumin;
