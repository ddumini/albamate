'use client';

import Image from 'next/image';
import { useState } from 'react';

import Dropdown from '@/shared/components/ui/Dropdown';
import { cn } from '@/shared/lib/cn';

/**
 * Select 컴포넌트
 * 드롭다운 메뉴를 표시하고 사용자가 선택한 값을 처리합니다.
 * 선택 시 동작할 함수를 외부에서 전달받아 처리합니다.
 *
 * @author sumin
 * @date 2025-07-10
 *
 * @param {SelectProps} props
 * @param {SelectOption[]} props.options - 선택 옵션 배열
 * @param {string} [props.defaultValue] - 기본 선택된 값
 * @param {string} [props.value] - 현재 선택된 값 (제어 컴포넌트용)
 * @param {string} [props.placeholder] - 선택 시 표시될 텍스트
 * @param {string} [props.variant] - 선택 컴포넌트 타입 (filter, sort)
 * @param {string} [props.className] - 추가 커스텀 클래스
 *
 */

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  options: SelectOption[];
  onSelect: (selectedValue: string) => void;
  defaultValue?: string;
  value?: string;
  placeholder?: string;
  variant?: 'filter' | 'sort';
  wrapperClassName?: string;
  buttonClassName?: string;
}

const Select = ({
  options,
  onSelect,
  defaultValue,
  value,
  placeholder,
  variant = 'filter',
  wrapperClassName = '',
  buttonClassName = '',
}: SelectProps) => {
  const [internalValue, setInternalValue] = useState(defaultValue || '');

  // 외부에서 value가 제공되면 그것을 사용, 아니면 내부 상태 사용
  const selectedValue = value !== undefined ? value : internalValue;

  const handleSelect = (newValue: string) => {
    setInternalValue(newValue);
    onSelect(newValue);
  };

  const selectedOption = options.find(option => option.value === selectedValue);

  // variant에 따른 스타일 분기
  const getButtonStyles = () => {
    if (variant === 'sort') {
      return `flex w-full cursor-pointer items-center justify-end gap-2 text-xs font-semibold whitespace-nowrap lg:text-lg ${buttonClassName}`;
    }
    return `text-black-100 dark:text-gray-200 flex h-30 w-80 lg:w-126 cursor-pointer items-center justify-between rounded-sm border border-gray-100 px-12 text-xs lg:h-42 lg:text-2lg lg:px-16 ${buttonClassName} ${
      selectedValue
        ? 'text-mint-300 bg-mint-50/50 border-mint-300 dark:text-mint-300'
        : 'text-black-100'
    }`;
  };

  const getIconSrc = () => {
    if (variant === 'sort') {
      return '/icons/chevron-down-thin.svg';
    }
    return selectedOption
      ? '/icons/chevron-down-mint.svg'
      : '/icons/chevron-down.svg';
  };

  const getIconProps = () => {
    if (variant === 'sort') {
      return {
        className: 'lg:h-24 lg:w-24',
        height: 16,
        width: 16,
      };
    }
    return {
      height: 16,
      width: 16,
    };
  };

  const getOptionStyles = (isSelected: boolean) => {
    if (variant === 'sort') {
      return `h-28 w-full cursor-pointer items-center gap-2 rounded-lg text-center text-xs font-semibold lg:h-38 lg:text-lg ${
        isSelected
          ? 'bg-mint-50/50 text-black-300 dark:bg-mint-400 dark:text-white'
          : 'text-gray-400 dark:text-white'
      }`;
    }
    return `flex w-full cursor-pointer items-center gap-2 px-10 h-34 text-left text-xs lg:text-2lg lg:h-52 lg:px-16 ${
      isSelected
        ? 'bg-mint-50/50 text-black-300 dark:bg-mint-400 dark:text-white'
        : 'text-gray-400 dark:text-white'
    }`;
  };

  const getOptionWrapperStyles = () => {
    if (variant === 'sort') {
      return 'p-3 lg:p-6';
    }
    return '';
  };

  const getDefaultText = () => {
    if (variant === 'sort') {
      return selectedOption?.label || '최신순';
    }
    return selectedOption?.label || placeholder || '선택하세요';
  };

  return (
    <Dropdown
      className={cn(
        variant === 'sort' ? 'w-80 lg:w-132' : 'w-80 lg:w-126',
        wrapperClassName
      )}
      isRight={variant === 'sort'}
      trigger={
        <button className={getButtonStyles()} type="button">
          <span>{getDefaultText()}</span>
          <Image alt="arrow-down" src={getIconSrc()} {...getIconProps()} />
        </button>
      }
    >
      <ul>
        {options.map(option => (
          <li key={option.value} className={getOptionWrapperStyles()}>
            <button
              className={getOptionStyles(selectedValue === option.value)}
              type="button"
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </button>
          </li>
        ))}
      </ul>
    </Dropdown>
  );
};

export default Select;
