'use client';

import ButtonBase from '@common/button/ButtonBase';
import { useEffect, useState } from 'react';

import ThemeToggle from '@/shared/components/ThemeToggle';

const RightMenu = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 마운트 되기 전까지는 null 혹은 로딩 상태로 처리
  if (!mounted) {
    // 선택: 로딩 아이콘, 빈 div, 혹은 기본 라이트모드 아이콘 렌더링 가능
    return null;
  }

  return (
    <div className="flex items-center gap-12">
      <ButtonBase
        className="BG-solid-mint rounded-sm px-4 py-2 text-white hover:brightness-90 md:px-8 md:py-4"
        type="submit"
        onClick={() => console.log('클릭')}
      >
        로그인
      </ButtonBase>
      <ThemeToggle />
    </div>
  );
};

export default RightMenu;
