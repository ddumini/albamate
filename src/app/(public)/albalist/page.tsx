import AlbaListPage from '@/features/albalist/components/AlbaListPage';
import InnerContainer from '@/shared/components/container/InnerContainer';

const Page = () => {
  return (
    <InnerContainer className="md:max-w-900" size="lg">
      <AlbaListPage />
    </InnerContainer>
  );
};

export default Page;
