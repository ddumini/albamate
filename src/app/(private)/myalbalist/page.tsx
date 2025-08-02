import { redirect } from 'next/navigation';

import { auth } from '@/auth';
import MyAlbaList from '@/features/myalbalist/components/MyAlbaList';
import InnerContainer from '@/shared/components/container/InnerContainer';

const MyAlbaListPage = async () => {
  const session = await auth();

  if (!session?.user) {
    redirect('/signin');
  }

  return (
    <InnerContainer size="md">
      <MyAlbaList userRole={session.user.role} />
    </InnerContainer>
  );
};

export default MyAlbaListPage;
