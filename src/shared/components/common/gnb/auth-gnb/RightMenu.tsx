'use client';

import { useAuthNavigation } from '@/features/auth/hooks/useAuthNavigation';
import ThemeToggle from '@/shared/components/ThemeToggle';

import { navButton } from '../styles/Header.styles';

const RightMenu = () => {
  const { currentUserType, switchToUserType } = useAuthNavigation();

  // 현재 선택된 타입 확인 (기본값: applicant)
  const isOwnerSelected = currentUserType === 'owner';
  const isApplicantSelected =
    currentUserType === 'applicant' || !currentUserType;

  return (
    <div className="ml-auto flex items-center gap-24">
      <nav className="flex gap-24 text-sm font-medium md:text-md lg:text-2lg">
        <button
          className={navButton(isOwnerSelected)}
          type="button"
          onClick={() => switchToUserType('owner')}
        >
          사장님 전용
        </button>
        <button
          className={navButton(isApplicantSelected)}
          type="button"
          onClick={() => switchToUserType('applicant')}
        >
          지원자 전용
        </button>
      </nav>
      <ThemeToggle />
    </div>
  );
};

export default RightMenu;
