"use client";

import { useTheme } from "next-themes";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div suppressHydrationWarning>
      <button
        aria-label="Toggle Dark Mode"
        className="relative flex items-center cursor-pointer justify-center w-40 h-40 rounded-full bg-white transition-colors duration-500 dark-light-toggle"
        type="button"
        onClick={() => setTheme(isDark ? "light" : "dark")}
      >
        {/* Sun Icon */}
        <svg
          className={`w-20 h-20 text-black absolute transition-opacity duration-500 ease-in-out ${
            isDark ? "opacity-0" : "opacity-100"
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
          className={`w-22 h-30 text-black absolute transition-opacity duration-500 ease-in-out transform ${
            isDark
              ? "opacity-100 scale-110 translate-x-[-2px] translate-y-1"
              : "opacity-0 scale-90"
          }`}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M23 15A13 13 0 0 1 11 2 8 8 0 1 0 23 15z" />
        </svg>
      </button>
    </div>
  );
};

export default ThemeToggle;
