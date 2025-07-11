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

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <header className="w-full border-b border-gray-200 px-12 md:px-32 dark:border-gray-500">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-6 md:py-3">
        {/* 좌측 영역 */}
        <div className="flex items-center md:gap-24">
          {/* 로고 */}
          <button
            className="flex items-center space-x-2 text-xl font-bold"
            onClick={() => router.push('/')}
          >
            <div className="relative mr-24 h-16 w-16 md:mr-6 md:h-24 md:w-24">
              <Image fill alt="로고 이미지" src="/images/logo.svg" />
            </div>
            <div className="md: relative hidden h-40 w-100 md:flex">
              <Image fill alt="로고 명" src="/images/logo-typo.svg" />
            </div>
          </button>

          {/* 네비게이션 메뉴 */}
          <nav className="flex gap-6 text-[10px] font-medium md:text-xs lg:text-sm">
            <button
              className={`hover:text-primary cursor-pointer border-none bg-transparent p-0 text-inherit transition-colors ${
                pathname === '/albalist' ? 'text-mint-100' : ''
              }`}
              onClick={() => router.push('/albalist')}
            >
              알바 목록
            </button>
            <button
              className={`hover:text-primary cursor-pointer border-none bg-transparent p-0 text-inherit transition-colors ${
                pathname === '/albatalk' ? 'text-mint-100' : ''
              }`}
              onClick={() => router.push('/albatalk')}
            >
              알바토크
            </button>
            <button
              className={`hover:text-primary cursor-pointer border-none bg-transparent p-0 text-inherit transition-colors ${
                pathname === '/myalbaform' ? 'text-mint-100' : ''
              }`}
              onClick={() => router.push('/myalbaform')}
            >
              내 알바폼
            </button>
          </nav>
        </div>

        {/* 우측 영역 */}
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <button
            aria-label="메뉴 열기/닫기"
            className="relative h-24 w-24 cursor-pointer"
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
