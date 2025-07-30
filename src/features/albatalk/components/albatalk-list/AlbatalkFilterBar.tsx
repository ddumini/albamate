'use client';

import IconInput from '@common/input/IconInput';
import { useState, useTransition } from 'react';

import Select from '@/shared/components/common/select';

import { ALBATALK_SORT_OPTIONS } from '../../constants/albatalk.constants';
import type { GetAlbatalksParams } from '../../schemas/albatalk.schema';

interface AlbatalkFilterBarProps {
  currentOrderBy?: 'mostRecent' | 'mostCommented' | 'mostLiked';
  currentKeyword?: string;
  onParamsChange: (params: Partial<GetAlbatalksParams>) => void;
  isLoading?: boolean;
}

const AlbatalkFilterBar: React.FC<AlbatalkFilterBarProps> = ({
  currentOrderBy = 'mostRecent',
  currentKeyword = '',
  onParamsChange,
  isLoading = false,
}: AlbatalkFilterBarProps) => {
  const [searchQuery, setSearchQuery] = useState<string>(currentKeyword);
  const [isPending, startTransition] = useTransition();

  const handleSearchSubmit = () => {
    startTransition(() => {
      onParamsChange({
        keyword: searchQuery.trim() || undefined,
      });
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearchSubmit();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSortChange = (value: string) => {
    startTransition(() => {
      onParamsChange({
        orderBy: value as 'mostRecent' | 'mostCommented' | 'mostLiked',
      });
    });
  };

  const isDisabled = isPending || isLoading;

  return (
    <div className="flex flex-col gap-20 py-32 md:gap-24 md:py-48 lg:flex-row lg:justify-between lg:py-60">
      <IconInput
        alt="검색"
        className="lg:w-728"
        disabled={isDisabled}
        iconClassName="pl-16"
        iconOnClick={handleSearchSubmit}
        inputClassName="rounded-2xl lg:rounded-3xl lg:pl-68"
        placeholder="궁금한 점을 검색해보세요"
        src="/icons/search.svg"
        value={searchQuery}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <div className="justify-items-end lg:self-center">
        <Select
          options={ALBATALK_SORT_OPTIONS}
          value={currentOrderBy}
          variant="sort"
          wrapperClassName="mt-8"
          onSelect={handleSortChange}
        />
      </div>
    </div>
  );
};

export default AlbatalkFilterBar;
