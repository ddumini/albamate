import MainGnb from '@common/gnb/main-gnb';
import { ReactNode } from 'react';

import ModalManager from '@/shared/components/common/modal/ModalManager';

const MyPageLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <MainGnb />
      <main className="flex justify-center px-24 pt-85 md:px-72">
        {children}
        <ModalManager />
      </main>
    </>
  );
};

export default MyPageLayout;
