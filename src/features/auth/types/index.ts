export type AuthPageType = 'signin' | 'signup' | 'accountInfo';
export type UserType = 'owner' | 'applicant';

export interface AuthContent {
  title: string;
  description: string[];
  link?: string;
  linkText?: string;
}
