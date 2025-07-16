import { PropsWithChildren } from 'react';

import { cn } from '@/shared/lib/cn';

interface LandingContainerProps {
  className?: string;
}

const LandingContainer = ({
  children,
  className,
}: PropsWithChildren<LandingContainerProps>) => {
  return (
    <div className={cn('mx-auto flex w-1140 justify-between', className)}>
      {children}
    </div>
  );
};

export default LandingContainer;
