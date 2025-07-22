'use client';

import Select from '@common/select';

interface ScrapFilterControlsProps {
  tabValue: string;
  publicOption: { value: string; label: string }[];
  recruitOption: { value: string; label: string }[];
  sortOption: { value: string; label: string }[];
  setPublicValue: (value: string) => void;
  setRecruitValue: (value: string) => void;
  setSortValue: (value: string) => void;
}

const ScrapFilterControls = ({
  tabValue,
  publicOption,
  recruitOption,
  sortOption,
  setPublicValue,
  setRecruitValue,
  setSortValue,
}: ScrapFilterControlsProps) => {
  return (
    <>
      {tabValue === 'scrap' && (
        <div className="flex items-center gap-10 lg:gap-16">
          <Select
            options={publicOption}
            placeholder="전체"
            variant="filter"
            onSelect={setPublicValue}
          />
          <Select
            options={recruitOption}
            placeholder="전체"
            variant="filter"
            onSelect={setRecruitValue}
          />
        </div>
      )}
      <Select
        options={sortOption}
        placeholder="최신순"
        variant="sort"
        onSelect={setSortValue}
      />
    </>
  );
};

export default ScrapFilterControls;
