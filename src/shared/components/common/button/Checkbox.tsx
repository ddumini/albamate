'use client';

import React from 'react';

export interface CheckboxProps {
  /** 체크박스의 고유 식별자 */
  id: string;
  /** 체크박스 옆에 표시될 라벨 텍스트 */
  label?: string;
  /** 체크박스의 선택 상태 */
  checked: boolean;
  /** 체크박스 비활성화 여부 */
  disabled?: boolean;
  /** 체크박스 상태 변경 시 호출될 콜백 함수 */
  onChange: (checked: boolean) => void;
}

/**
 * Checkbox 컴포넌트
 *
 * @description
 * 커스텀 디자인의 체크박스 컴포넌트입니다.
 * 반응형 디자인을 지원하며, 접근성을 고려하여 구현되었습니다.
 *
 * @example
 * ```tsx
 * import { useState } from 'react';
 * import Checkbox from '@/shared/components/common/button/Checkbox';
 *
 * const MyComponent = () => {
 *   const [isChecked, setIsChecked] = useState(false);
 *
 *   return (
 *     <Checkbox
 *       id="example-checkbox"
 *       label="이용약관에 동의합니다"
 *       checked={isChecked}
 *       onChange={setIsChecked}
 *     />
 *   );
 * };
 * ```
 */
const Checkbox = ({
  id,
  label,
  checked = false,
  disabled = false,
  onChange,
}: CheckboxProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!disabled) {
      onChange(event.target.checked);
    }
  };

  const getCheckboxStyle = () => {
    if (checked && disabled) {
      return {
        borderColor: 'var(--color-gray-300)',
        backgroundColor: 'var(--color-gray-300)',
      };
    }
    if (checked) {
      return {
        borderColor: 'var(--color-mint-300)',
        backgroundColor: 'var(--color-mint-300)',
      };
    }
    return {};
  };

  return (
    <label
      className="relative flex w-fit cursor-pointer items-center gap-10 has-[:disabled]:cursor-not-allowed"
      htmlFor={id}
    >
      <input
        aria-checked={checked}
        checked={checked}
        className="peer sr-only"
        disabled={disabled}
        id={id}
        type="checkbox"
        onChange={handleChange}
      />
      {/* 체크박스 박스 */}
      <div
        className="relative flex size-22 cursor-pointer items-center justify-center rounded-sm border border-gray-200 transition-all duration-200 ease-in-out peer-disabled:cursor-not-allowed peer-disabled:opacity-50 lg:size-26"
        style={getCheckboxStyle()}
      >
        {/* 체크마크 아이콘 */}
        {checked && (
          <svg
            className="size-22 text-white lg:size-26"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 13l4 4L19 7"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
            />
          </svg>
        )}
      </div>

      {/* 라벨 텍스트 */}
      {label && (
        <span className="text-sm select-none peer-disabled:text-gray-300 lg:text-xl">
          {label}
        </span>
      )}
    </label>
  );
};

export default Checkbox;
