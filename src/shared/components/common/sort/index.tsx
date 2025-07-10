import Image from 'next/image';
import { useState } from 'react';

import Dropdown from '@/shared/components/ui/Dropdown';

/**
 * Sort 컴포넌트
 * 필터 컴포넌트는 드롭다운 메뉴를 표시하고 사용자가 선택한 필터를 처리합니다.
 * 필터 선택 시 동작할 함수를 외부에서 전달받아 처리합니다.
 *
 * @author sumin
 * @date 2025-07-10
 *
 * @param {SortProps} props
 * @param {SortOption[]} props.options - 정렬 옵션 배열
 * @param {string} [props.defaultSort] - 기본 선택된 정렬
 * @param {string} [props.className] - 추가 커스텀 클래스
 *
 */
interface SortOption {
  value: string;
  label: string;
}

interface SortProps {
  options: SortOption[];
  onSortChange: (selectedSort: string) => void;
  defaultSort?: string;
  className?: string;
}

const Sort = ({
  options,
  onSortChange,
  defaultSort,
  className = '',
}: SortProps) => {
  const [selectedSort, setSelectedSort] = useState(defaultSort || '');

  const handleSortSelect = (sortId: string) => {
    setSelectedSort(sortId);
    onSortChange(sortId);
  };

  const selectedOption = options.find(option => option.value === selectedSort);

  return (
    <Dropdown
      className="w-80 lg:w-132"
      trigger={
        <button
          className={`text-black-300 flex w-full cursor-pointer items-center justify-end gap-2 text-xs font-semibold whitespace-nowrap lg:text-lg ${className} `}
        >
          <span>{selectedOption?.label || '최신순'}</span>
          <Image
            alt="arrow-down"
            className="lg:h-24 lg:w-24"
            height={16}
            loading="lazy"
            src="/icons/chevron-down-thin.svg"
            width={16}
          />
        </button>
      }
    >
      {/* 드롭다운 내용 */}
      <ul>
        {options.map(option => (
          <li key={option.value} className="p-3 lg:p-6">
            <button
              className={`h-28 w-full cursor-pointer items-center gap-2 rounded-lg text-center text-xs font-semibold lg:h-38 lg:text-lg ${
                selectedSort === option.value
                  ? 'bg-mint-50/50 text-black-300'
                  : 'text-gray-400'
              }`}
              onClick={() => handleSortSelect(option.value)} // 외부에서 sort 선택 시 호출
            >
              {option.label}
            </button>
          </li>
        ))}
      </ul>
    </Dropdown>
  );
};

export default Sort;
