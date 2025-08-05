import { ReactNode } from 'react';

import { auth } from '@/auth';
import { SessionInitializer } from '@/features/mypage/components/SessionInItializer';

const MyPageLayout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  return (
    <main className="flex justify-center px-24 pt-20 md:px-72">
      <SessionInitializer session={session?.user ?? null} />
      {children}
    </main>
  );
};

export default MyPageLayout;
