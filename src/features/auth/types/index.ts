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
