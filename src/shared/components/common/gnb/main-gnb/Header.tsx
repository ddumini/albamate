'use client';

import Logo from '@common/gnb/Logo';
import NavMenu from '@common/gnb/main-gnb/NavMenu';
import {
  headerWrapper,
  innerWrapper,
  leftGroup,
} from '@common/gnb/styles/Header.styles';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';

import RightMenu from './RightMenu';

interface HeaderProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const Header = ({ isOpen, setIsOpen }: HeaderProps) => {
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
    </header>
  );
};

export default Header;
