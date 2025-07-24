'use client';

import { cn } from '@lib/cn';
import Image from 'next/image';

interface ChipProps {
  label: string;
  variant?: 'default' | 'filled' | 'icon';
  active?: boolean;
}

const Chip = ({ label, variant = 'default', active = false }: ChipProps) => {
  const baseClasses = `
    flex rounded-sm font-medium border items-center gap-4 transition-all
    text-xs px-8 h-28
    lg:text-md md:text-sm flex-shrink-0 lg:h-32
  `;

  const variants = {
    default: 'bg-white text-gray-500 border-gray-300',
    filled: active
      ? 'text-mint-300 bg-mint-50/50 dark:bg-mint-50/10 border-mint-300'
      : 'bg-white text-gray-400 border-gray-200',
    icon: 'bg-white text-gray-600 border-gray-300',
  };

  return (
    <span className={cn(baseClasses, variants[variant])}>
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

export default Chip;
