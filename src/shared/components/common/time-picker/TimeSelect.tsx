'use client';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';

import Dropdown from '@/shared/components/ui/Dropdown';

/**
 * @module TimeSelect
 * @description 시간 선택을 위한 공통 TimeSelect 컴포넌트.
 * @author sumin
 * @date 2025-07-12
 *
 * @example
 * <TimeSelect label="근무 시작" value="09:00" onChange={() => {}} />
 *
 * @component
 * @returns {JSX.Element} 시간 선택 UI를 반환합니다.
 */

const generateTimes = () => {
  const times = [];
  for (let h = 0; h < 24; h++) {
    for (let m = 0; m < 60; m += 30) {
      times.push(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`);
    }
  }
  return times;
};

const timeOptions = generateTimes();

interface TimeSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  isSelected?: boolean; // 선택 여부 추가
  placeholder?: string; // 플레이스홀더 추가
}

const TimeSelect = ({
  label,
  value,
  onChange,
  isSelected = false, // 기본값 false
  placeholder = '00:00', // 기본값 '00:00'
}: TimeSelectProps) => {
  return (
    <Dropdown
      isRight
      trigger={isOpen => (
        <button
          aria-label={label}
          className={twMerge(
            'flex h-54 w-150 items-center gap-8 rounded-lg border-1 border-transparent bg-background-200 px-14 text-lg transition-colors lg:h-64 lg:w-210 lg:gap-16 lg:text-xl',
            isOpen ? 'border-gray-200' : '',
            isSelected ? 'text-black' : 'text-gray-400' // 선택되지 않았으면 회색으로 표시
          )}
          type="button" // ESLint 에러 해결
        >
          <Image
            alt="clock"
            className={isSelected ? 'opacity-100' : 'opacity-50'} // 선택 여부에 따라 아이콘 투명도 조절
            height={24}
            src="/icons/clock.svg"
            width={24}
          />
          <div className="flex w-full items-center justify-between gap-2">
            <span className={isSelected ? 'font-medium' : 'font-normal'}>
              {isSelected ? value : placeholder}{' '}
              {/* 선택 여부에 따라 표시 값 결정 */}
            </span>
            <Image
              alt="arrow-down"
              className="lg:h-36 lg:w-36"
              height={24}
              src="/icons/drop-menu-down.svg"
              width={24}
            />
          </div>
        </button>
      )}
    >
      <ul className="max-h-102 w-80 overflow-y-auto lg:max-h-156 lg:w-126">
        {timeOptions.map(t => (
          <li
            key={t}
            className="flex h-34 w-full cursor-pointer items-center px-10 text-xs text-black-100 hover:bg-gray-100 lg:h-52 lg:text-2lg"
            tabIndex={0}
            onClick={() => onChange(t)}
            onKeyDown={event => {
              if (event.key === 'Enter') {
                onChange(t);
              }
            }}
          >
            {t}
          </li>
        ))}
      </ul>
    </Dropdown>
  );
};

export default TimeSelect;
