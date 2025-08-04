'use client';

import { cn } from '@/shared/lib/cn';

import TimeSelect from './TimeSelect';
/**
 * @module TimePicker
 * @description 근무 시간 선택을 위한 공통 TimePicker 컴포넌트.
 * @author sumin
 * @date 2025-07-12
 *
 * @example
 * <TimePicker />
 *
 * @component
 * @returns {JSX.Element} 시간 선택 UI를 반환합니다.
 *
 * @remarks
 * - 시작/종료 시간을 각각 선택할 수 있습니다.
 * - 선택하지 않으면 '00:00'이 기본값으로 표시됩니다.
 * - 내부적으로 TimeSelect 컴포넌트를 사용합니다.
 */

interface TimePickerProps {
  className?: string;
  value?: { workStartTime: string; workEndTime: string };
  onChange?: (range: {
    workStartTime: string | null;
    workEndTime: string | null;
  }) => void;
  isStartInvalid?: boolean;
  isEndInvalid?: boolean;
}

const TimePicker = ({
  className,
  value,
  onChange,
  isStartInvalid,
  isEndInvalid,
}: TimePickerProps) => {
  const startTime = value?.workStartTime || null;
  const endTime = value?.workEndTime || null;
  // 표시용 값 (선택되지 않았으면 '00:00', 선택되었으면 실제 값)
  const displayStartTime = startTime || '00:00';
  const displayEndTime = endTime || '00:00';

  // 선택 여부 확인
  const isStartTimeSelected = startTime !== null;
  const isEndTimeSelected = endTime !== null;

  const handleStartTimeChange = (value: string) => {
    onChange?.({ workStartTime: value, workEndTime: endTime });
  };

  const handleEndTimeChange = (value: string) => {
    onChange?.({ workStartTime: startTime, workEndTime: value });
  };

  return (
    <div className={cn('flex gap-27 lg:gap-36', className)}>
      <TimeSelect
        isInvalid={isStartInvalid}
        isSelected={isStartTimeSelected}
        label="근무 시작"
        placeholder="00:00"
        value={displayStartTime}
        onChange={handleStartTimeChange}
      />
      <TimeSelect
        isInvalid={isEndInvalid}
        isSelected={isEndTimeSelected}
        label="근무 종료"
        placeholder="00:00"
        value={displayEndTime}
        onChange={handleEndTimeChange}
      />
    </div>
  );
};

export default TimePicker;
