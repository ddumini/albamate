import MainGnb from '@common/gnb/main-gnb';
import { ReactNode } from 'react';

import ModalManager from '@/shared/components/common/modal/ModalManager';
import InnerContainer from '@/shared/components/container/InnerContainer';

const MyPageLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main>
      <MainGnb />
      <InnerContainer>{children}</InnerContainer>
      <ModalManager />
    </main>
  );
};

export default MyPageLayout;
