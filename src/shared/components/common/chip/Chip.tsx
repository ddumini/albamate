// components/Chip.tsx
'use client';
import { cn } from '@lib/cn';
import Image from 'next/image';

interface ChipProps {
  label: string;
  variant?: 'default' | 'filled' | 'icon';
  size?: 'sm' | 'md' | 'lg';
  active?: boolean;
}

export const Chip = ({
  label,
  variant = 'default',
  size = 'md',
  active = false,
}: ChipProps) => {
  const baseClasses =
    'rounded-md font-medium border flex items-center gap-1 transition-all';
  const sizes = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-1.5',
  };

  const variants = {
    default: `bg-white text-gray-500 border-gray-300`,
    filled: active
      ? 'bg-teal-700 text-teal-300 border-teal-700'
      : 'bg-white text-gray-400 border-gray-200',
    icon: 'bg-white text-gray-600 border-gray-300',
  };

  return (
    <span className={cn(baseClasses, sizes[size], variants[variant])}>
      {variant === 'icon' && (
        <Image
          alt="북마크"
          className="h-4 w-4"
          height={16}
          src="/icons/bookmark-outlined.svg"
          width={16}
        />
      )}
      {label}
    </span>
  );
};
