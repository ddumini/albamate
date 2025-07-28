import { ReactNode } from 'react';

const MyPageLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="flex justify-center px-24 pt-20 md:px-72">{children}</main>
  );
};

export default MyPageLayout;
