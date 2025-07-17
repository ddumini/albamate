'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  AUTH_CONTENT,
  AUTH_ROUTES,
  type AuthPageType,
} from '@/features/auth/constants';

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
    <div className="flex flex-col gap-16">
      <h2 className="text-2xl font-semibold text-black-500">{title}</h2>
      <p>
        {description[0]}
        {link && linkText && (
          <Link className="inline-block" href={link}>
            {linkText}
          </Link>
        )}
        {description[1] && (
          <>
            <br />
            {description[1]}
          </>
        )}
      </p>
    </div>
  );
};

export default AuthTitleArea;
