import MainGnb from '@common/gnb/main-gnb';

const OwnerLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <MainGnb />
      <main className="mt-52 md:mt-72 lg:mt-84">{children}</main>
    </>
  );
};
export default OwnerLayout;
