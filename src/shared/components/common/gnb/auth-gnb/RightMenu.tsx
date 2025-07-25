'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

import ThemeToggle from '@/shared/components/ThemeToggle';

import { navButton } from '../styles/Header.styles';

const RightMenu = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentType = searchParams.get('type') || '';

  // 현재 페이지가 auth 페이지인지 확인
  const isAuthPage =
    pathname.startsWith('/signin') ||
    pathname.startsWith('/signup') ||
    pathname.startsWith('/account-info');

  // 사장님/지원자 링크 생성 함수
  const createAuthLink = (type: 'owner' | 'worker') => {
    if (!isAuthPage) return `/${type}`;

    const params = new URLSearchParams(searchParams);
    params.set('type', type);
    return `${pathname}?${params.toString()}`;
  };

  // 현재 선택된 타입 확인 (기본값: worker)
  const isOwnerSelected = currentType === 'owner';
  const isWorkerSelected = currentType === 'worker' || currentType === '';

  return (
    <div className="ml-auto flex items-center gap-24">
      <nav className="flex gap-24 text-sm font-medium md:text-md lg:text-2lg">
        <Link
          className={navButton(isOwnerSelected)}
          href={createAuthLink('owner')}
        >
          사장님 전용
        </Link>
        <Link
          className={navButton(isWorkerSelected)}
          href={createAuthLink('worker')}
        >
          지원자 전용
        </Link>
      </nav>
      <ThemeToggle />
    </div>
  );
};

export default RightMenu;
