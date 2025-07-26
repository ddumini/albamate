import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from 'react-hook-form';

import type { FormField } from '../constants/formFields';
import { createTypedFormFields, validateFormFields } from '../utils/formTypes';
import AuthFormItem from './AuthFormItem';

interface AuthFormFieldsProps<T extends FieldValues> {
  fields: FormField[];
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  defaultValues?: Record<string, string>; // 선택적 prop으로 변경
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
}: AuthFormFieldsProps<T>) => {
  const typedFields = createTypedFormFields<T>(fields);

  // defaultValues가 있을 때만 검증
  if (defaultValues && !validateFormFields<T>(typedFields, defaultValues)) {
    throw new Error('폼 필드가 스키마와 일치하지 않습니다.');
  }

  return (
    <>
      {typedFields.map(field => (
        <AuthFormItem<T>
          key={field.name}
          errors={errors}
          label={field.label}
          name={field.name as Path<T>}
          register={register}
          type={field.type}
        />
      ))}
    </>
  );
};

export default AuthFormFields;
