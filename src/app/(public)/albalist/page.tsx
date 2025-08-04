import { auth } from '@/auth';
import AlbaListPage from '@/features/albalist/components/AlbaListPage';
import InnerContainer from '@/shared/components/container/InnerContainer';

const Page = async () => {
  const session = await auth();

  return (
    <InnerContainer size="md">
      <AlbaListPage session={session} />
    </InnerContainer>
  );
};

export default Page;
