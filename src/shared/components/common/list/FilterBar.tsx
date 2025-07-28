'use client';

import IconInput from '@common/input/IconInput';
import Select from '@common/select';
import { usePathname } from 'next/navigation';

import {
  MyAlbaSortOptions,
  PublicFilterOptions,
  RecruitFilterOptions,
  SortOptions,
} from '@/shared/constants/filterOptions';
import { FilterBarProps } from '@/shared/types/filter';

/**
 * @component FilterBar
 *
 * 알바 리스트, 마이 알바폼 등의 페이지에서 사용하는 필터 바 UI 컴포넌트입니다.
 * 검색창, 모집 상태 필터, 공개 여부 필터(사장일 경우), 정렬 옵션 등을 포함하며,
 * 사용자 입력 이벤트를 처리하기 위한 핸들러 객체를 props로 전달받습니다.
 * 현재 페이지 경로를 자동으로 감지하여 적절한 필터 옵션을 제공합니다.
 *
 * @param {FilterBarProps} props - 필터 바에 필요한 모든 속성을 포함하는 props 객체
 * @param {boolean} props.isOwner - 사용자가 사장(OWNER)인지 여부 (공개/비공개 필터 노출 여부 결정)
 * @param {string} [props.searchPlaceholder] - 검색 입력창에 표시될 플레이스홀더 텍스트
 * @param {SearchHandlers} [props.searchHandlers] - 검색창 관련 이벤트 핸들러들을 모은 객체
 * @param {() => void} [props.searchHandlers.onIconClick] - 검색 아이콘 클릭 시 실행되는 핸들러
 * @param {(e: React.ChangeEvent<HTMLInputElement>) => void} [props.searchHandlers.onInputChange] - 검색창 입력 변경 시 실행되는 핸들러
 * @param {(e: React.KeyboardEvent<HTMLInputElement>) => void} [props.searchHandlers.onInputKeyDown] - 키보드 입력 시 실행되는 핸들러 (예: Enter 검색)
 * @param {FilterHandlers} [props.filterHandlers] - 필터 관련 이벤트 핸들러들을 모은 객체
 * @param {(value: string) => void} [props.filterHandlers.handleRecruitChange] - 모집 상태 필터 변경 시 실행되는 핸들러
 * @param {(value: string) => void} [props.filterHandlers.handlePublicChange] - 공개 여부 필터 변경 시 실행되는 핸들러
 * @param {(value: string) => void} [props.filterHandlers.handleSortChange] - 정렬 옵션 변경 시 실행되는 핸들러
 *
 * @returns {JSX.Element} 필터 바 UI 요소를 포함한 JSX 컴포넌트
 *
 * @example
 * <FilterBar
 *   isOwner={true}
 *   searchPlaceholder="어떤 알바를 찾고 계세요?"
 *   searchHandlers={{
 *     onIconClick: handleIconClick,
 *     onInputChange: handleInputChange,
 *     onInputKeyDown: handleInputKeyDown,
 *   }}
 *   filterHandlers={{
 *     handleRecruitChange: handleRecruitChange,
 *     handlePublicChange: handlePublicChange,
 *     handleSortChange: handleSortChange,
 *   }}
 * />
 */
const FilterBar = ({
  isOwner,
  searchPlaceholder,
  searchHandlers,
  filterHandlers,
}: FilterBarProps) => {
  const pathname = usePathname();

  // 현재 페이지가 마이 알바리스트인지 확인
  const isMyAlbaList = pathname.includes('/myalbalist');

  // 모집 여부 필터 옵션 결정
  const recruitOptions =
    isMyAlbaList && !isOwner ? MyAlbaSortOptions : RecruitFilterOptions;

  return (
    <div className="w-full py-32 md:py-48 lg:py-60 dark:border-gray-500">
      <div className="mx-auto flex flex-col gap-20 md:gap-24 lg:gap-32">
        {/* 검색창 */}
        <IconInput
          alt="검색"
          className="w-full lg:w-728"
          iconClassName="pl-16"
          iconOnClick={searchHandlers?.onIconClick}
          inputClassName="rounded-2xl lg:rounded-3xl lg:pl-68"
          placeholder={searchPlaceholder}
          src="/icons/search.svg"
          onChange={searchHandlers?.onInputChange}
          onKeyDown={searchHandlers?.onInputKeyDown}
        />
        <div className="flex justify-between">
          <div className="flex gap-16">
            {/* 모집 여부 */}
            <Select
              options={recruitOptions}
              placeholder="전체"
              variant="filter"
              onSelect={filterHandlers.handleRecruitChange}
            />
            {/* 공개 여부 */}
            {isOwner && (
              <Select
                options={PublicFilterOptions}
                placeholder="전체"
                variant="filter"
                onSelect={filterHandlers.handlePublicChange}
              />
            )}
          </div>
          {/* 정렬 */}
          <Select
            options={SortOptions}
            variant="sort"
            wrapperClassName="mt-8"
            onSelect={filterHandlers.handleSortChange}
          />
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
