'use client';

import Image from 'next/image';
import { useState } from 'react';

import { cn } from '@/shared/lib/cn';

import MenuItem, { Menu } from './MenuItem';

interface TabMenuProps {
  currentMenu: Menu;
  writingMenu: Record<Menu, boolean>;
  onMenuClick: (menu: Menu) => void;
  className?: string;
}

const TabMenu = ({
  currentMenu = 'recruitContent',
  writingMenu = {
    recruitContent: false,
    recruitCondition: false,
    workCondition: false,
  },
  onMenuClick,
  className,
}: TabMenuProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const menuList: Menu[] = [
    'recruitContent',
    'recruitCondition',
    'workCondition',
  ];
  const currentMenuList = [
    currentMenu,
    ...menuList.filter(menu => menu !== currentMenu),
  ];
  const handleMenuClick = (menu: Menu) => {
    setIsOpen(false);
    onMenuClick(menu);
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
        {currentMenuList.map((menu, index) => (
          <li key={menu}>
            <MenuItem
              className={cn(
                index === 0 && 'rounded-b-none',
                index === 1 && 'rounded-none',
                index === 2 && 'rounded-t-none',
                !isOpen && 'cursor-auto'
              )}
              isActive={currentMenu === menu}
              isWriting={writingMenu[menu]}
              menu={menu}
              menuIndex={menuList.indexOf(menu)}
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
