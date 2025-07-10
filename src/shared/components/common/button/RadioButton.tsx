'use client';

import { JSX } from 'react';

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
const RadioButton = ({ name, options, value, onChange, disabled = false, legend }: RadioButtonProps): JSX.Element => {
  return (
    <fieldset>
      {legend && <legend className='sr-only'>{legend}</legend>}
      <div className='flex flex-col gap-8'>
        {options.map((option) => {
          const isDisabled = disabled || option.disabled;
          const isChecked = value === option.value;
          return (
            <label
              key={option.value}
              className={`lg:py-17 lg:w-360 w-327 flex cursor-pointer items-center justify-between rounded-lg border-2 p-14 font-medium transition-all duration-200 lg:px-24 ${
                isChecked ? 'border-mint-300 bg-gray-50' : 'border-line-100 hover:border-mint-300 bg-white'
              } ${isDisabled ? 'cursor-not-allowed opacity-50' : ''} `}
            >
              <span
                className={`flex-1 select-none text-sm lg:text-base ${isDisabled ? 'text-gray-400' : 'text-gray-600'}`}
              >
                {option.label}
              </span>
              <div className='relative inline-block'>
                <input
                  checked={isChecked}
                  className='w-22 h-22 checked:border-mint-300 block cursor-pointer appearance-none rounded-full border border-gray-200 bg-white transition-all duration-200 checked:bg-white disabled:cursor-not-allowed disabled:opacity-50'
                  disabled={isDisabled}
                  name={name}
                  type='radio'
                  value={option.value}
                  onChange={(e) => {
                    onChange(e.target.value);
                  }}
                />
                {isChecked && <div className='bg-mint-300 absolute left-6 top-6 h-10 w-10 rounded-full' />}
              </div>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
};

export default RadioButton;
