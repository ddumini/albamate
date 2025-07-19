'use client';

import { cn } from '@/shared/lib/cn';

import AddformButtons from './AddformButtons';
import MenuItem, { MenuIndex } from './MenuItem';

interface SidebarProps {
  currentMenu: MenuIndex;
  writingMenu: Record<MenuIndex, boolean>;
  onMenuClick: (menuIndex: MenuIndex) => void;
  isEdit?: boolean;
  className?: string;
}

const Sidebar = ({
  currentMenu = 1,
  writingMenu = { 1: false, 2: false, 3: false },
  onMenuClick,
  isEdit,
  className,
}: SidebarProps) => {
  const menuIndexList: MenuIndex[] = [1, 2, 3];
  return (
    <nav
      className={cn(
        'flex h-966 w-452 flex-col justify-between rounded-2xl bg-background-200 p-40',
        className
      )}
    >
      <ul>
        {menuIndexList.map(menuIndex => (
          <li key={menuIndex}>
            <MenuItem
              isActive={currentMenu === menuIndex}
              isWriting={writingMenu[menuIndex]}
              menuIndex={menuIndex}
              onClick={onMenuClick}
            />
          </li>
        ))}
      </ul>

      <AddformButtons isEdit={isEdit} />
    </nav>
  );
};
export default Sidebar;
