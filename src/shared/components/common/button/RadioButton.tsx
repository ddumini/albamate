'use client';

import { JSX } from 'react';

import { cn } from '@/shared/lib/cn';

export interface RadioOption {
  value: string;
  /** 화면에 표시될 라벨 */
  label: string;
  /** 개별 옵션 비활성화 여부 */
  disabled?: boolean;
}

export interface RadioButtonProps {
  name: string;
  options: RadioOption[];
  value?: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  legend?: string;
}

/**
 * 라디오 버튼 그룹 컴포넌트
 *
 * @description
 * 버튼 형태의 라디오 버튼 그룹을 제공합니다.
 * 접근성을 고려하여 fieldset과 legend를 사용합니다.
 *
 * @example
 * ```tsx
 * import { useState } from 'react';
 * import RadioButton from '@/shared/components/common/button/RadioButton';
 *
 * const MyComponent = () => {
 *   const [selected, setSelected] = useState('');
 *   const options = [
 *     { value: 'REJECTED', label: '거절' },
 *     { value: 'INTERVIEW_PENDING', label: '면접대기' },
 *     { value: 'INTERVIEW_COMPLETED', label: '면접 완료' },
 *     { value: 'HIRED', label: '채용 완료', disabled: true },
 *   ];
 *
 *   return (
 *     <RadioButton
 *       legend="현재 진행상태를 알려주세요."
 *       name="applicationStatus"
 *       options={options}
 *       value={selected}
 *       onChange={setSelected}
 *     />
 *   );
 * };
 * ```
 *
 * @example
 * // 비활성화된 전체 그룹
 * ```tsx
 * <RadioButton
 *   name="status"
 *   options={options}
 *   value={selected}
 *   onChange={setSelected}
 *   disabled={true}
 * />
 * ```
 */
const RadioButton = ({
  name,
  options,
  value,
  onChange,
  disabled = false,
  legend,
}: RadioButtonProps): JSX.Element => {
  return (
    <fieldset>
      {legend && <legend className="sr-only">{legend}</legend>}
      <div className="flex flex-col gap-8">
        {options.map(option => {
          const isDisabled = disabled || option.disabled;
          const isChecked = value === option.value;
          return (
            <label
              key={option.value}
              className={cn(
                `flex w-327 cursor-pointer items-center justify-between rounded-lg border-2 border-line-100 bg-white p-14 font-medium text-gray-600 transition-all duration-200`,
                `hover:border-mint-300 has-checked:border-mint-300 has-checked:bg-mint-50 has-disabled:cursor-not-allowed has-disabled:opacity-50 has-disabled:hover:border-line-100 lg:w-360 lg:px-24 lg:py-17`,
                `dark:bg-gray-800 dark:text-gray-400 dark:hover:border-mint-300 dark:has-checked:border-mint-300 dark:has-checked:bg-mint-50 dark:has-checked:text-black`
              )}
            >
              <span className="flex-1 text-sm select-none lg:text-base">
                {option.label}
              </span>
              <div className="relative inline-block">
                <input
                  checked={isChecked}
                  className="block h-22 w-22 cursor-pointer appearance-none rounded-full border border-gray-200 bg-white transition-all duration-200 checked:border-mint-300 checked:bg-white disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={isDisabled}
                  name={name}
                  type="radio"
                  value={option.value}
                  onChange={e => {
                    onChange(e.target.value);
                  }}
                />
                {isChecked && (
                  <div className="absolute top-6 left-6 size-10 rounded-full bg-mint-300" />
                )}
              </div>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
};

export default RadioButton;
