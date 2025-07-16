'use client';

import ThemeToggle from '@components/ThemeToggle';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

import GnbMenu from '../gnb-menu/GnbMenu';

const MainGnb = () => {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { resolvedTheme } = useTheme();
  const pathname = usePathname();
  const router = useRouter();
  const isDark = resolvedTheme === 'dark';
  const isDarkLogo = isDark ? '/logos/logo-dark.svg' : '/logos/logo.svg';
  const isDarkSymbol = isDark ? '/logos/symbol-dark.svg' : '/logos/symbol.svg';

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <header className="w-full border-b border-gray-400 px-24 md:px-72 dark:border-gray-500">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-6 md:py-3">
        {/* 좌측 영역 */}
        <div className="flex items-center md:gap-32 lg:gap-48">
          {/* 로고 */}
          <button
            className="flex cursor-pointer items-center space-x-2 py-15 text-xl font-bold md:py-24"
            type="button"
            onClick={() => router.push('/')}
          >
            <div className="relative mr-24 h-20 w-20 md:mr-12 md:h-24 md:w-24 lg:mr-16 lg:h-36 lg:w-36">
              <Image fill alt="로고 이미지" src={isDarkSymbol} />
            </div>
            <div className="relative hidden h-24 w-124 md:flex lg:h-36 lg:w-200">
              <Image fill alt="로고 명" src={isDarkLogo} />
            </div>
          </button>

          {/* 네비게이션 메뉴 */}
          <nav className="flex gap-16 text-[14px] font-medium md:gap-24 md:text-[16px] lg:text-[20px]">
            <button
              className={`hover:text-primary cursor-pointer border-none bg-transparent p-0 text-inherit transition-colors ${
                pathname === '/albalist' ? 'text-mint-100' : ''
              }`}
              type="button"
              onClick={() => router.push('/albalist')}
            >
              알바 목록
            </button>
            <button
              className={`hover:text-primary cursor-pointer border-none bg-transparent p-0 text-inherit transition-colors ${
                pathname === '/albatalk' ? 'text-mint-100' : ''
              }`}
              type="button"
              onClick={() => router.push('/albatalk')}
            >
              알바토크
            </button>
            <button
              className={`hover:text-primary cursor-pointer border-none bg-transparent p-0 text-inherit transition-colors ${
                pathname === '/myalbaform' ? 'text-mint-100' : ''
              }`}
              type="button"
              onClick={() => router.push('/myalbaform')}
            >
              내 알바폼
            </button>
          </nav>
        </div>

        {/* 우측 영역 */}
        <div className="flex items-center gap-12">
          <ThemeToggle />
          <button
            aria-label="메뉴 열기/닫기"
            className="relative h-24 w-24 cursor-pointer md:h-36 md:w-36"
            type="button"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Image
              fill
              alt="메뉴 아이콘"
              src={isDark ? '/icons/menu-white.svg' : '/icons/menu.svg'}
            />
          </button>
        </div>
      </div>

      {/* 사이드 바 */}
      <GnbMenu isOpen={isOpen} setIsOpen={setIsOpen} />
    </header>
  );
};

export default MainGnb;
