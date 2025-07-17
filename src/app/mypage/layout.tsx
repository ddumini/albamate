import MainGnb from '@common/gnb/main-gnb';
import { ReactNode } from 'react';

const MyPageLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main>
      <MainGnb />
      {children}
    </main>
  );
};

export default MyPageLayout;
