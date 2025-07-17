'use client';

import Logo from '@common/gnb/main-gnb/Logo';
import NavMenu from '@common/gnb/main-gnb/NavMenu';
import {
  headerWrapper,
  innerWrapper,
  leftGroup,
} from '@common/gnb/styles/Header.styles';
import GnbMenu from '@common/gnb-menu/GnbMenu';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { useState } from 'react';

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
