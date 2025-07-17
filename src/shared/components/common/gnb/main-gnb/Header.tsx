// components/common/header/Header.tsx
'use client';

import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { useState } from 'react';

import Logo from '@/shared/components/common/gnb/main-gnb/Logo';
import NavMenu from '@/shared/components/common/gnb/main-gnb/NavMenu';
import {
  headerWrapper,
  innerWrapper,
  leftGroup,
} from '@/shared/components/common/gnb/styles/Header.styles';
import GnbMenu from '@/shared/components/common/gnb-menu/GnbMenu';

import RightMenu from './RightMenu';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { resolvedTheme } = useTheme();
  const pathname = usePathname();
  const isDark = resolvedTheme === 'dark';

  return (
    <header className={headerWrapper}>
      <div className={innerWrapper}>
        <div className={leftGroup}>
          <Logo />
          <NavMenu pathname={pathname} />
        </div>
        <RightMenu isDark={isDark} isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
      <GnbMenu isOpen={isOpen} setIsOpen={setIsOpen} />
    </header>
  );
};

export default Header;
