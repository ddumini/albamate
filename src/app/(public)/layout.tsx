'use client';

import MainGnb from '@/shared/components/common/gnb/main-gnb';

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <MainGnb />
      <main>{children}</main>
    </div>
  );
};

export default PublicLayout;
