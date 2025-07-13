'use client';

import { useState } from 'react';

import DayCheckbox from '@/shared/components/ui/DayCheckbox';

const WeekPicker = () => {
  const [selectedDays, setSelectedDays] = useState<string[]>([]);

  const handleDayChange = (checked: boolean, value: string) => {
    setSelectedDays(prev =>
      checked ? [...prev, value] : prev.filter(day => day !== value)
    );
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
        {weekDays.map((day, index) => (
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
