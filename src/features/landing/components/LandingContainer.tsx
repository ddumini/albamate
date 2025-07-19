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
        'mx-auto flex justify-between md:px-24 lg:w-full xl:w-1140',
        className
      )}
    >
      {children}
    </div>
  );
};

export default LandingContainer;
