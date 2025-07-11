'use client';

import ThemeToggle from '@components/ThemeToggle';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const AuthGnb = () => {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <header className="w-full border-b border-gray-200 px-12 md:px-32 dark:border-gray-500">
      <div className="mx-auto flex max-w-7xl items-center justify-center px-4 md:justify-between md:py-3">
        {/* 좌측 영역 */}
        <div className="flex items-center md:gap-24">
          {/* 로고 */}
          <button
            className="flex items-center space-x-2 text-xl font-bold"
            onClick={() => router.push('/')}
          >
            <div className="relative mr-8 h-16 w-16 md:mr-6 md:h-24 md:w-24">
              <Image fill alt="로고 이미지" src="/images/logo.svg" />
            </div>
            <div className="relative h-24 w-70 md:h-40 md:w-100">
              <Image fill alt="로고 명" src="/images/logo-typo.svg" />
            </div>
          </button>
        </div>

        {/* 우측 영역 */}
        <div className="hidden items-center gap-4 md:flex">
          {/* 네비게이션 메뉴 */}
          <nav className="mr-16 flex gap-12 text-xs font-medium md:text-xs lg:text-sm">
            <button
              className={`hover:text-primary cursor-pointer border-none bg-transparent p-0 text-inherit transition-colors ${
                pathname === '/owner' ? 'text-mint-100' : ''
              }`}
              onClick={() => router.push('/owner')}
            >
              사장님 전용
            </button>
            <button
              className={`hover:text-primary cursor-pointer border-none bg-transparent p-0 text-inherit transition-colors ${
                pathname === '/worker' ? 'text-mint-100' : ''
              }`}
              onClick={() => router.push('/worker')}
            >
              지원자 전용
            </button>
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default AuthGnb;
