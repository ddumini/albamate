'use client';

import AlbaDropdown from '@common/list/AlbaDropdown'; // 경로 확인
import Image from 'next/image';
import { useRef, useState } from 'react';

import { useClickOutside } from '@/shared/hooks/useClickOutside'; // 경로 확인
import { cn } from '@/shared/lib/cn';

interface KebabMenuDropdownProps {
  options: { label: string; onClick: () => void }[];
  className?: string;
}

const KebabMenuDropdown = ({ options, className }: KebabMenuDropdownProps) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useClickOutside(dropdownRef, () => {
    if (open) {
      setOpen(false);
    }
  });

  const handleToggle = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.preventDefault(); // Link의 기본 동작 방지
    e.stopPropagation(); // 이벤트 버블링 방지
    setOpen(prev => !prev);
  };

  return (
    <div ref={dropdownRef} className={cn('relative ml-auto', className)}>
      <Image
        alt="드롭다운 아이콘"
        className="cursor-pointer"
        height={24}
        role="button"
        src="/icons/kebab-menu.svg"
        tabIndex={0}
        width={24}
        onClick={handleToggle}
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleToggle(e); // 키보드 이벤트도 handleToggle로 처리
          }
        }}
      />
      {open && <AlbaDropdown options={options} />}
    </div>
  );
};

export default KebabMenuDropdown;
