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
 * 컴파일 타임에 타입 검증을 수행하고, 런타임에는 기본적인 구조 검증만 수행
 */
export const createTypedFormFields = <T extends Record<string, any>>(
  fields: FormField[]
): Array<FormField & { name: keyof T }> => {
  // 런타임에 기본적인 구조 검증
  if (!Array.isArray(fields) || fields.length === 0) {
    throw new Error('Form fields must be a non-empty array');
  }

  // 각 필드의 기본 구조 검증
  for (const field of fields) {
    if (!field.name || typeof field.name !== 'string') {
      throw new Error('Each form field must have a valid name property');
    }
    if (!field.label || typeof field.label !== 'string') {
      throw new Error('Each form field must have a valid label property');
    }
    if (
      !field.type ||
      !['text', 'email', 'password', 'tel', 'number'].includes(field.type)
    ) {
      throw new Error('Each form field must have a valid type property');
    }
  }

  return fields as Array<FormField & { name: keyof T }>;
};

/**
 * 타입 안전한 폼 필드 생성 함수 (더 엄격한 버전)
 * 실제 폼 데이터 타입과 필드 이름이 일치하는지 컴파일 타임에 검증
 */
export const createStrictlyTypedFormFields = <T extends Record<string, any>>(
  fields: Array<FormField & { name: keyof T }>
): Array<FormField & { name: keyof T }> => {
  // 기본 구조 검증
  if (!Array.isArray(fields) || fields.length === 0) {
    throw new Error('Form fields must be a non-empty array');
  }

  return fields;
};

/**
 * 폼 필드와 폼 데이터 타입의 호환성을 검증하는 함수
 * 개발 시에만 사용하여 타입 안전성을 확인
 */
export const validateFormCompatibility = <T extends Record<string, any>>(
  fields: FormField[],
  formDataKeys: (keyof T)[]
): boolean => {
  const fieldNames = fields.map(field => field.name);
  const missingFields = formDataKeys.filter(
    key => !fieldNames.includes(key as string)
  );
  const extraFields = fieldNames.filter(
    name => !formDataKeys.includes(name as keyof T)
  );

  if (missingFields.length > 0) {
    console.warn(`Missing form fields: ${missingFields.join(', ')}`);
  }
  if (extraFields.length > 0) {
    console.warn(`Extra form fields: ${extraFields.join(', ')}`);
  }

  return missingFields.length === 0 && extraFields.length === 0;
};
