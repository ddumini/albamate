'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  AUTH_ROUTES,
  type AuthPageType,
  getAuthContentFromPath,
} from '@/features/auth/constants';

const AuthTitleArea = () => {
  const pathname = usePathname();

  const getAuthPageType = (pathname: string): AuthPageType => {
    switch (pathname) {
      case AUTH_ROUTES.SIGNIN:
        return 'signin';
      case AUTH_ROUTES.SIGNUP:
        return 'signup';
      case AUTH_ROUTES.ACCOUNT_INFO:
        return 'accountInfo';
      default:
        return 'signin';
    }
  };

  const authPageType = getAuthPageType(pathname);
  const { title, description, link, linkText } = getAuthContentFromPath(
    pathname,
    authPageType
  );

  return (
    <div className="flex flex-col gap-16 text-center">
      <h2 className="text-2xl font-semibold text-black-500">
        로그인
        <span className="sr-only">{title}</span>
      </h2>
      <p className="font-regular text-xs text-black-100">
        {description[0]}
        {link && linkText && (
          <Link
            className="ml-8 inline-block font-semibold text-black-400 underline hover:text-black-500"
            href={link}
          >
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
