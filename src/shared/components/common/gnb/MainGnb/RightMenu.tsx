'use client';

import ThemeToggle from '@components/ThemeToggle';
import Image from 'next/image';

interface RightMenuProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  isDark: boolean;
}

const RightMenu = ({ isOpen, setIsOpen, isDark }: RightMenuProps) => {
  return (
    <div className="flex items-center gap-12">
      <ThemeToggle />
      <button
        aria-label="메뉴 열기/닫기"
        className="relative h-24 w-24 cursor-pointer md:h-36 md:w-36"
        type="button"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Image
          alt="메뉴 아이콘"
          height={24}
          src={isDark ? '/icons/menu-white.svg' : '/icons/menu.svg'}
          width={24}
        />
      </button>
    </div>
  );
};

export default RightMenu;
