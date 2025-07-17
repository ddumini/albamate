import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from 'react-hook-form';

import ErrorMessage from '@/shared/components/common/input/ErrorMessage';
import Input from '@/shared/components/common/input/Input';
import Label from '@/shared/components/common/input/Label';

interface AuthFormItemProps<T extends FieldValues> {
  label: string;
  type: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  errors?: FieldErrors<T>;
}

const AuthFormItem = <T extends FieldValues>({
  label,
  type,
  name,
  register,
  errors,
}: AuthFormItemProps<T>) => {
  return (
    <div>
      <Label>{label}</Label>
      <div className="mt-8 lg:mt-16">
        <Input type={type} variant="outlined" {...register(name)} />
        <ErrorMessage
          isVisible={!!errors?.[name]}
          message={errors?.[name]?.message as string}
        />
      </div>
    </div>
  );
};

export default AuthFormItem;
