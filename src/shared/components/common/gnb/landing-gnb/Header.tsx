'use client';

import Logo from '@common/gnb/Logo';
import NavMenu from '@common/gnb/NavMenu';
import {
  headerWrapper,
  innerWrapper,
  leftGroup,
} from '@common/gnb/styles/Header.styles';

import RightMenu from './RightMenu';

const Header = () => {
  return (
    <header className={headerWrapper}>
      <div className={innerWrapper}>
        <div className={leftGroup}>
          <Logo />
          <NavMenu isLandingStyle />
        </div>

        <RightMenu />
      </div>
    </header>
  );
};

export default Header;
