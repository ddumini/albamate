'use client';

import ThemeToggle from '@components/ThemeToggle';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

import MobileNav from './MobileNav';

const AuthGnb = () => {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = theme === 'dark';
  const isDarkLogo = isDark ? '/logos/logo-dark.svg' : '/logos/logo.svg';
  const isDarkSymbol = isDark ? '/logos/symbol-dark.svg' : '/logos/symbol.svg';

  return (
    <>
      {/* 상단 헤더 */}
      <header className="w-full border-b border-gray-400 md:px-72 lg:px-120 dark:border-gray-500">
        <div className="mx-auto flex max-w-7xl items-center justify-center px-4 md:justify-between md:py-3">
          {/* 좌측 로고 */}
          <div className="flex items-center md:gap-24">
            <button
              className="flex cursor-pointer items-center space-x-2 py-15 text-xl font-bold md:py-24"
              type="button"
              onClick={() => router.push('/')}
            >
              <div className="relative mr-16 h-20 w-20 md:mr-12 md:h-24 md:w-24 lg:h-40 lg:w-40">
                <Image fill alt="로고 이미지" src={isDarkSymbol} />
              </div>
              <div className="relative h-24 w-124 lg:h-36 lg:w-200">
                <Image fill alt="로고 명" src={isDarkLogo} />
              </div>
            </button>
          </div>

          {/* 우측 (데스크탑용) */}
          <div className="hidden items-center gap-24 md:flex">
            <nav className="text-16 mr-16 flex gap-24 font-medium md:text-xs lg:text-sm lg:text-[20px]">
              <button
                className={`hover:text-primary cursor-pointer border-none bg-transparent p-0 text-inherit transition-colors ${
                  pathname === '/owner' ? 'text-mint-100' : ''
                }`}
                type="button"
                onClick={() => router.push('/owner')}
              >
                사장님 전용
              </button>
              <button
                className={`hover:text-primary cursor-pointer border-none bg-transparent p-0 text-inherit transition-colors ${
                  pathname === '/worker' ? 'text-mint-100' : ''
                }`}
                type="button"
                onClick={() => router.push('/worker')}
              >
                지원자 전용
              </button>
            </nav>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* 모바일 전용 메뉴 */}
      <MobileNav />
    </>
  );
};

export default AuthGnb;
