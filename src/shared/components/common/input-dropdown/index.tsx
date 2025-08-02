'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import Dropdown from '@/shared/components/ui/Dropdown';
import { cn } from '@/shared/lib/cn';

/**
 * InputDropdown 컴포넌트
 * 드롭다운 메뉴를 표시하고 사용자가 선택한 값을 처리합니다.
 * 직접입력 버튼을 클릭하면 입력창이 활성화되고 입력한 값을 처리합니다.
 *
 * @author sumin
 * @date 2025-07-10
 *
 * @param {InputDropdownProps} props
 * @param {InputDropdownOption[]} props.options - 선택 옵션 배열
 * @param {string} [props.defaultValue] - 기본 선택된 값
 * @param {string} [props.placeholder] - 선택 시 표시될 텍스트
 * @param {string} [props.className] - 추가 커스텀 클래스
 *
 * 개선사항 (2025-07-16)
 * 1. Hidden input 추가: 실제 form 제출 시 사용할 단일 input 필드
 * 2. name 속성 지원: form에서 필드 식별 가능
 * 3. required 옵셔널 속성 추가
 * 4. selectInput을 div로 변경: 실제 input이 아닌 표시용 요소로 변경
 * 5. 실제 값 동기화: hidden input의 값이 항상 현재 선택된 실제 값과 동기화
 *
 */

interface InputDropdownOption {
  value: string;
}

interface InputDropdownProps {
  options: InputDropdownOption[];
  placeholder?: string;
  value?: string;
  name?: string; // form에서 사용할 name 속성 추가
  onChange?: (value: string) => void;
  required?: boolean; // 필수 필드 여부
  className?: string; // 추가 커스텀 클래스
}

const BTN_STYLE =
  'w-full text-left px-24 h-54 text-lg font-regular text-black-100 cursor-pointer lg:text-xl lg:h-64 lg:px-32';
const INPUT_STYLE =
  'border-1 border-transparent text-black-100 bg-background-200 h-54 w-full rounded-lg text-lg px-24 lg:text-xl lg:h-64 lg:px-32 min-w-none';

const InputDropdown = ({
  options,
  placeholder = '선택',
  value = '',
  name,
  onChange,
  required = false,
  className,
}: InputDropdownProps) => {
  const inputValue = value;
  const [directInputValue, setDirectInputValue] = useState('');
  const [isDirectInput, setIsDirectInput] = useState(false);
  const [currentPlaceholder, setCurrentPlaceholder] = useState(placeholder);
  const directInputRef = useRef<HTMLInputElement>(null);
  const hiddenInputRef = useRef<HTMLInputElement>(null);

  const isDirectInputSelected = isDirectInput && inputValue === '직접입력';

  // 직접입력 모드가 활성화되면 input에 focus
  useEffect(() => {
    if (isDirectInput && directInputRef.current) {
      directInputRef.current.focus();
    }
  }, [isDirectInput]);

  // 실제 form 값 업데이트
  useEffect(() => {
    if (hiddenInputRef.current) {
      const actualValue = isDirectInput ? directInputValue : inputValue;
      hiddenInputRef.current.value = actualValue;
    }
  }, [inputValue, directInputValue, isDirectInput]);

  const handleSelect = (value: string) => {
    setIsDirectInput(false);
    setCurrentPlaceholder(placeholder);
    setDirectInputValue('');
    onChange?.(value);
  };

  const handleDirectInput = () => {
    setIsDirectInput(true);
    setCurrentPlaceholder('직접입력');
    onChange?.(directInputValue);
  };

  const handleDirectInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDirectInputValue(value);
    onChange?.(value);
  };

  const selectInput = (isOpen: boolean) => (
    <div
      className={cn(
        INPUT_STYLE,
        'flex cursor-pointer items-center',
        // 드롭다운이 열려있을 때는 border만 표시
        isOpen && 'border-gray-200 focus:ring-0 focus:outline-none',
        // 드롭다운이 닫혀있을 때는 기본 포커스 스타일 허용
        !isOpen && ''
      )}
    >
      <span className="flex-1">
        {isDirectInput ? currentPlaceholder : inputValue || currentPlaceholder}
      </span>
    </div>
  );

  const directInput = (
    <input
      ref={directInputRef}
      className={INPUT_STYLE + ' mt-2'}
      placeholder="직접입력"
      type="text"
      value={directInputValue}
      onChange={handleDirectInputChange}
    />
  );

  return (
    <>
      {/* 실제 form에서 사용할 hidden input */}
      <input
        ref={hiddenInputRef}
        name={name}
        required={required}
        type="hidden"
        value={isDirectInput ? directInputValue : inputValue}
      />

      <Dropdown
        trigger={isOpen => (
          <div className={cn('relative', className)}>
            {selectInput(isOpen)}
            <Image
              alt="arrow-down"
              className="absolute top-1/2 right-24 -translate-y-1/2 lg:right-32 lg:h-36 lg:w-36"
              height={24}
              src="/icons/drop-menu-down.svg"
              width={24}
            />
          </div>
        )}
      >
        <ul>
          {options.map(option => (
            <li key={option.value}>
              <button
                className={
                  BTN_STYLE +
                  (option.value === inputValue && !isDirectInput
                    ? ' bg-mint-50/50 text-mint-300'
                    : '')
                }
                type="button"
                onClick={() => handleSelect(option.value)}
              >
                {option.value}
              </button>
            </li>
          ))}
          <li>
            <button
              className={
                BTN_STYLE +
                (isDirectInputSelected ? ' bg-mint-50/50 text-mint-300' : '')
              }
              type="button"
              onClick={handleDirectInput}
            >
              직접입력
            </button>
          </li>
        </ul>
      </Dropdown>
      {isDirectInput && <div className="mt-12">{directInput}</div>}
    </>
  );
};

export default InputDropdown;
