'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import Chip from '@/shared/components/common/chip/Chip';
import Select from '@/shared/components/common/select';

const AlbaListPage = () => {
  const router = useRouter();

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

  const handleFilterChange = (filterId: string) => {
    console.log(filterId);
  };

  const handleSortChange = (sortId: string) => {
    console.log(sortId);
  };

  const handleCardClick = (formId: string) => {
    router.push(`/alba/${formId}`);
  };

  return (
    <div>
      {/* 필터/정렬 영역 */}
      <div className="flex justify-between px-48 py-16">
        <div className="flex gap-16">
          <Select
            options={RecruitFilterOptions}
            placeholder="전체"
            variant="filter"
            onSelect={handleFilterChange}
          />
          <Select
            options={PublicFilterOptions}
            placeholder="전체"
            variant="filter"
            onSelect={handleFilterChange}
          />
        </div>

        <Select
          className="mt-8"
          options={sortOptions}
          variant="sort"
          onSelect={handleSortChange}
        />
      </div>

      {/* 알바 카드 리스트 예시 */}
      <div
        className="mx-48 flex w-327 cursor-pointer flex-col gap-8 rounded-xl border border-gray-200 p-16 transition-shadow hover:shadow-md lg:w-477"
        onClick={() => handleCardClick('123')}
      >
        {/* 이미지 */}
        <div className="relative flex h-180 w-full justify-end overflow-hidden rounded-lg">
          <Image
            fill
            alt="알바 이미지"
            className="object-cover"
            src="/images/logo.svg"
          />
        </div>

        {/* 칩, 기간, 드롭다운 */}
        <div className="mt-12 flex items-center gap-8 text-sm text-gray-600">
          <Chip active label="공개" variant="filled" />
          <Chip active label="모집 중" variant="filled" />
          <span className="Text-black">2025.06.22 ~ 2025.07.31</span>
          <Image
            alt="드롭다운 아이콘"
            height={16}
            src="/icons/kebab-menu.svg"
            width={16}
          />
        </div>

        {/* 제목 */}
        <h3 className="Text-black mt-12 text-lg font-semibold">
          코드잇 스터디카페 관리 (주말 오전) 모집합니다. 서울 종로구 용산구
          서대문
        </h3>

        {/* 탭처럼 생긴 버튼들 */}
        <div className="mt-12 flex w-full justify-between rounded-lg bg-gray-25 py-6 text-xs text-gray-600 dark:bg-gray-100">
          {['지원자 10명', '스크랩 5명', '마감 D-5'].map((tag, index) => (
            <span
              key={index}
              className="border-r border-gray-200 px-22 last:border-0 hover:text-gray-900 lg:px-48"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AlbaListPage;
