'use client';

import Image from 'next/image';
import { useState } from 'react';

import { cn } from '@/shared/lib/cn';

import MenuItem, { MenuIndex } from './MenuItem';

interface TabMenuProps {
  currentMenu: MenuIndex;
  writingMenu: Record<MenuIndex, boolean>;
  onMenuClick: (menuIndex: MenuIndex) => void;
  className?: string;
}

const TabMenu = ({
  currentMenu = 1,
  writingMenu = { 1: false, 2: false, 3: false },
  onMenuClick,
  className,
}: TabMenuProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const menuIndexList: MenuIndex[] = [1, 2, 3];
  const currentMenuList = [
    currentMenu,
    ...menuIndexList.filter(index => index !== currentMenu),
  ];
  const handleMenuClick = (menuIndex: MenuIndex) => {
    setIsOpen(false);
    onMenuClick(menuIndex);
  };
  return (
    <nav
      className={cn(
        'relative max-h-52 overflow-hidden rounded-2xl border-line-200 transition-all duration-300 ease-in-out',
        isOpen && 'max-h-156 border',
        className
      )}
    >
      <ul>
        {currentMenuList.map((menuIndex, i) => (
          <li key={menuIndex}>
            <MenuItem
              className={cn(
                i === 0 && 'rounded-b-none',
                i === 1 && 'rounded-none',
                i === 2 && 'rounded-t-none',
                !isOpen && 'cursor-auto'
              )}
              isActive={currentMenu === menuIndex}
              isWriting={writingMenu[menuIndex]}
              menuIndex={menuIndex}
              onClick={isOpen ? handleMenuClick : undefined}
            />
          </li>
        ))}
      </ul>
      <button
        className="absolute top-0 right-0 p-14 pr-24"
        type="button"
        onClick={() => setIsOpen(prev => !prev)}
      >
        <Image
          alt="탭 메뉴 화살표"
          className={cn('transition-transform', isOpen && 'rotate-180')}
          height={24}
          src="/icons/chevron-down-white.svg"
          width={24}
        />
      </button>
    </nav>
  );
};
export default TabMenu;
