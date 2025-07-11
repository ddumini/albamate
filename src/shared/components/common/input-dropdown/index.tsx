import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import Dropdown from '@/shared/components/ui/Dropdown';

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
 */

interface InputDropdownOption {
  value: string;
}
interface InputDropdownProps {
  options: InputDropdownOption[];
  placeholder?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
}

const BTN_STYLE =
  'w-full text-left px-24 h-54 text-lg font-regular text-black-100 cursor-pointer lg:text-xl lg:h-64 lg:px-32';
const INPUT_STYLE =
  'text-black-100 bg-background-200 h-54 w-full rounded-lg text-lg px-24 focus:outline-gray-200 focus:outline-1 focus:ring-0 lg:text-xl lg:h-64 lg:px-32 min-w-none';

const InputDropdown = ({
  options,
  placeholder = '선택',
  defaultValue = '',
  onChange,
}: InputDropdownProps) => {
  const [inputValue, setInputValue] = useState(defaultValue);
  const [directInputValue, setDirectInputValue] = useState('');
  const [isDirectInput, setIsDirectInput] = useState(false);
  const [currentPlaceholder, setCurrentPlaceholder] = useState(placeholder);
  const directInputRef = useRef<HTMLInputElement>(null);

  const isDirectInputSelected = isDirectInput && inputValue === '직접입력';

  // 직접입력 모드가 활성화되면 input에 focus
  useEffect(() => {
    if (isDirectInput && directInputRef.current) {
      directInputRef.current.focus();
    }
  }, [isDirectInput]);

  const handleSelect = (value: string) => {
    setInputValue(value);
    setIsDirectInput(false);
    setCurrentPlaceholder(placeholder);
    onChange?.(value);
  };

  const handleDirectInput = () => {
    setInputValue('직접입력');
    setIsDirectInput(true);
    setCurrentPlaceholder('직접입력');
    onChange?.(inputValue);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    onChange?.(value);
  };

  const handleDirectInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDirectInputValue(value);
    onChange?.(value);
  };

  const selectInput = (
    <input
      readOnly
      className={INPUT_STYLE + ' cursor-pointer'}
      placeholder={currentPlaceholder}
      type="text"
      value={inputValue}
      onChange={handleInputChange}
    />
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
      <Dropdown
        trigger={
          <div className="relative">
            {selectInput}
            <Image
              alt="arrow-down"
              className="absolute top-1/2 right-24 -translate-y-1/2 lg:right-32 lg:h-36 lg:w-36"
              height={24}
              loading="lazy"
              src="/icons/drop-menu-down.svg"
              width={24}
            />
          </div>
        }
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
              onClick={handleDirectInput}
            >
              직접입력
            </button>
          </li>
        </ul>
      </Dropdown>
      <div className="mt-12">{isDirectInput && directInput}</div>
    </>
  );
};

export default InputDropdown;
