'use client';

import Logo from '@components/common/gnb/MainGnb/Logo';
import NavMenu from '@components/common/gnb/MainGnb/NavMenu';
import GnbMenu from '@components/common/gnb-menu/GnbMenu';
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
    <header className="w-full border-b border-gray-100 px-24 md:px-72 dark:border-gray-500">
      <div className="mx-auto flex max-w-1479 items-center justify-between px-4">
        <div className="flex items-center md:gap-32 lg:gap-48">
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
