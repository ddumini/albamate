'use client';

import { useTheme } from 'next-themes';

export const useThemeLogo = () => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  const logoSrc = isDark ? '/logos/logo-dark.svg' : '/logos/logo.svg';
  const symbolSrc = isDark ? '/logos/symbol-dark.svg' : '/logos/symbol.svg';

  return { logoSrc, symbolSrc };
};
