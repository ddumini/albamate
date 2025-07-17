'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// 상수 분리
const AUTH_ROUTES = {
  SIGNIN: '/signin',
  SIGNUP: '/signup',
  APPLICANT_INFO: '/applicant-info',
} as const;

// 타입 정의 개선
type AuthPageType = 'signin' | 'signup' | 'applicantInfo';

interface AuthContent {
  title: string;
  description: string;
  link?: string;
  linkText?: string;
}

// 상수 객체로 분리 (성능 최적화)
const AUTH_CONTENT: Record<AuthPageType, AuthContent> = {
  signin: {
    title: '로그인',
    description: '아직 계정이 없으신가요?',
    link: AUTH_ROUTES.SIGNUP,
    linkText: '회원가입 하기',
  },
  signup: {
    title: '회원가입',
    description: '이미 계정이 있으신가요?',
    link: AUTH_ROUTES.SIGNIN,
    linkText: '로그인 하기',
  },
  applicantInfo: {
    title: '지원자 정보 입력',
    description: '추가 정보를 입력하여 회원가입을 완료해주세요.',
  },
} as const;

const AuthTitleArea = () => {
  const pathname = usePathname();

  // 경로 매핑 함수
  const getAuthPageType = (pathname: string): AuthPageType => {
    switch (pathname) {
      case AUTH_ROUTES.SIGNIN:
        return 'signin';
      case AUTH_ROUTES.SIGNUP:
        return 'signup';
      case AUTH_ROUTES.APPLICANT_INFO:
        return 'applicantInfo';
      default:
        return 'signin';
    }
  };

  const authPageType = getAuthPageType(pathname);
  const { title, description, link, linkText } = AUTH_CONTENT[authPageType];

  return (
    <div>
      <h2>{title}</h2>
      <p>{description}</p>
      {link && linkText && <Link href={link}>{linkText}</Link>}
    </div>
  );
};

export default AuthTitleArea;
