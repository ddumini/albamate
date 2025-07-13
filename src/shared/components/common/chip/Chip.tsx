'use client';

import { cn } from '@lib/cn';
import Image from 'next/image';

interface ChipProps {
  label: string;
  variant?: 'default' | 'filled' | 'icon';
  active?: boolean;
}

export const Chip = ({
  label,
  variant = 'default',
  active = false,
}: ChipProps) => {
  const baseClasses = `
    rounded-md font-medium border flex justify-center items-center gap-1 transition-all
    text-xs px-8 py-4 h-28
    md:text-sm md:px-10 md:py-4 md:h-32
    lg:text-base lg:px-12 lg:py-6 lg:h-38`;

  const widthClasses = {
    default: 'w-47 md:w-56 lg:w-65',
    filled: 'w-47 md:w-56 lg:w-65',
    icon: 'w-76 md:w-88 lg:w-100', // ← 북마크용 너비 확장
  };

  const variants = {
    default: 'bg-white text-gray-500 border-gray-300',
    filled: active
      ? 'text-mint-300 bg-mint-50/50 border-mint-300'
      : 'bg-white text-gray-400 border-gray-200',
    icon: 'bg-white text-gray-600 border-gray-300',
  };

  return (
    <span className={cn(baseClasses, widthClasses[variant], variants[variant])}>
      {variant === 'icon' && (
        <Image
          alt="북마크"
          className="h-12 w-12 md:h-16 md:w-16 lg:h-20 lg:w-20"
          height={20}
          src="/icons/bookmark-outlined.svg"
          width={20}
        />
      )}
      {label}
    </span>
  );
};
