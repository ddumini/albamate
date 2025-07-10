import Image from 'next/image';
import { useState } from 'react';

import Dropdown from '@/shared/components/ui/Dropdown';

/**
 * Filter 컴포넌트
 * 필터 컴포넌트는 드롭다운 메뉴를 표시하고 사용자가 선택한 필터를 처리합니다.
 * 필터 선택 시 동작할 함수를 외부에서 전달받아 처리합니다.
 *
 * @author sumin
 * @date 2025-07-10
 *
 * @param {FilterProps} props
 * @param {FilterOption[]} props.options - 필터 옵션 배열
 * @param {string} [props.defaultFilter] - 기본 선택된 필터
 * @param {string} [props.className] - 추가 커스텀 클래스
 *
 */
interface FilterOption {
  value: string;
  label: string;
}

interface FilterProps {
  options: FilterOption[];
  onFilterChange: (selectedFilter: string) => void;
  defaultFilter?: string;
  className?: string;
}

const Filter = ({
  options,
  onFilterChange,
  defaultFilter,
  className = '',
}: FilterProps) => {
  const [selectedFilter, setSelectedFilter] = useState(defaultFilter || '');

  const handleFilterSelect = (filterId: string) => {
    setSelectedFilter(filterId);
    onFilterChange(filterId);
  };

  const selectedOption = options.find(
    option => option.value === selectedFilter
  );

  return (
    <Dropdown
      className="w-80"
      trigger={
        <button
          className={`text-black-100 flex h-30 w-full cursor-pointer items-center justify-between rounded-sm border border-gray-100 px-12 pr-10 text-xs ${className} ${
            selectedFilter
              ? 'text-mint-300 bg-mint-50/50 border-mint-300'
              : 'text-black-100'
          }`}
        >
          <span>{selectedOption?.label || '전체'}</span>
          <Image
            alt="arrow-down"
            height={16}
            loading="lazy"
            src={
              selectedFilter
                ? '/icons/chevron-down-mint.svg'
                : '/icons/chevron-down.svg'
            }
            width={16}
          />
        </button>
      }
    >
      {/* 드롭다운 내용 */}
      <ul className="">
        {options.map(option => (
          <li key={option.value}>
            <button
              className={`font-regular flex h-34 w-full cursor-pointer items-center gap-2 px-10 text-left text-xs ${
                selectedFilter === option.value
                  ? 'bg-mint-50/50 text-mint-300'
                  : 'text-black-100'
              }`}
              onClick={() => handleFilterSelect(option.value)} // 외부에서 필터 선택 시 호출
            >
              {option.label}
            </button>
          </li>
        ))}
      </ul>
    </Dropdown>
  );
};

export default Filter;
