'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { useThemeLogo } from '@/shared/hooks/useThemeLogo';

const Logo = () => {
  const router = useRouter();
  const { logoSrc, symbolSrc } = useThemeLogo();

  return (
    <button
      className="flex cursor-pointer items-center space-x-2 py-15 text-xl font-bold md:py-24"
      type="button"
      onClick={() => router.push('/')}
    >
      <div className="relative mr-24 h-22 w-22 md:mr-12 md:h-24 md:w-24 lg:mr-16 lg:h-36 lg:w-36">
        <Image fill alt="로고 이미지" src={symbolSrc} />
      </div>
      <div className="relative hidden h-24 w-124 md:flex lg:h-36 lg:w-200">
        <Image fill alt="로고 명" src={logoSrc} />
      </div>
    </button>
  );
};

export default Logo;
