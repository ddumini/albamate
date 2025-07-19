'use client';

import IconInput from '@common/input/IconInput';
import { useState } from 'react';

import Select from '@/shared/components/common/select';

const PostFilterBar = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const sortOptions = [
    { value: 'mostRecent', label: '최신순' },
    { value: 'mostCommented', label: '댓글많은순' },
    { value: 'mostLiked', label: '좋아요순' },
  ];

  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      alert(searchQuery.trim());
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearchSubmit();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSortChange = (value: string) => alert(value);

  return (
    <div className="flex flex-col px-4 py-16 lg:flex-row lg:justify-between">
      <IconInput
        alt="검색"
        className="my-16 lg:my-24 lg:w-728"
        iconClassName="pl-24"
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
          options={sortOptions}
          variant="sort"
          wrapperClassName="mt-8"
          onSelect={handleSortChange}
        />
      </div>
    </div>
  );
};

export default PostFilterBar;
