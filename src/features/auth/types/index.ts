export type AuthPageType = 'signin' | 'signup' | 'accountInfo';
export type UserType = 'owner' | 'applicant';

export interface AuthContent {
  title: string;
  description: string[];
  link?: string;
  linkText?: string;
}

export type UserRole = 'OWNER' | 'APPLICANT';

export interface User {
  email: string;
  password: string;
  name: string;
  nickname: string;
  role: UserRole;
  storeName?: string;
  storePhoneNumber?: string;
  ownerPhoneNumber?: string;
  phoneNumber?: string;
  location?: string;
  imageUrl?: string;
}

// 폼 데이터 타입 정의 (프론트엔드 폼용)
export interface SignInFormData {
  email: string;
  password: string;
}

/**
 * 회원가입 첫 단계 폼 데이터 타입 (사장님과 지원자 모두 동일)
 */
export interface SignUpStep1FormData {
  email: string;
  password: string;
  passwordConfirmation: string; // confirmPassword → passwordConfirmation으로 수정
}

/**
 * 지원자 계정 정보 폼 데이터 타입 (회원가입 두 번째 단계)
 */
export interface ApplicantAccountInfoFormData {
  imageUrl?: string;
  name: string;
  phoneNumber: string;
  nickname: string;
}

/**
 * 사장님 계정 정보 폼 데이터 타입 (회원가입 두 번째 단계)
 */
export interface OwnerAccountInfoFormData {
  nickname: string;
  storeName: string;
  storePhoneNumber: string;
  ownerPhoneNumber?: string;
  location: string;
}

/**
 * 통합 계정 정보 폼 데이터 타입
 */
export type AccountInfoFormData =
  | ApplicantAccountInfoFormData
  | OwnerAccountInfoFormData;

/**
 * 통합 회원가입 폼 데이터 타입 (첫 단계만)
 */
export type SignUpFormData = SignUpStep1FormData;

export type AuthFormData =
  | SignInFormData
  | SignUpFormData
  | AccountInfoFormData;

// 폼 타입별 매핑
export type FormDataByPageType = {
  signin: SignInFormData;
  signup: SignUpFormData;
  accountInfo: AccountInfoFormData;
};

/**
 * 페이지 타입에 따른 폼 데이터 타입을 추출하는 유틸리티 타입
 */
export type FormDataForPage<T extends AuthPageType> = FormDataByPageType[T];
