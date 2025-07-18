'use client';

import IconInput from '@common/input/IconInput';
import Select from '@common/select';

import {
  PublicFilterOptions,
  RecruitFilterOptions,
  SortOptions,
} from '@/shared/constants/filterOptions';
import { FilterBarProps } from '@/shared/types/filter';

/**
 * 필터 바 컴포넌트
 * - 알바 리스트 페이지, 내 알바폼 등에서 검색, 필터, 정렬 기능을 담당하는 UI를 렌더링합니다.
 * - 모집 상태 필터, 공개 여부 필터, 정렬 옵션을 포함하며, 검색 입력창과 아이콘 클릭 이벤트를 지원합니다.
 *
 * @param {FilterBarProps} props
 * @param {boolean} props.isOwner - 사장(OWNER) 여부에 따라 공개/비공개 필터를 노출 여부 결정
 * @param {string} [props.searchPlaceholder] - 검색 입력창에 표시될 플레이스홀더 텍스트
 * @param {(e: React.ChangeEvent<HTMLInputElement>) => void} [props.onInputChange] - 검색창 입력값 변경 시 호출되는 콜백
 * @param {() => void} [props.onIconClick] - 검색 아이콘 클릭 시 호출되는 콜백
 * @param {(value: string) => void} props.onRecruitFilterChange - 모집 상태 필터 변경 시 호출되는 콜백
 * @param {(value: string) => void} props.onPublicFilterChange - 공개 여부 필터 변경 시 호출되는 콜백
 * @param {(value: string) => void} props.onSortChange - 정렬 옵션 변경 시 호출되는 콜백
 *
 * @returns {JSX.Element} 필터 바 UI를 렌더링하는 React 컴포넌트
 * 
 * 사용 예시
 * <FilterBar
    isOwner={isOwner}
    searchPlaceholder="어떤 알바를 찾고 계세요?"
    onIconClick={alert('검색 아이콘 클릭');}
    onInputChange={console.log('검색어 입력:', e.target.value);}
    onPublicFilterChange={console.log('공개/비공개 필터 변경:', value);}
    onRecruitFilterChange={console.log('모집 여부 필터 변경:', value);}
    onSortChange={console.log('정렬 변경:', value);}
    />
 */
const FilterBar = ({
  isOwner,
  searchPlaceholder,
  onInputChange,
  onIconClick,
  onRecruitFilterChange,
  onPublicFilterChange,
  onSortChange,
}: FilterBarProps) => {
  return (
    <div className="w-full py-32 md:px-72 md:py-48 lg:py-60 dark:border-gray-500">
      <div className="mx-auto flex max-w-1479 flex-col gap-20 px-4 md:gap-24 lg:gap-32">
        {/* 검색창 */}
        <IconInput
          alt="검색"
          className="w-327 lg:w-728"
          iconClassName="pl-16"
          iconOnClick={onIconClick}
          inputClassName="rounded-2xl lg:rounded-3xl lg:pl-68"
          placeholder={searchPlaceholder}
          src="/icons/search.svg"
          onChange={onInputChange}
        />
        <div className="flex justify-between">
          <div className="flex gap-16">
            {/* 모집 여부 */}
            <Select
              options={RecruitFilterOptions}
              placeholder="전체"
              variant="filter"
              onSelect={onRecruitFilterChange}
            />
            {/* 공개 여부 */}
            {isOwner && (
              <Select
                options={PublicFilterOptions}
                placeholder="전체"
                variant="filter"
                onSelect={onPublicFilterChange}
              />
            )}
          </div>
          {/* 정렬 */}
          <Select
            options={SortOptions}
            variant="sort"
            wrapperClassName="mt-8"
            onSelect={onSortChange}
          />
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
