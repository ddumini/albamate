'use client';

import { headerWrapper, innerWrapper } from '@common/gnb/styles/Header.styles';
import { usePathname, useRouter } from 'next/navigation';

import Logo from '@/shared/components/common/gnb/Logo';

import RightMenu from './RightMenu';

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <header className={headerWrapper}>
      <div
        className={`${innerWrapper} justify-center md:justify-between md:py-3`}
      >
        {/* 좌측 로고 */}
        <div className="flex items-center md:gap-24">
          <Logo />
        </div>

        {/* 우측 */}
        <RightMenu />
      </div>
    </header>
  );
};

export default Header;
