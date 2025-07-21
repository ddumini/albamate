import InnerContainer from '@/shared/components/container/InnerContainer';

const MyApplyLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <main>
        <InnerContainer>{children}</InnerContainer>
      </main>
    </div>
  );
};

export default MyApplyLayout;
