import type { FormField } from '../constants/formFields';
import type {
  AccountInfoFormData,
  AuthPageType,
  FormDataByPageType,
  SignInFormData,
  SignUpFormData,
  UserType,
} from '../types';

/**
 * 폼 필드 이름을 타입 안전하게 추출하는 유틸리티 타입
 */
export type FormFieldName<T> = T extends Record<string, any> ? keyof T : never;

/**
 * 특정 폼 타입에 대한 필드 이름들
 */
export type SignInFieldName = FormFieldName<SignInFormData>;
export type SignUpFieldName = FormFieldName<SignUpFormData>;
export type AccountInfoFieldName = FormFieldName<AccountInfoFormData>;

/**
 * 폼 필드가 특정 폼 데이터 타입과 호환되는지 확인하는 함수
 */
export const validateFormFields = <T extends Record<string, any>>(
  fields: FormField[],
  formData: T
): fields is Array<FormField & { name: keyof T }> => {
  return fields.every(field => field.name in formData);
};

/**
 * 페이지 타입과 사용자 타입에 따른 폼 데이터 타입을 반환하는 함수
 */
export const getFormDataType = (
  pageType: AuthPageType,
  userType?: UserType
): keyof FormDataByPageType => {
  switch (pageType) {
    case 'signin':
      return 'signin';
    case 'signup':
      return 'signup';
    case 'accountInfo':
      return 'accountInfo';
    default:
      return 'signin';
  }
};

/**
 * 폼 필드의 타입 안전성을 보장하는 유틸리티
 */
export const createTypedFormFields = <T extends Record<string, any>>(
  fields: FormField[]
): Array<FormField & { name: keyof T }> => {
  return fields as Array<FormField & { name: keyof T }>;
};
