'use client';

import { useForm } from 'react-hook-form';

import { getFormConfig } from '@/features/auth/constants/formFields';
import type { AuthPageType, UserType } from '@/features/auth/types';

/**
 * 인증 폼을 위한 타입 안전한 커스텀 훅
 *
 * @example

 * function SignInForm() {
 *   const { register, handleSubmit, errors, isValid } = useAuthForm('signin');
 *
 *   const onSubmit = (data: SignInFormData) => {
 *     // data는 타입 안전함
 *     console.log(data.email, data.password);
 *   };
 *
 *   return (
 *     <form onSubmit={handleSubmit(onSubmit)}>
 *       <AuthFormFields<SignInFormData>
 *         fields={fields}
 *         register={register}
 *         errors={errors}
 *       />
 *     </form>
 *   );
 * }
 */
export const useAuthForm = (pageType: AuthPageType, userType?: UserType) => {
  const formConfig = getFormConfig(pageType, userType);

  const form = useForm({
    mode: 'onChange',
    defaultValues: formConfig.defaultValues,
  });

  return {
    ...form,
    fields: formConfig.fields,
    formConfig,
  };
};

/**
 * 특정 페이지 타입에 맞는 폼 훅들
 */
export const useSignInForm = () => useAuthForm('signin');
export const useSignUpForm = () => useAuthForm('signup');
export const useAccountInfoForm = (userType?: UserType) =>
  useAuthForm('accountInfo', userType);
