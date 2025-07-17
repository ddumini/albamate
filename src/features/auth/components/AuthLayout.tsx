import AuthForm from '@/features/auth/components/AuthForm';
import AuthSns from '@/features/auth/components/AuthSns';
import AuthTitleArea from '@/features/auth/components/AuthTitleArea';
import InnerContainer from '@/shared/components/container/InnerContainer';

const AuthLayout = () => {
  return (
    <InnerContainer className="flex flex-col gap-48 pt-200" size="sm">
      <AuthTitleArea />
      <AuthForm />
      <AuthSns />
    </InnerContainer>
  );
};

export default AuthLayout;
