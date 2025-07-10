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
      className="w-80 lg:w-126"
      trigger={
        <button
          className={`text-black-100 lg:text-2lg flex h-30 w-full cursor-pointer items-center justify-between pr-10 pl-12 text-xs lg:h-42 ${className} `}
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
      <ul className="p-3">
        {options.map(option => (
          <li key={option.value}>
            <button
              className={`font-regular lg:text-2lg flex h-34 w-full cursor-pointer items-center gap-2 px-10 text-left text-xs lg:h-52 lg:px-16 ${
                selectedSort === option.value ? 'bg-mint-50/50' : ''
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
