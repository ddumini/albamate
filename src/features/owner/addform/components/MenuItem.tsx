'use client';

import { cn } from '@/shared/lib/cn';

import NumberCircle from './NumberCircle';
import WritingBadge from './WritingBadge';

interface MenuItemProps {
  isActive?: boolean;
  isWriting?: boolean;
  menuIndex: MenuIndex;
  onClick?: (menuIndex: MenuIndex) => void;
  className?: string;
}

export type MenuIndex = 1 | 2 | 3;

const MenuItem = ({
  isActive,
  isWriting,
  menuIndex,
  onClick,
  className,
}: MenuItemProps) => {
  const itemLabels: Record<MenuIndex, string> = {
    1: '모집내용',
    2: '모집조건',
    3: '근무조건',
  };
  return (
    <button
      className={cn(
        'flex h-52 w-full items-center gap-12 rounded-2xl px-24 lg:h-78 lg:justify-between lg:px-32',
        'transition-all duration-200 ease-in-out',
        isActive
          ? 'bg-mint-300 dark:bg-mint-350'
          : 'hover:bg-mint-300/30 dark:hover:bg-mint-350/40',
        className
      )}
      type="button"
      onClick={() => onClick?.(menuIndex)}
    >
      <div className="flex items-center gap-10 lg:gap-24">
        <NumberCircle isActive={isActive}>{menuIndex}</NumberCircle>
        <span
          className={cn(
            'text-lg font-bold lg:text-xl',
            isActive
              ? 'text-gray-25 dark:text-gray-50'
              : 'text-black-100 dark:text-gray-500'
          )}
        >
          {itemLabels[menuIndex]}
        </span>
      </div>
      {isWriting && <WritingBadge isActive={isActive} />}
    </button>
  );
};
export default MenuItem;
