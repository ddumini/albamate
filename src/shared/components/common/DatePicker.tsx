'use client';

import 'react-day-picker/dist/style.css';

import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useEffect, useRef, useState } from 'react';
import { DateRange, DayPicker } from 'react-day-picker';

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
    <div
      ref={containerRef}
      style={{ position: 'relative', display: 'inline-block' }}
    >
      <button
        disabled={disabled}
        style={{
          padding: '8px 12px',
          borderRadius: '6px',
          border: '1px solid #ccc',
          background: disabled ? '#f9f9f9' : 'white',
          cursor: disabled ? 'not-allowed' : 'pointer',
        }}
        onClick={() => setIsOpen(!isOpen)}
      >
        {getDisplayText()}
      </button>

      {isOpen && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 4px)',
            left: 0,
            zIndex: 10,
            background: 'white',
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '16px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          }}
        >
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
