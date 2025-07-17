import { AuthProvider } from '@/features/auth/context/AuthContext';
import InnerContainer from '@/shared/components/container/InnerContainer';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      <InnerContainer className="flex flex-col gap-48 pt-200" size="sm">
        {children}
      </InnerContainer>
    </AuthProvider>
  );
};

export default AuthLayout;
