import { AUTH_ROUTES } from '@/features/auth/constants/route';
import type {
  AuthContent,
  AuthPageType,
  UserType,
} from '@/features/auth/types';

// 사용자 타입별 콘텐츠 템플릿
export const AUTH_CONTENT_TEMPLATES: Record<
  UserType,
  Record<AuthPageType, AuthContent>
> = {
  owner: {
    signin: {
      title: '사장님 로그인',
      description: [
        '아직 계정이 없으신가요?',
        '지원자 로그인은 지원자 전용 페이지에서 할 수 있습니다.',
      ],
      link: AUTH_ROUTES.SIGNUP,
      linkText: '회원가입 하기',
    },
    signup: {
      title: '사장님 회원가입',
      description: [
        '아직 계정이 없으신가요?',
        '지원자 로그인은 지원자 전용 페이지에서 할 수 있습니다.',
      ],
      link: AUTH_ROUTES.SIGNIN,
      linkText: '로그인 하기',
    },
    accountInfo: {
      title: '사장님 계정 정보',
      description: ['계정 정보를 입력해주세요.'],
    },
  },
  applicant: {
    signin: {
      title: '지원자 로그인',
      description: [
        '아직 계정이 없으신가요?',
        '사장님 로그인은 사장님 전용 페이지에서 할 수 있습니다.',
      ],
      link: AUTH_ROUTES.SIGNUP,
      linkText: '회원가입 하기',
    },
    signup: {
      title: '지원자 회원가입',
      description: [
        '이미 계정이 있으신가요?',
        '사장님 회원가입은 사장님 전용 페이지에서 할 수 있습니다.',
      ],
      link: AUTH_ROUTES.SIGNIN,
      linkText: '회원가입 하기',
    },
    accountInfo: {
      title: '지원자 계정 정보',
      description: ['계정 정보를 입력해주세요.'],
    },
  },
};

// 기본 콘텐츠 (사용자 타입이 명확하지 않을 때 - UI 개발 시 사용)
export const DEFAULT_AUTH_CONTENT: Record<AuthPageType, AuthContent> = {
  signin: {
    title: '지원자 로그인',
    description: [
      '아직 계정이 없으신가요?',
      '사장님 로그인은 사장님 전용 페이지에서 할 수 있습니다.',
    ],
    link: AUTH_ROUTES.SIGNUP,
    linkText: '회원가입 하기',
  },
  signup: {
    title: '지원자 회원가입',
    description: [
      '이미 계정이 있으신가요?',
      '사장님 로그인은 사장님 전용 페이지에서 할 수 있습니다.',
    ],
    link: AUTH_ROUTES.SIGNIN,
    linkText: '로그인 하기',
  },
  accountInfo: {
    title: '지원자 계정 정보',
    description: ['계정 정보를 입력해주세요.'],
  },
};
