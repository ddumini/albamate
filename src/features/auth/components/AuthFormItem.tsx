import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';

import ErrorMessage from '@/shared/components/common/input/ErrorMessage';
import Input from '@/shared/components/common/input/Input';
import Label from '@/shared/components/common/input/Label';
import ProfileEdit from '@/shared/components/common/profile/ProfileEdit';

// 파일 검증 로직
const validateImageFile = (file: File) => {
  const maxSize = 5 * 1024 * 1024; // 5MB
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];

  if (file.size > maxSize) {
    throw new Error('파일 크기는 5MB 이하여야 합니다.');
  }

  if (!allowedTypes.includes(file.type)) {
    throw new Error('JPG, PNG, WebP 형식만 지원됩니다.');
  }

  return true;
};

interface AuthFormItemProps<T extends FieldValues> {
  label: string;
  type: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  errors?: FieldErrors<T>;
  setValue?: UseFormSetValue<T>;
  watch?: UseFormWatch<T>;
}

const AuthFormItem = <T extends FieldValues>({
  label,
  type,
  name,
  register,
  errors,
  setValue,
  watch,
}: AuthFormItemProps<T>) => {
  const fieldError = errors?.[name];
  const hasError = !!fieldError;

  // 이미지 타입인 경우 ProfileEdit 컴포넌트 렌더링
  if (type === 'image') {
    const currentImageUrl = watch?.(name);

    return (
      <div>
        <Label>{label}</Label>
        <div className="mt-8 lg:mt-16">
          <ProfileEdit
            imageUrl={currentImageUrl}
            onImageChange={file => {
              try {
                // 파일 유효성 검사
                validateImageFile(file);

                // 파일을 FormData에 저장 (File 객체 대신 파일명 저장)
                setValue?.(name, file.name as any);

                // 미리보기 URL 생성
                const previewUrl = URL.createObjectURL(file);
                setValue?.(`${name}Preview` as Path<T>, previewUrl as any);
              } catch (error) {
                console.error('Image validation failed:', error);
                // 에러 처리 로직 추가 가능
              }
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
