'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // 마운트 전 렌더링 안 함

  const isDark = theme === 'dark';

  return (
    <div>
      <button
        aria-label="Toggle Dark Mode"
        className="dark-light-toggle BG-ToggleButton relative flex h-26 w-26 cursor-pointer items-center justify-center rounded-full text-black transition-colors duration-500 md:h-32 md:w-32 lg:h-36 lg:w-36"
        type="button"
        onClick={() => setTheme(isDark ? 'light' : 'dark')}
      >
        {/* Sun Icon */}
        <svg
          className={`absolute h-16 w-16 transition-opacity duration-500 ease-in-out ${
            isDark ? 'opacity-0' : 'opacity-100'
          }`}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="5" />
          <g stroke="currentColor" strokeWidth="2">
            <line x1="12" x2="12" y1="1" y2="4" />
            <line x1="12" x2="12" y1="20" y2="23" />
            <line x1="4.22" x2="6.34" y1="4.22" y2="6.34" />
            <line x1="17.66" x2="19.78" y1="17.66" y2="19.78" />
            <line x1="1" x2="4" y1="12" y2="12" />
            <line x1="20" x2="23" y1="12" y2="12" />
            <line x1="4.22" x2="6.34" y1="19.78" y2="17.66" />
            <line x1="17.66" x2="19.78" y1="6.34" y2="4.22" />
          </g>
        </svg>

        {/* Moon Icon */}
        <svg
          className={`absolute h-16 w-16 transform text-black transition-opacity duration-500 ease-in-out ${
            isDark
              ? 'translate-x-[-2px] translate-y-1 scale-105 opacity-100'
              : 'scale-90 opacity-0'
          }`}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M25 14A13 16 0 0 1 11 2 8 8 0 1 0 23 16z" />
        </svg>
      </button>
    </div>
  );
};

export default ThemeToggle;
