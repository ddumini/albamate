import ErrorMessage from '@/shared/components/common/input/ErrorMessage';
import Input from '@/shared/components/common/input/Input';
import Label from '@/shared/components/common/input/Label';

interface AuthFormItemProps {
  label: string;
  type: string;
}

const AuthFormItem = ({ label, type }: AuthFormItemProps) => {
  return (
    <div className="relative mb-8 pb-26 last:mb-0">
      <Label>{label}</Label>
      <div>
        <Input type={type} variant="outlined" />
        <ErrorMessage />
      </div>
    </div>
  );
};

export default AuthFormItem;
