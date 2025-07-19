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
    <div
      className={cn(
        'mx-auto flex w-full flex-col md:flex-row md:justify-between md:px-24 xl:w-1140',
        className
      )}
    >
      {children}
    </div>
  );
};

export default LandingContainer;
