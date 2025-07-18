'use client';

import IconInput from '@common/input/IconInput';
import Select from '@common/select';

import {
  PublicFilterOptions,
  RecruitFilterOptions,
  SortOptions,
} from '@/shared/constants/filterOptions';

interface FilterBarProps {
  isOwner: boolean;
  searchPlaceholder?: string;
  onInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onIconClick?: () => void;
  onRecruitFilterChange: (value: string) => void;
  onPublicFilterChange: (value: string) => void;
  onSortChange: (value: string) => void;
}

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
            <Select
              options={RecruitFilterOptions}
              placeholder="전체"
              variant="filter"
              onSelect={onRecruitFilterChange}
            />
            {isOwner && (
              <Select
                options={PublicFilterOptions}
                placeholder="전체"
                variant="filter"
                onSelect={onPublicFilterChange}
              />
            )}
          </div>
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
