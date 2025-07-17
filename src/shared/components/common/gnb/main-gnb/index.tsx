'use client';

import GnbMenu from '@common/gnb-menu/GnbMenu';
import { useState } from 'react';

import Header from './Header';

const MainGnb = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Header isOpen={isOpen} setIsOpen={setIsOpen} />
      <GnbMenu isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default MainGnb;
