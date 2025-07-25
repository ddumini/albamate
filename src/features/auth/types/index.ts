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
  phoneNumber?: string;
  location?: string;
}

// 폼 데이터 타입 정의
export interface SignInFormData {
  email: string;
  password: string;
}

export interface SignUpFormData {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  nickname: string;
  phoneNumber: string;
}

export interface ApplicantAccountInfoFormData {
  name: string;
  nickname: string;
  phoneNumber: string;
  location: string;
}

export interface OwnerAccountInfoFormData extends ApplicantAccountInfoFormData {
  storeName: string;
  storePhoneNumber: string;
}

export type AccountInfoFormData =
  | ApplicantAccountInfoFormData
  | OwnerAccountInfoFormData;
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
