import AuthTitleArea from '@/features/auth/components/AuthTitleArea';
import { AuthProvider } from '@/features/auth/context/AuthContext';
import AuthGnb from '@/shared/components/common/gnb/auth-gnb';
import InnerContainer from '@/shared/components/container/InnerContainer';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      <AuthGnb />
      <main>
        <InnerContainer
          className="flex flex-col gap-48 pt-94 md:pt-130 lg:pt-200"
          size="sm"
        >
          <AuthTitleArea />
          {children}
        </InnerContainer>
      </main>
    </AuthProvider>
  );
};

export default AuthLayout;
