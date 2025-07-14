'use client';

import 'react-day-picker/dist/style.css'; // react day picker 기본 스타일
import '@/app/day-picker-override.css'; // react day picker 커스텀 오버라이드 스타일

import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { DateRange, DayPicker } from 'react-day-picker';
import { twMerge } from 'tailwind-merge';

/**
 * DatePicker 컴포넌트
 *
 * 날짜 범위를 선택할 수 있는 컴포넌트
 * 키보드 접근성 지원: Tab, Enter, Space, 화살표 키로 조작 가능
 *
 * @author sumin
 * @date 2025-07-12
 *
 * @param {DatePickerProps} props
 * @param {DateRange | undefined} props.onDateRangeChange - 날짜 범위 변경 핸들러
 * @param {string} [props.placeholder] - 표시 텍스트 플레이스홀더
 * @param {boolean} [props.disabled] - 비활성화 상태
 *
 * @example
 *
 * <DatePicker /> // 기본 사용 예시
 *
 * <DatePicker
 *   onDateRangeChange={handleDateRangeChange}
 *   placeholder="시작일 - 종료일"
 *   disabled={false}
 * /> // 커스텀 사용 예시
 */

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
  const buttonRef = useRef<HTMLButtonElement>(null);

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

  // 키보드 이벤트 처리
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (disabled) return;

    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        setIsOpen(!isOpen);
        break;

      case 'Escape':
        setIsOpen(false);
        buttonRef.current?.focus();
        break;

      case 'Tab':
        // Tab 키로 포커스가 이동할 때 드롭다운이 열려있으면 닫기
        if (isOpen) {
          setTimeout(() => {
            if (!containerRef.current?.contains(document.activeElement)) {
              setIsOpen(false);
            }
          }, 0);
        }
        break;
    }
  };

  // 날짜 변경 처리
  const handleSelect = (range: DateRange | undefined) => {
    setDateRange(range);
    onDateRangeChange?.(range);
    if (range?.from && range?.to) {
      setIsOpen(false);
      buttonRef.current?.focus();
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
        ref={buttonRef}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label={`날짜 범위 선택: ${getDisplayText()}`}
        className={twMerge(
          'flex h-54 w-full items-center gap-8 rounded-lg border border-transparent bg-background-200 px-14 text-lg text-gray-400 lg:h-64 lg:text-xl',
          isOpen && 'border-gray-200',
          dateRange?.from && dateRange?.to && 'text-black-400',
          disabled && 'cursor-not-allowed'
        )}
        disabled={disabled}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
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
        <div
          aria-label="날짜 범위 선택"
          aria-modal="true"
          className="absolute top-full left-0 z-10 mt-8 rounded-lg border border-gray-200 bg-white p-16 shadow-md dark:bg-black-400"
          role="dialog"
        >
          <DayPicker
            fixedWeeks
            showOutsideDays
            captionLayout="dropdown"
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
