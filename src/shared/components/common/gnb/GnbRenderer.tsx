'use client';

import AuthGnb from '@common/gnb/auth-gnb';
import LandingGnb from '@common/gnb/landing-gnb';
import MainGnb from '@common/gnb/main-gnb';
import { usePathname } from 'next/navigation';

import { useAuthSession } from '@/features/auth/hooks/useAuthSession';

const GnbRenderer = () => {
  const pathname = usePathname();
  const { isAuthenticated } = useAuthSession();

  if (pathname.startsWith('/login') || pathname.startsWith('/signup')) {
    return <AuthGnb />;
  }

  if (pathname === '/') {
    return isAuthenticated ? <MainGnb /> : <LandingGnb />;
  }

  return isAuthenticated ? <MainGnb /> : null;
};

export default GnbRenderer;
