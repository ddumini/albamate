'use client';

import Lottie from 'lottie-react';

import animationData from '@/assets/animations/Loading.json';
import { cn } from '@/shared/lib/cn';

interface LoadingSpinnerProps {
  size: 'sm' | 'lg';
  className?: string;
}

const LoadingSpinner = ({
  size = 'sm',
  className = '',
}: LoadingSpinnerProps) => {
  return (
    <div
      className={cn(
        `flex aspect-square items-center justify-center ${className}`,
        size === 'sm' && 'w-60 lg:w-80',
        size === 'lg' && 'w-90 lg:w-120'
      )}
    >
      <Lottie
        autoplay
        loop
        animationData={animationData}
        className="h-full w-full"
      />
    </div>
  );
};

export default LoadingSpinner;
