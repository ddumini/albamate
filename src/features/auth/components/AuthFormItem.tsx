import ErrorMessage from '@/shared/components/common/input/ErrorMessage';
import Input from '@/shared/components/common/input/Input';
import Label from '@/shared/components/common/input/Label';

interface AuthFormItemProps {
  label: string;
  type: string;
}

const AuthFormItem = ({ label, type }: AuthFormItemProps) => {
  return (
    <div>
      <Label>{label}</Label>
      <div className="mt-8 lg:mt-16">
        <Input type={type} variant="outlined" />
        <ErrorMessage />
      </div>
    </div>
  );
};

export default AuthFormItem;
