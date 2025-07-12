'use client';

import 'react-day-picker/dist/style.css'; // react day picker 기본 스타일
import '@/app/day-picker-override.css'; // react day picker 커스텀 오버라이드 스타일

import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { DateRange, DayPicker } from 'react-day-picker';
import { twMerge } from 'tailwind-merge';

interface DatePickerProps {
  onDateRangeChange?: (range: DateRange | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
}

const DatePicker = ({
  onDateRangeChange,
  placeholder = '시작일 - 종료일',
  disabled = false,
}: DatePickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const containerRef = useRef<HTMLDivElement>(null);

  // 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 날짜 변경 처리
  const handleSelect = (range: DateRange | undefined) => {
    setDateRange(range);
    onDateRangeChange?.(range);
    if (range?.from && range?.to) {
      setIsOpen(false);
    }
  };

  // 표시 텍스트
  const getDisplayText = () => {
    if (!dateRange?.from) return placeholder;
    const fromText = format(dateRange.from, 'yyyy.MM.dd', { locale: ko });
    if (!dateRange.to) return `${fromText} - 종료일`;
    const toText = format(dateRange.to, 'yyyy.MM.dd', { locale: ko });
    return `${fromText} - ${toText}`;
  };

  return (
    <div ref={containerRef} className="relative">
      <button
        className={twMerge(
          'flex h-54 w-full items-center gap-8 rounded-lg bg-background-200 px-14 text-lg text-gray-400 lg:h-64 lg:text-xl',
          isOpen && 'border border-gray-200',
          dateRange?.from && dateRange?.to && 'text-black-400',
          disabled && 'cursor-not-allowed'
        )}
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
      >
        <Image
          alt="calendar"
          height={36}
          src={
            dateRange?.from && dateRange?.to
              ? '/icons/calendar-gray.svg'
              : '/icons/calendar-fill.svg'
          }
          width={36}
        />
        {getDisplayText()}
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 z-10 mt-8 rounded-lg border border-gray-200 bg-white p-16 shadow-md">
          <DayPicker
            locale={ko}
            mode="range"
            numberOfMonths={1}
            selected={dateRange}
            onSelect={handleSelect}
          />
        </div>
      )}
    </div>
  );
};

export default DatePicker;
