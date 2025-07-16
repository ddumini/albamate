'use client';

import ThemeToggle from '@components/ThemeToggle';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <header className="w-full border-b border-gray-100 md:px-72 lg:px-120 dark:border-gray-500">
      <div className="mx-auto flex max-w-7xl items-center justify-center px-4 md:justify-between md:py-3">
        {/* 좌측 로고 */}
        <div className="flex items-center md:gap-24">
          <Link
            className="flex cursor-pointer items-center space-x-2 py-15 text-xl font-bold md:py-24"
            href="/"
          >
            <div className="mr-16 h-20 w-20 md:mr-12 md:h-24 md:w-24 lg:h-40 lg:w-40">
              <Image
                alt="로고 이미지"
                className="h-full w-full"
                height={40}
                src="/images/logo.svg"
                width={40}
              />
            </div>
            <div className="h-24 w-124 lg:h-36 lg:w-200">
              <Image
                alt="로고 명"
                className="h-full w-full"
                height={36}
                src="/images/logo-typo.svg"
                width={200}
              />
            </div>
          </Link>
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
  );
};

export default Header;
