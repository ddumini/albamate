import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from 'react-hook-form';

import type { FormField } from '../constants/formFields';
import AuthFormItem from './AuthFormItem';

interface AuthFormFieldsProps<T extends FieldValues> {
  fields: FormField[];
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
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
 *   />
 * );
 */
const AuthFormFields = <T extends FieldValues>({
  fields,
  register,
  errors,
}: AuthFormFieldsProps<T>) => {
  return (
    <>
      {fields.map(field => (
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
