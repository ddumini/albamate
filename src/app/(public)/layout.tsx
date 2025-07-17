'use client';

import MainGnb from '@components/common/gnb/MainGnb';

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <MainGnb />
      <main>{children}</main>
    </div>
  );
};

export default PublicLayout;
