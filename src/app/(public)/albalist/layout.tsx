'use client';

import MainGnb from '@components/common/gnb/MainGnb';

const AlbalistLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <MainGnb showSearch />

      <main>{children}</main>
    </div>
  );
};

export default AlbalistLayout;
