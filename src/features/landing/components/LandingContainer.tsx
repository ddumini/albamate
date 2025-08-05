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
        'mx-auto flex w-full max-w-375 flex-col px-24 md:w-618 md:max-w-none md:flex-row md:justify-between lg:w-full xl:w-1140',
        className
      )}
    >
      {children}
    </div>
  );
};

export default LandingContainer;
