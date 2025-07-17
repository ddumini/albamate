'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export const useThemeLogo = () => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // mounted 되기 전에는 기본 라이트 모드 이미지 사용
  const isDark = mounted && resolvedTheme === 'dark';

  const logoSrc = isDark ? '/logos/logo-dark.svg' : '/logos/logo.svg';
  const symbolSrc = isDark ? '/logos/symbol-dark.svg' : '/logos/symbol.svg';

  return { logoSrc, symbolSrc };
};
