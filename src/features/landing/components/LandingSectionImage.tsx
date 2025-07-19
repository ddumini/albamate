import { ReactNode } from 'react';

import { cn } from '@/shared/lib/cn';

interface LandingSectionImageProps {
  children: ReactNode;
  className?: string;
}

const LandingSectionImage = ({
  children,
  className,
}: LandingSectionImageProps) => {
  return (
    <div
      className={cn('relative flex flex-col self-end md:self-auto', className)}
    >
      {children}
    </div>
  );
};

export default LandingSectionImage;
