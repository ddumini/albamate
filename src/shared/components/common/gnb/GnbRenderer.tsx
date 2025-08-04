'use client';

import AuthGnb from '@common/gnb/auth-gnb';
import LandingGnb from '@common/gnb/landing-gnb';
import MainGnb from '@common/gnb/main-gnb';
import { usePathname } from 'next/navigation';

import { useAuthSession } from '@/features/auth/hooks/useAuthSession';

const GnbRenderer = () => {
  const pathname = usePathname();
  const { isAuthenticated, isLoading } = useAuthSession();

  if (pathname.startsWith('/signup') || pathname.startsWith('/signin')) {
    return <AuthGnb />;
  }

  if (isLoading)
    return (
      <div className="h-72 w-full animate-pulse rounded-md bg-gray-50 dark:bg-gray-800" />
    );

  return isAuthenticated ? <MainGnb /> : <LandingGnb />;
};

export default GnbRenderer;
