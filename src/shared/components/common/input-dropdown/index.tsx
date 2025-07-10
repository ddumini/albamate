import Image from 'next/image';
import { useState } from 'react';

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
  label: string;
}

interface InputDropdownProps {
  options: InputDropdownOption[];
  onSelect: (selectedValue: string) => void;
  defaultValue?: string;
  placeholder?: string;
}

const BTN_STYLE =
  'h-28 w-full cursor-pointer items-center gap-2 rounded-lg text-center text-xs font-semibold lg:h-38 lg:text-lg';

const InputDropdown = ({
  options,
  onSelect,
  defaultValue,
  placeholder = '선택',
}: InputDropdownProps) => {
  const [selectedValue, setSelectedValue] = useState(defaultValue || '');

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    onSelect(value);
  };

  return (
    <Dropdown
      className="w-80 lg:w-132"
      trigger={
        <div>
          <input className="" placeholder={placeholder} type="text" />
          <Image
            alt="arrow-down"
            loading="lazy"
            src="/icons/drop-menu-down.svg"
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
              {option.label}
            </button>
          </li>
        ))}
        <li>
          <button className={BTN_STYLE}>직접입력</button>
        </li>
      </ul>
    </Dropdown>
  );
};

export default InputDropdown;
