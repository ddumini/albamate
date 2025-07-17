'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

import ThemeToggle from '@/shared/components/ThemeToggle';

interface RightMenuProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  isDark?: boolean; // Optional prop for dark mode
}

const RightMenu = ({ isOpen, setIsOpen, isDark }: RightMenuProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 마운트 되기 전까지는 null 혹은 로딩 상태로 처리
  if (!mounted) {
    // 선택: 로딩 아이콘, 빈 div, 혹은 기본 라이트모드 아이콘 렌더링 가능
    return null;
  }

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
