'use client';

import { useState } from 'react';

import DayCheckbox from '@/shared/components/ui/DayCheckbox';

interface WeekPickerProps {
  defaultValue?: string[];
  onChange?: (value: string[]) => void;
}

const WeekPicker = ({ defaultValue = [], onChange }: WeekPickerProps) => {
  const [selectedDays, setSelectedDays] = useState<string[]>(defaultValue);

  const handleDayChange = (checked: boolean, value: string) => {
    const newSelectedDays = checked
      ? [...selectedDays, value]
      : selectedDays.filter(day => day !== value);
    setSelectedDays(newSelectedDays);
    onChange?.(newSelectedDays);
  };

  const weekDays = ['월', '화', '수', '목', '금', '토', '일'];

  return (
    <fieldset>
      <legend className="sr-only">요일 선택</legend>
      <ul
        aria-labelledby="weekday-legend"
        className="flex gap-11 lg:gap-18"
        role="group"
      >
        {weekDays.map((day, _index) => (
          <DayCheckbox
            key={day}
            aria-label={`${day}요일 선택`}
            checked={selectedDays.includes(day)}
            day={day}
            name="weekdays"
            value={day}
            onChange={handleDayChange}
          />
        ))}
      </ul>
    </fieldset>
  );
};

export default WeekPicker;
