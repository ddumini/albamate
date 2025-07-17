import PrimaryButton from '@/shared/components/common/button/PrimaryButton';

interface AuthButtonProps {
  type: 'signin' | 'signup';
}

const AuthButton = ({ type }: AuthButtonProps) => {
  const buttonText = type === 'signin' ? '로그인' : '회원가입';

  return (
    <PrimaryButton
      responsiveLabel
      className="p-2"
      label={buttonText}
      type="button"
      variant="solid"
    />
  );
};

export default AuthButton;
