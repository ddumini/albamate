"use client";

import { JSX } from "react";

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
  size?: "sm" | "md";
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
 *       size="sm"
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
  size = "sm",
}: RadioButtonProps): JSX.Element => {
  const sizeStyle = {
    sm: {
      button: "p-14 text-sm rounded-lg w-[327px]",
      text: "text-sm",
    },
    md: {
      button: "px-24 py-17 text-lg rounded-lg w-[360px]",
      text: "text-base",
    },
  };

  const currentSize = sizeStyle[size];

  return (
    <fieldset>
      {legend && <legend className="sr-only">{legend}</legend>}
      <div className="flex flex-col gap-8">
        {options.map((option) => {
          const isDisabled = disabled || option.disabled;
          const isChecked = value === option.value;
          return (
            <label
              key={option.value}
              className={`
                  ${currentSize.button}
                  border-2 cursor-pointer transition-all duration-200 font-medium
                  flex items-center justify-between
                  ${
                    isChecked
                      ? "border-mint-300 bg-gray-50"
                      : "border-line-100 bg-white hover:border-mint-300"
                  }
                  ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}
                `}
            >
              <span
                className={`${currentSize.text} ${isDisabled ? "text-gray-400" : "text-gray-600"} flex-1 select-none`}
              >
                {option.label}
              </span>
              <div className="relative inline-block">
                <input
                  checked={isChecked}
                  className="
                    w-22 h-22
                    appearance-none rounded-full border border-gray-200 bg-white
                    checked:border-mint-300 checked:bg-white
                    disabled:opacity-50 disabled:cursor-not-allowed
                    transition-all duration-200
                    cursor-pointer
                    block
                  "
                  disabled={isDisabled}
                  name={name}
                  type="radio"
                  value={option.value}
                  onChange={(e) => {
                    onChange(e.target.value);
                  }}
                />
                {isChecked && (
                  <div className="absolute top-6 left-6 w-10 h-10 bg-mint-300 rounded-full" />
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
