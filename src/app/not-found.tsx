'use client';

import Image from 'next/image';
import Link from 'next/link';

import PrimaryButton from '@/shared/components/common/button/PrimaryButton';

const NotFound = () => {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-24">
      <div className="relative h-100 w-100 md:h-197 md:w-197">
        <Image
          fill
          alt="not-found"
          className="object-contain"
          src="/images/not-found.png"
        />
      </div>
      <div className="flex flex-col items-center justify-center gap-4 text-center text-gray-700 dark:text-gray-300">
        <strong className="text-lg font-bold md:text-2xl">
          404 - Not Found
        </strong>
        <p className="text-sm md:text-lg">치치도 페이지를 못찾았어요...</p>
      </div>
      <Link href="/">
        <PrimaryButton
          className="h-42 w-full px-12 text-md md:h-48 md:px-16 md:text-lg"
          label="홈으로 돌아가기"
          type="button"
          variant="solid"
        />
      </Link>
    </div>
  );
};

export default NotFound;
