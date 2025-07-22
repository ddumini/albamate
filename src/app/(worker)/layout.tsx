import MainGnb from '@/shared/components/common/gnb/main-gnb';

const WorkLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <MainGnb />
      <main className="mt-52 md:mt-72 lg:mt-84">{children}</main>
    </>
  );
};
export default WorkLayout;
