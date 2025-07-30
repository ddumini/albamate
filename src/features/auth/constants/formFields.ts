import {
  applicantAccountInfoSchema,
  applicantSignupSchema,
  ownerAccountInfoSchema,
  ownerSignupSchema,
  signInSchema,
} from '../schema/auth.schema';
import type { AuthPageType, UserType } from '../types';

// 폼 필드 타입 정의
export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'tel' | 'number' | 'image';
  required?: boolean;
  placeholder?: string;
}

// 폼 구성 타입 정의
export interface FormConfig {
  fields: FormField[];
  defaultValues: Record<string, string>;
  validationSchema: any; // Zod 스키마로 변경
}

/**
 * 로그인 폼 필드 구성
 */
const SIGNIN_FIELDS: FormField[] = [
  {
    name: 'email',
    label: '이메일',
    type: 'email',
    required: true,
    placeholder: '이메일을 입력해주세요',
  },
  {
    name: 'password',
    label: '비밀번호',
    type: 'password',
    required: true,
    placeholder: '비밀번호를 입력해주세요',
  },
];

/**
 * 지원자 회원가입 폼 필드 구성
 */
const APPLICANT_SIGNUP_FIELDS: FormField[] = [
  {
    name: 'email',
    label: '이메일',
    type: 'email',
    required: true,
    placeholder: '이메일을 입력해주세요',
  },
  {
    name: 'password',
    label: '비밀번호',
    type: 'password',
    required: true,
    placeholder: '비밀번호를 입력해주세요',
  },
  {
    name: 'passwordConfirmation',
    label: '비밀번호 확인',
    type: 'password',
    required: true,
    placeholder: '비밀번호를 다시 입력해주세요',
  },
];

/**
 * 사장님 회원가입 폼 필드 구성
 */
const OWNER_SIGNUP_FIELDS: FormField[] = [
  {
    name: 'email',
    label: '이메일',
    type: 'email',
    required: true,
    placeholder: '이메일을 입력해주세요',
  },
  {
    name: 'password',
    label: '비밀번호',
    type: 'password',
    required: true,
    placeholder: '비밀번호를 입력해주세요',
  },
  {
    name: 'passwordConfirmation',
    label: '비밀번호 확인',
    type: 'password',
    required: true,
    placeholder: '비밀번호를 다시 입력해주세요',
  },
];

/**
 * 지원자 계정 정보 폼 필드 구성 (회원가입 두 번째 단계)
 */
const APPLICANT_ACCOUNT_FIELDS: FormField[] = [
  {
    name: 'imageUrl',
    label: '프로필 이미지',
    type: 'image',
    required: false,
    placeholder: '프로필 이미지를 선택해주세요',
  },
  {
    name: 'name',
    label: '이름',
    type: 'text',
    required: true,
    placeholder: '이름을 입력해주세요',
  },
  {
    name: 'phoneNumber',
    label: '연락처',
    type: 'tel',
    required: true,
    placeholder: '연락처를 입력해주세요',
  },
  {
    name: 'nickname',
    label: '닉네임',
    type: 'text',
    required: true,
    placeholder: '닉네임을 입력해주세요',
  },
];

/**
 * 사장님 계정 정보 폼 필드 구성 (회원가입 두 번째 단계)
 */
const OWNER_ACCOUNT_FIELDS: FormField[] = [
  {
    name: 'nickname',
    label: '닉네임',
    type: 'text',
    required: true,
    placeholder: '닉네임을 입력해주세요',
  },
  {
    name: 'storeName',
    label: '가게 이름',
    type: 'text',
    required: true,
    placeholder: '가게 이름을 입력해주세요',
  },
  {
    name: 'storePhoneNumber',
    label: '가게 전화번호',
    type: 'tel',
    required: true,
    placeholder: '가게 전화번호를 입력해주세요',
  },
  {
    name: 'ownerPhoneNumber',
    label: '사장님 전화번호',
    type: 'tel',
    required: false,
    placeholder: '사장님 전화번호를 입력해주세요 (선택사항)',
  },
  {
    name: 'location',
    label: '가게 위치',
    type: 'text',
    required: true,
    placeholder: '가게 위치를 입력해주세요',
  },
];

/**
 * 폼 필드 구성을 가져오는 함수
 *
 * @example
 * // 로그인 폼 필드 가져오기
 * const signinFields = getFormFields('signin');
 *
 * // 사장님 계정 정보 폼 필드 가져오기
 * const ownerFields = getFormFields('accountInfo', 'owner');
 *
 * // 지원자 계정 정보 폼 필드 가져오기
 * const applicantFields = getFormFields('accountInfo', 'applicant');
 */
export const getFormFields = (
  pageType: AuthPageType,
  userType?: UserType
): FormField[] => {
  switch (pageType) {
    case 'signin':
      return SIGNIN_FIELDS;
    case 'signup':
      return userType === 'owner'
        ? OWNER_SIGNUP_FIELDS
        : APPLICANT_SIGNUP_FIELDS;
    case 'accountInfo':
      return userType === 'owner'
        ? OWNER_ACCOUNT_FIELDS
        : APPLICANT_ACCOUNT_FIELDS;
    default:
      return [];
  }
};

/**
 * 폼 기본값을 생성하는 함수
 *
 * @example
 * const defaultValues = getFormDefaultValues('signin');
 * const ownerDefaults = getFormDefaultValues('accountInfo', 'owner');
 */
export const getFormDefaultValues = (
  pageType: AuthPageType,
  userType?: UserType
): Record<string, string> => {
  const fields = getFormFields(pageType, userType);
  const defaultValues: Record<string, string> = {};

  fields.forEach(field => {
    // 이미지 필드는 빈 문자열로 설정 (null 대신)
    defaultValues[field.name] = '';
  });

  return defaultValues;
};

/**
 * 폼 유효성 검사 스키마를 생성하는 함수 (Zod 스키마 사용)
 *
 * @example
 * const validationSchema = getFormValidationSchema('signin');
 * const ownerValidation = getFormValidationSchema('accountInfo', 'owner');
 */
export const getFormValidationSchema = (
  pageType: AuthPageType,
  userType?: UserType
): any => {
  switch (pageType) {
    case 'signin':
      return signInSchema;
    case 'signup':
      return userType === 'owner' ? ownerSignupSchema : applicantSignupSchema;
    case 'accountInfo':
      return userType === 'owner'
        ? ownerAccountInfoSchema
        : applicantAccountInfoSchema;
    default:
      return {};
  }
};

/**
 * 통합 폼 구성을 가져오는 함수
 *
 * @example
 * const formConfig = getFormConfig('signin');
 * const ownerFormConfig = getFormConfig('accountInfo', 'owner');
 */
export const getFormConfig = (
  pageType: AuthPageType,
  userType?: UserType
): FormConfig => {
  const fields = getFormFields(pageType, userType);
  const defaultValues = getFormDefaultValues(pageType, userType);
  const validationSchema = getFormValidationSchema(pageType, userType);

  return {
    fields,
    defaultValues,
    validationSchema,
  };
};
