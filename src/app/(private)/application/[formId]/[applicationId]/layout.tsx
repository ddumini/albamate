import InnerContainer from '@/shared/components/container/InnerContainer';

const AlbaTalkLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <InnerContainer>{children}</InnerContainer>
    </main>
  );
};

export default AlbaTalkLayout;
