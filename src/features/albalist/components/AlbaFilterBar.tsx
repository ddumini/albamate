'use client';

import IconInput from '@/shared/components/common/input/IconInput';
import Select from '@/shared/components/common/select';

interface Props {
  isOwner: boolean;
}

const AlbaFilterBar = ({ isOwner }: Props) => {
  const RecruitFilterOptions = [
    { value: 'total', label: '전체' },
    { value: 'recruiting', label: '모집 중' },
    { value: 'oldest', label: '모집 마감' },
  ];
  const PublicFilterOptions = [
    { value: 'total', label: '전체' },
    { value: 'public', label: '공개' },
    { value: 'private', label: '비공개' },
  ];
  const sortOptions = [
    { value: 'latest', label: '최신순' },
    { value: 'high-wage', label: '시급높은순' },
    { value: 'many-applicants', label: '지원자 많은순' },
    { value: 'many-scraps', label: '스크랩 많은순' },
  ];

  const handleFilterChange = (value: string) => console.log('필터:', value);
  const handleSortChange = (value: string) => console.log('정렬:', value);

  return (
    <div className="w-full px-24 py-12 md:px-72 md:py-24 dark:border-gray-500">
      <div className="mx-auto flex max-w-1479 flex-col gap-16 px-4 py-20 lg:gap-20">
        <IconInput
          alt="검색"
          className="w-327 lg:w-728"
          iconClassName="pl-16"
          iconOnClick={() => alert('검색')}
          inputClassName="rounded-2xl lg:rounded-3xl lg:pl-68"
          placeholder="어떤 알바를 찾고 계세요?"
          src="/icons/search.svg"
        />
        <div className="flex justify-between">
          <div className="flex gap-16">
            <Select
              options={RecruitFilterOptions}
              placeholder="전체"
              variant="filter"
              onSelect={handleFilterChange}
            />
            {isOwner && (
              <Select
                options={PublicFilterOptions}
                placeholder="전체"
                variant="filter"
                onSelect={handleFilterChange}
              />
            )}
          </div>
          <Select
            options={sortOptions}
            variant="sort"
            wrapperClassName="mt-8"
            onSelect={handleSortChange}
          />
        </div>
      </div>
    </div>
  );
};

export default AlbaFilterBar;
