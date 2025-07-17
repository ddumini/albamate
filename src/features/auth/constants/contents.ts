import { AUTH_ROUTES } from './route';

export type AuthPageType = 'signin' | 'signup' | 'applicantInfo';

export interface AuthContent {
  title: string;
  description: string[];
  link?: string;
  linkText?: string;
}

export const AUTH_CONTENT: Record<AuthPageType, AuthContent> = {
  signin: {
    title: '로그인',
    description: [
      '아직 계정이 없으신가요?',
      '사장님 로그인은 사장님 전용 페이지에서 할 수 있습니다.',
    ],
    link: AUTH_ROUTES.SIGNUP,
    linkText: '회원가입 하기',
  },
  signup: {
    title: '회원가입',
    description: [
      '이미 계정이 있으신가요?',
      '사장님 회원가입은 사장님 전용 페이지에서 할 수 있습니다.',
    ],
    link: AUTH_ROUTES.SIGNIN,
    linkText: '로그인 하기',
  },
  applicantInfo: {
    title: '지원자 정보 입력',
    description: ['추가 정보를 입력하여 회원가입을 완료해주세요.'],
  },
};
