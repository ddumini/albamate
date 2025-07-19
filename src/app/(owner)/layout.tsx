import MainGnb from '@/shared/components/common/gnb/main-gnb';
import ModalManager from '@/shared/components/common/modal/ModalManager';

const OwnerLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <MainGnb />
      <main className="mt-52 md:mt-72 lg:mt-84">{children}</main>
      <ModalManager />
    </>
  );
};
export default OwnerLayout;
