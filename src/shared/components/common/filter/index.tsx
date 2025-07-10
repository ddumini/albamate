'use client';
import { useState } from 'react';

import Dropdown from '@/shared/components/ui/Dropdown';

interface FilterOption {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

interface FilterProps {
  options: FilterOption[];
  onFilterChange: (selectedFilter: string) => void;
  defaultFilter?: string;
  className?: string;
  placeholder?: string; // trigger 대신 placeholder 사용
}

const Filter = ({
  options,
  onFilterChange,
  defaultFilter,
  className = '',
  placeholder = '선택하세요',
}: FilterProps) => {
  const [selectedFilter, setSelectedFilter] = useState(
    defaultFilter || options[0]?.id
  );

  const handleFilterSelect = (filterId: string) => {
    setSelectedFilter(filterId);
    onFilterChange(filterId);
  };

  const selectedOption = options.find(option => option.id === selectedFilter);

  return (
    <Dropdown
      trigger={
        <button
          className={`flex cursor-pointer items-center gap-2 ${className}`}
        >
          <span>{selectedOption?.label || placeholder}</span>
          {/* 화살표 아이콘 */}
        </button>
      }
    >
      {/* 드롭다운 내용 */}
      <ul className="py-1">
        {options.map(option => (
          <li key={option.id}>
            <button
              className={`flex w-full items-center gap-2 px-4 py-2 text-left hover:bg-gray-100 ${
                selectedFilter === option.id
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-700'
              }`}
              onClick={() => handleFilterSelect(option.id)}
            >
              {option.icon && <span className="h-4 w-4">{option.icon}</span>}
              {option.label}
              {selectedFilter === option.id && (
                <svg
                  className="ml-auto h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    clipRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    fillRule="evenodd"
                  />
                </svg>
              )}
            </button>
          </li>
        ))}
      </ul>
    </Dropdown>
  );
};

export default Filter;
