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
  'h-28 w-full cursor-pointer items-center gap-2 rounded-lg text-center text-xs font-semibold lg:h-38 lg:text-lg';

const InputDropdown = ({
  options,
  placeholder = '선택',
  defaultValue = '',
  onChange,
}: InputDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(defaultValue);
  const [isDirectInput, setIsDirectInput] = useState(false);
  const [currentPlaceholder, setCurrentPlaceholder] = useState(placeholder);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSelect = (value: string) => {
    setInputValue(value);
    setIsDirectInput(false);
    setCurrentPlaceholder(placeholder);
    setIsOpen(false);
    onChange?.(value);
  };

  const handleDirectInput = () => {
    setInputValue('');
    setIsDirectInput(true);
    setCurrentPlaceholder('직접입력');
    setIsOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    onChange?.(value);
  };

  // 직접입력 모드가 활성화되면 input에 focus
  useEffect(() => {
    if (isDirectInput && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isDirectInput]);

  return (
    <Dropdown
      className="w-80 lg:w-132"
      trigger={
        <div className="relative flex items-center">
          <input
            ref={inputRef}
            className="h-28 w-full rounded-lg border border-gray-300 px-3 text-xs lg:h-38 lg:text-lg"
            placeholder={currentPlaceholder}
            readOnly={!isDirectInput}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
          />
          <Image
            alt="arrow-down"
            className="absolute right-3"
            height={16}
            loading="lazy"
            src="/icons/drop-menu-down.svg"
            width={16}
          />
        </div>
      }
    >
      <ul>
        {options.map(option => (
          <li key={option.value}>
            <button
              className={BTN_STYLE}
              onClick={() => handleSelect(option.value)}
            >
              {option.value}
            </button>
          </li>
        ))}
        <li>
          <button className={BTN_STYLE} onClick={handleDirectInput}>
            직접입력
          </button>
        </li>
      </ul>
    </Dropdown>
  );
};

export default InputDropdown;
