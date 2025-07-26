'use client';

import { useForm, UseFormReturn } from 'react-hook-form';

import type { FormConfig } from '@/features/auth/constants/formFields';
import { getFormConfig } from '@/features/auth/constants/formFields';
import type {
  AccountInfoFormData,
  AuthFormData,
  AuthPageType,
  SignInFormData,
  SignUpFormData,
  UserType,
} from '@/features/auth/types';

/**
 * useAuthForm 훅의 반환 타입 정의
 */
export interface UseAuthFormReturn<T extends AuthFormData = AuthFormData>
  extends UseFormReturn<T> {
  fields: FormConfig['fields'];
  formConfig: FormConfig;
}

/**
 * 인증 폼을 위한 타입 안전한 커스텀 훅
 *
 * @example
 * function SignInForm() {
 *   const { register, handleSubmit, errors, isValid, fields } = useAuthForm('signin');
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
export const useAuthForm = (
  pageType: AuthPageType,
  userType?: UserType
): UseAuthFormReturn => {
  const formConfig = getFormConfig(pageType, userType);

  const form = useForm<AuthFormData>({
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
 * 특정 페이지 타입에 맞는 폼 훅들 - 타입 안전성 향상
 */
export const useSignInForm = (): UseAuthFormReturn<SignInFormData> =>
  useAuthForm('signin') as UseAuthFormReturn<SignInFormData>;

export const useSignUpForm = (): UseAuthFormReturn<SignUpFormData> =>
  useAuthForm('signup') as UseAuthFormReturn<SignUpFormData>;

export const useAccountInfoForm = (
  userType?: UserType
): UseAuthFormReturn<AccountInfoFormData> =>
  useAuthForm(
    'accountInfo',
    userType
  ) as UseAuthFormReturn<AccountInfoFormData>;
