'use client';

import { useEffect, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';

/**
 * Dropdown 컴포넌트
 *
 * 트리거 요소를 클릭하면 드롭다운 메뉴를 표시합니다.
 * 외부 클릭 또는 ESC 키 입력 시 드롭다운이 닫힙니다.
 *
 * @author sumin
 * @date 2025-07-10
 *
 * @param {DropdownProps} props
 * @param {React.ReactNode} props.trigger - 드롭다운을 여는 트리거 요소
 * @param {React.ReactNode} props.children - 드롭다운 내부에 표시될 내용
 * @param {string} [props.className] - 추가 커스텀 클래스
 * @param {string} [props.id] - 고유 식별자
 * @param {boolean} [props.isRight] - 우측 드롭다운 여부
 *
 * @example
 * <Dropdown
 *   trigger={<button>메뉴</button>}
 * >
 *   <ul>
 *     <li>옵션 1</li>
 *     <li>옵션 2</li>
 *   </ul>
 * </Dropdown>
 */

interface DropdownProps {
  trigger: React.ReactNode | ((isOpen: boolean) => React.ReactNode);
  children: React.ReactNode;
  className?: string;
  id?: string;
  isRight?: boolean;
}

const Dropdown = ({
  trigger,
  children,
  className = '',
  id,
  isRight = false,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const renderTrigger = () => {
    if (typeof trigger === 'function') {
      return trigger(isOpen);
    }
    return trigger;
  };

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    // 이벤트 리스너 등록
    document.addEventListener('mousedown', handleClickOutside);

    // 클린업 함수
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // ESC 키로 드롭다운 닫기
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const handleToggle = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <div
      ref={dropdownRef}
      className={`relative ${className}`}
      data-dropdown-id={id} // 고유 식별자
    >
      <div
        role="button"
        tabIndex={0}
        onClick={handleToggle}
        onKeyDown={event => {
          if (event.key === 'Enter') {
            setIsOpen(true);
          }
        }}
      >
        {renderTrigger()}
      </div>

      {isOpen && (
        <div
          aria-expanded={isOpen}
          className={twMerge(
            'absolute top-full right-0 left-0 z-50 mt-4 overflow-hidden rounded-sm border border-gray-100 bg-white shadow-[4px_4px_4px_rgba(130,130,130,0.08)]',
            isRight && 'left-auto'
          )}
          role="menu"
          onClick={() => setIsOpen(false)}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
