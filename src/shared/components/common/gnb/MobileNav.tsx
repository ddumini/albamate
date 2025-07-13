'use client';

import { usePathname, useRouter } from 'next/navigation';

const MobileNav = () => {
  const pathname = usePathname();
  const router = useRouter();

  // 숨기고 싶은 경로 배열
  const hiddenRoutes = ['/owner/info', '/worker/info'];

  // prefix 방식으로 처리
  const shouldHide =
    hiddenRoutes.includes(pathname) || pathname.includes('/info');

  if (shouldHide) return null;

  return (
    <nav className="flex justify-center gap-32 py-12 md:hidden dark:border-gray-500">
      <button
        className={`hover:text-primary text-sm font-medium transition-colors ${
          pathname === '/owner'
            ? 'text-mint-100'
            : 'text-gray-700 dark:text-white'
        }`}
        type="button"
        onClick={() => router.push('/owner')}
      >
        사장님 전용
      </button>
      <button
        className={`hover:text-primary text-sm font-medium transition-colors ${
          pathname === '/worker'
            ? 'text-mint-100'
            : 'text-gray-700 dark:text-white'
        }`}
        type="button"
        onClick={() => router.push('/worker')}
      >
        지원자 전용
      </button>
    </nav>
  );
};

export default MobileNav;
