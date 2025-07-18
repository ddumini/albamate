import AlbaListPage from '@/features/albalist/components/AlbaListPage';
import InnerContainer from '@/shared/components/container/InnerContainer';

const Page = () => {
  return (
    <InnerContainer
      className="md:max-w-900 lg:max-w-1600"
      size="lg"
      tabletSize="md"
    >
      <AlbaListPage />
    </InnerContainer>
  );
};

export default Page;
