import { FieldErrors, UseFormRegister } from 'react-hook-form';

import type { FormField } from '../constants/formFields';
import AuthFormItem from './AuthFormItem';

interface AuthFormFieldsProps {
  fields: FormField[];
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
}

/**
 * 인증 폼 필드를 렌더링하는 컴포넌트
 *
 * @example
 * ```typescript
 * const fields = getFormFields('signin');
 *
 * return (
 *   <AuthFormFields
 *     fields={fields}
 *     register={register}
 *     errors={errors}
 *   />
 * );
 * ```
 */
const AuthFormFields = ({ fields, register, errors }: AuthFormFieldsProps) => {
  return (
    <>
      {fields.map(field => (
        <AuthFormItem
          key={field.name}
          errors={errors}
          label={field.label}
          name={field.name}
          register={register}
          type={field.type}
        />
      ))}
    </>
  );
};

export default AuthFormFields;
