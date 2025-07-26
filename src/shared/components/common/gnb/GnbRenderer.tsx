'use client';

import AuthGnb from '@common/gnb/auth-gnb';
import LandingGnb from '@common/gnb/landing-gnb';
import MainGnb from '@common/gnb/main-gnb';
import { usePathname } from 'next/navigation';

import { useAuthSession } from '@/features/auth/hooks/useAuthSession';

const GnbRenderer = () => {
  const pathname = usePathname();
  const { isAuthenticated } = useAuthSession();

  if (pathname.startsWith('/signup') || pathname.startsWith('/signin')) {
    return <AuthGnb />;
  }

  if (pathname === '/') {
    return isAuthenticated ? <MainGnb /> : <LandingGnb />;
  }

  return isAuthenticated ? <MainGnb /> : <LandingGnb />;
};

export default GnbRenderer;
