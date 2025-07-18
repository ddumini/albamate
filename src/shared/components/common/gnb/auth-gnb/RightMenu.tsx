'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import ThemeToggle from '@/shared/components/ThemeToggle';

import { navButton } from '../styles/Header.styles';

const RightMenu = () => {
  const pathname = usePathname();

  return (
    <div className="hidden items-center gap-24 md:flex">
      <nav className="mr-16 flex gap-24 text-sm font-medium md:text-md lg:text-2lg">
        <Link className={navButton(pathname === '/owner')} href="/owner">
          사장님 전용
        </Link>
        <Link className={navButton(pathname === '/worker')} href="/worker">
          지원자 전용
        </Link>
      </nav>
      <ThemeToggle />
    </div>
  );
};

export default RightMenu;
