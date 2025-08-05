'use client';

import Select from '@common/select';

interface ScrapFilterControlsProps {
  tabValue: string;
  publicOption: { value: string; label: string }[];
  recruitOption: { value: string; label: string }[];
  sortOption: { value: string; label: string }[];
  onSelectPublic: (value: string) => void;
  onSelectRecruit: (value: string) => void;
  onSelectSort: (value: string) => void;
}

const ScrapFilterControls = ({
  tabValue,
  publicOption,
  recruitOption,
  sortOption,
  onSelectPublic,
  onSelectRecruit,
  onSelectSort,
}: ScrapFilterControlsProps) => {
  return (
    <>
      {tabValue === 'scrap' && (
        <div className="flex items-center gap-10 lg:gap-16">
          <Select
            options={publicOption}
            placeholder="전체"
            variant="filter"
            onSelect={onSelectPublic}
          />
          <Select
            options={recruitOption}
            placeholder="전체"
            variant="filter"
            onSelect={onSelectRecruit}
          />
        </div>
      )}
      <Select
        options={sortOption}
        placeholder="최신순"
        variant="sort"
        onSelect={onSelectSort}
      />
    </>
  );
};

export default ScrapFilterControls;
