import AuthForm from '@/features/auth/components/AuthForm';
import AuthTitleArea from '@/features/auth/components/AuthTitleArea';
import InnerContainer from '@/shared/components/container/InnerContainer';

const ApplicantInfoPage = () => {
  return (
    <InnerContainer className="flex flex-col gap-48" size="sm">
      <AuthTitleArea />
      <AuthForm />
    </InnerContainer>
  );
};

export default ApplicantInfoPage;
