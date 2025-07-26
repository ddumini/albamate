'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const MobileNav = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentType = searchParams.get('type') || '';

  const onClickButton = (role: Role) => {
    // 쿼리 파라미터로 타입 변경
    const params = new URLSearchParams(searchParams);
    params.set('type', role);
    router.push(`${pathname}?${params.toString()}`);
  };

  // 현재 선택된 타입 확인 (기본값: worker)
  const isOwnerSelected = currentType === 'owner';
  const isWorkerSelected = currentType === 'worker' || currentType === '';

  return (
    <nav className="absolute top-100 left-0 flex w-full justify-center gap-32 py-12 md:hidden dark:border-gray-500">
      <button
        className={`hover:text-primary text-sm font-medium transition-colors ${
          isOwnerSelected ? 'text-mint-100' : 'text-gray-700 dark:text-white'
        }`}
        type="button"
        onClick={() => onClickButton('owner')}
      >
        사장님 전용
      </button>
      <button
        className={`hover:text-primary text-sm font-medium transition-colors ${
          isWorkerSelected ? 'text-mint-100' : 'text-gray-700 dark:text-white'
        }`}
        type="button"
        onClick={() => onClickButton('worker')}
      >
        지원자 전용
      </button>
    </nav>
  );
};

type Role = 'owner' | 'worker';

export default MobileNav;
