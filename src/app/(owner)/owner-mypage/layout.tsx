import MainGnb from '@common/gnb/main-gnb';
import { ReactNode } from 'react';

const MyPageLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <MainGnb />
      <main className="flex justify-center px-24 pt-85 md:px-72">
        {children}
      </main>
    </>
  );
};

export default MyPageLayout;
