'use client';

import IconInput from '@components/common/input/IconInput';
import ThemeToggle from '@components/ThemeToggle';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { useState } from 'react';

import GnbMenu from '../gnb-menu/GnbMenu';

interface MainGnbProps {
  showSearch?: boolean;
}

const MainGnb = ({ showSearch = false }: MainGnbProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { resolvedTheme } = useTheme();
  const pathname = usePathname();
  const router = useRouter();
  const isDark = resolvedTheme === 'dark';

  return (
    <header className="w-full border-b border-gray-100 px-24 md:px-72 dark:border-gray-500">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4">
        {/* 좌측 영역 */}
        <div className="flex items-center md:gap-32 lg:gap-48">
          {/* 로고 */}
          <button
            className="flex cursor-pointer items-center space-x-2 py-15 text-xl font-bold md:py-24"
            type="button"
            onClick={() => router.push('/')}
          >
            <div className="relative mr-24 h-22 w-22 md:mr-12 md:h-24 md:w-24 lg:mr-16 lg:h-36 lg:w-36">
              <Image fill alt="로고 이미지" src="/images/logo.svg" />
            </div>
            <div className="relative hidden h-24 w-124 md:flex lg:h-36 lg:w-200">
              <Image fill alt="로고 명" src="/images/logo-typo.svg" />
            </div>
          </button>

          {/* 네비게이션 메뉴 */}
          <nav className="flex gap-16 text-[14px] font-medium md:gap-24 md:text-[16px] lg:text-[20px]">
            {[
              { href: '/albalist', label: '알바 목록' },
              { href: '/albatalk', label: '알바토크' },
              { href: '/myalbaform', label: '내 알바폼' },
            ].map(({ href, label }) => (
              <button
                key={href}
                className={`hover:text-primary cursor-pointer border-none bg-transparent p-0 text-inherit transition-colors ${
                  pathname === href ? 'text-mint-100' : ''
                }`}
                type="button"
                onClick={() => router.push(href)}
              >
                {label}
              </button>
            ))}
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

      {/* 🔍 조건부 검색창 */}
      {showSearch && (
        <div className="mx-auto my-8 flex max-w-7xl justify-start px-4">
          <IconInput
            alt="검색"
            className="w-327 lg:w-728"
            iconClassName="pl-24"
            iconOnClick={() => alert('검색 버튼 클릭')}
            inputClassName="rounded-2xl lg:rounded-3xl lg:pl-68"
            placeholder="어떤 알바를 찾고 계세요?"
            src="/icons/search.svg"
          />
        </div>
      )}

      {/* 사이드 메뉴 */}
      <GnbMenu isOpen={isOpen} setIsOpen={setIsOpen} />
    </header>
  );
};

export default MainGnb;
