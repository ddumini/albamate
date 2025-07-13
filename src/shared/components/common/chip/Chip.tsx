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
    text-xs px-2 py-1 w-12 h-7
    md:text-sm md:px-10 md:py-4 md:w-56 md:h-32
    lg:text-base lg:px-12 lg:py-6 lg:w-65 lg:h-38
  `;

  const variants = {
    default: 'bg-white text-gray-500 border-gray-300',
    filled: active
      ? 'text-mint-300 bg-mint-50/50 border-mint-300'
      : 'bg-white text-gray-400 border-gray-200',
    icon: 'bg-white text-gray-600 border-gray-300',
  };

  return (
    <span className={cn(baseClasses, variants[variant])}>
      {variant === 'icon' && (
        <Image
          alt="북마크"
          className="h-16 w-16"
          height={16}
          src="/icons/bookmark-outlined.svg"
          width={16}
        />
      )}
      {label}
    </span>
  );
};
