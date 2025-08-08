'use client';

import Image from 'next/image';
import Link from 'next/link';

import { useThemeLogo } from '@/shared/hooks/useThemeLogo';

interface LogoProps {
  withText?: boolean;
  className?: string;
}

const Logo = ({ withText = true, className = '' }: LogoProps) => {
  const { logoSrc, symbolSrc } = useThemeLogo();

  return (
    <Link
      className={`flex cursor-pointer items-center space-x-2 py-15 text-xl font-bold md:py-24 ${className}`}
      href="/"
    >
      <div className="relative mr-16 h-22 w-22 md:mr-12 md:h-24 md:w-24 lg:h-36 lg:w-36">
        <Image alt="로고 심볼" height={36} src={symbolSrc} width={36} />
      </div>
      {withText && (
        <div className="relative hidden h-24 w-124 md:flex lg:h-36 lg:w-200">
          <Image alt="로고 텍스트" height={36} src={logoSrc} width={200} />
        </div>
      )}
    </Link>
  );
};

export default Logo;
