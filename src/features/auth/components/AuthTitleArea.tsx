'use client';
import Link from 'next/link';
import { useContext } from 'react';

import { createAuthRoute } from '@/features/auth/constants/route';
import { AuthContext } from '@/features/auth/context/AuthContextValue';

const AuthTitleArea = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    return null;
  }

  const { authContent, userType, authPageType } = authContext;
  const { title, description, linkText } = authContent;

  // 현재 사용자 타입을 유지하면서 다른 페이지로 이동하는 링크 생성
  const getDynamicLink = () => {
    if (!userType) return authContent.link || '/signin';

    switch (authPageType) {
      case 'signin':
        return createAuthRoute.signup(userType);
      case 'signup':
        return createAuthRoute.signin(userType);
      default:
        return authContent.link || '/signin';
    }
  };

  const dynamicLink = getDynamicLink();

  return (
    <div className="flex flex-col gap-16 text-center lg:gap-32">
      <h2 className="text-2xl font-semibold text-black-500 lg:text-3xl dark:text-gray-100">
        {title}
      </h2>
      <p className="font-regular text-xs text-black-100 lg:text-xl dark:text-gray-200">
        {description[0]}
        {linkText && (
          <Link
            className="ml-8 inline-block font-semibold text-black-400 underline hover:text-black-500 dark:text-gray-100"
            href={dynamicLink}
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
