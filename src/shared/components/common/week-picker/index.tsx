'use client';

import DayCheckbox from '@/shared/components/ui/DayCheckbox';

interface WeekPickerProps {
  value?: string[];
  onChange?: (value: string[]) => void;
  isInValid?: boolean;
}

const WeekPicker = ({ value = [], onChange, isInValid }: WeekPickerProps) => {
  const selectedDays = value;

  const handleDayChange = (checked: boolean, value: string) => {
    const newSelectedDays = checked
      ? [...selectedDays, value]
      : selectedDays.filter(day => day !== value);
    const sortedDays = weekDays.filter(day => newSelectedDays.includes(day));
    onChange?.(sortedDays);
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
            isInvalid={isInValid}
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
