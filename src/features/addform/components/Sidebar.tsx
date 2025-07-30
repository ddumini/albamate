'use client';

import { cn } from '@/shared/lib/cn';

import AddformButtons from './AddformButtons';
import MenuItem, { Menu } from './MenuItem';

interface SidebarProps {
  currentMenu: Menu;
  writingMenu: Record<Menu, boolean>;
  onMenuClick: (menu: Menu) => void;
  isEdit?: boolean;
  className?: string;
  onSave?: () => void;
  onSubmit?: () => void;
  isSubmitting?: boolean;
}

const Sidebar = ({
  currentMenu = 'recruitContent',
  writingMenu = {
    recruitContent: false,
    recruitCondition: false,
    workCondition: false,
  },
  onMenuClick,
  isEdit,
  className,
  onSave,
  onSubmit,
  isSubmitting,
}: SidebarProps) => {
  const menuList: Menu[] = [
    'recruitContent',
    'recruitCondition',
    'workCondition',
  ];
  return (
    <nav
      className={cn(
        'flex h-966 w-452 flex-col justify-between rounded-2xl bg-background-200 p-40 dark:bg-gray-800',
        className
      )}
    >
      <ul className="flex flex-col gap-8">
        {menuList.map(menu => (
          <li key={menu}>
            <MenuItem
              isActive={currentMenu === menu}
              isWriting={writingMenu[menu]}
              menu={menu}
              menuIndex={menuList.indexOf(menu)}
              onClick={onMenuClick}
            />
          </li>
        ))}
      </ul>

      <AddformButtons
        isEdit={isEdit}
        isSubmitting={isSubmitting}
        onSave={onSave}
        onSubmit={onSubmit}
      />
    </nav>
  );
};
export default Sidebar;
