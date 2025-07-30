import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from 'react-hook-form';

import ErrorMessage from '@/shared/components/common/input/ErrorMessage';
import Input from '@/shared/components/common/input/Input';
import Label from '@/shared/components/common/input/Label';
import ProfileEdit from '@/shared/components/common/profile/ProfileEdit';

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
  const fieldError = errors?.[name];
  const hasError = !!fieldError;

  // 이미지 타입인 경우 ProfileEdit 컴포넌트 렌더링
  if (type === 'image') {
    return (
      <div>
        <Label>{label}</Label>
        <div className="mt-8 lg:mt-16">
          <ProfileEdit
            onImageChange={file => {
              // 파일을 FormData에 설정하는 로직
              console.log('Image selected:', file);
            }}
          />
          <ErrorMessage
            isVisible={hasError}
            message={fieldError?.message as string}
          />
        </div>
      </div>
    );
  }

  // 일반 입력 필드 렌더링
  return (
    <div>
      <Label>{label}</Label>
      <div className="mt-8 lg:mt-16">
        <Input
          isInvalid={hasError}
          type={type}
          variant="outlined"
          {...register(name)}
        />
        <ErrorMessage
          isVisible={hasError}
          message={fieldError?.message as string}
        />
      </div>
    </div>
  );
};

export default AuthFormItem;
