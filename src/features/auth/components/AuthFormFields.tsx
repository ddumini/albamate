import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';

import ErrorMessage from '@/shared/components/common/input/ErrorMessage';
import Label from '@/shared/components/common/input/Label';
import ProfileEdit from '@/shared/components/common/profile/ProfileEdit';

import type { FormField } from '../constants/formFields';
import { createTypedFormFields, validateFormFields } from '../utils/formTypes';
import AuthFormItem from './AuthFormItem';

// 파일 검증 로직 추가
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

interface AuthFormFieldsProps<T extends FieldValues> {
  fields: FormField[];
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  defaultValues?: Record<string, string>;
  setValue: UseFormSetValue<T>;
  watch: UseFormWatch<T>;
}

/**
 * 인증 폼 필드를 렌더링하는 컴포넌트
 *
 * @example
 * const fields = getFormFields('signin');
 *
 * return (
 *   <AuthFormFields<SignInFormData>
 *     fields={fields}
 *     register={register}
 *     errors={errors}
 *     defaultValues={defaultValues}
 *   />
 * );
 */
const AuthFormFields = <T extends FieldValues>({
  fields,
  register,
  errors,
  defaultValues,
  setValue,
  watch,
}: AuthFormFieldsProps<T>) => {
  const typedFields = createTypedFormFields<T>(fields);

  // defaultValues가 있을 때만 검증
  if (defaultValues && !validateFormFields<T>(typedFields, defaultValues)) {
    throw new Error('폼 필드가 스키마와 일치하지 않습니다.');
  }

  return (
    <>
      {typedFields.map(field => {
        // 이미지 타입인 경우 별도 처리
        if (field.type === 'image') {
          const fieldError = errors?.[field.name as Path<T>];
          const hasError = !!fieldError;
          const currentImageUrl = watch(field.name as Path<T>);

          return (
            <div key={field.name}>
              <Label>{field.label}</Label>
              <div className="mt-8 lg:mt-16">
                <ProfileEdit
                  imageUrl={currentImageUrl}
                  onImageChange={file => {
                    try {
                      validateImageFile(file);

                      // 파일을 FormData에 저장 (File 객체 대신 파일명 저장)
                      setValue(field.name as Path<T>, file.name as any);

                      // 미리보기 URL 생성
                      const previewUrl = URL.createObjectURL(file);
                      setValue(
                        `${field.name}Preview` as Path<T>,
                        previewUrl as any
                      );
                    } catch (error) {
                      console.error('Image validation failed:', error);
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

        // 일반/ 주소 입력 필드
        return (
          <AuthFormItem<T>
            key={field.name}
            errors={errors}
            field={field}
            label={field.label}
            name={field.name as Path<T>}
            register={register}
            setValue={setValue}
            type={field.type}
            watch={watch}
          />
        );
      })}
    </>
  );
};

export default AuthFormFields;
