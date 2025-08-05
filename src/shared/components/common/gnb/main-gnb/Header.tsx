'use client';

import Logo from '@common/gnb/Logo';
import NavMenu from '@common/gnb/NavMenu';
import {
  headerWrapper,
  innerWrapper,
  leftGroup,
} from '@common/gnb/styles/Header.styles';
import { useTheme } from 'next-themes';

import RightMenu from './RightMenu';

interface HeaderProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const Header = ({ isOpen, setIsOpen }: HeaderProps) => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  return (
    <header className={headerWrapper}>
      <div className={innerWrapper}>
        <div className={leftGroup}>
          <Logo />
          <NavMenu
            items={[
              { href: '/albalist', label: '알바 목록' },
              { href: '/albatalk', label: '알바토크' },
              { href: '/myalbalist', label: '내 알바폼' },
            ]}
          />
        </div>
        <RightMenu isDark={isDark} isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
    </header>
  );
};

export default Header;
