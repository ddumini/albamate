import AuthForm from '@/features/auth/components/AuthForm';
import AuthSns from '@/features/auth/components/AuthSns';
import AuthTitleArea from '@/features/auth/components/AuthTitleArea';
import { AuthProvider } from '@/features/auth/context/AuthContext';
import InnerContainer from '@/shared/components/container/InnerContainer';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      <main>
        <InnerContainer
          className="flex flex-col gap-48 pt-94 md:pt-130 lg:pt-200"
          size="sm"
        >
          <AuthTitleArea />
          {children}
          <AuthForm />
          <AuthSns />
        </InnerContainer>
      </main>
    </AuthProvider>
  );
};

export default AuthLayout;
