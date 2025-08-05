'use client';

import { useRouter } from 'next/navigation';

import ThemeToggle from '@/shared/components/ThemeToggle';

import PrimaryButton from '../../button/PrimaryButton';

const RightMenu = () => {
  const router = useRouter();

  const handleLoginClick = () => {
    router.push('/signin'); // 로그인 페이지로 이동
  };

  return (
    <div className="flex items-center gap-12 md:gap-16 lg:gap-20">
      <PrimaryButton
        className="rounded-sm bg-mint-400 px-4 py-2 text-sm text-white shadow-lg hover:brightness-95 active:brightness-90 md:px-8 md:py-4 md:text-md lg:px-16 lg:py-6 lg:text-lg"
        label="로그인"
        type="button"
        variant="solid"
        onClick={handleLoginClick}
      />
      <ThemeToggle />
    </div>
  );
};

export default RightMenu;
