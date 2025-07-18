'use client';

import LandingGnb from '@common/gnb/landing-gnb';

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <LandingGnb />
      <main className="mt-48 md:mt-64 lg:mt-80">{children}</main>
    </div>
  );
};

export default PublicLayout;
