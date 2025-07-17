import { PropsWithChildren } from 'react';

import { cn } from '@/shared/lib/cn';

interface LandingSectionProps {
  className?: string;
}

const LandingSection = ({
  children,
  className,
}: PropsWithChildren<LandingSectionProps>) => {
  return (
    <section
      className={cn(
        'relative z-10 flex h-screen flex-col justify-center overflow-hidden',
        className
      )}
    >
      {children}
    </section>
  );
};

export default LandingSection;
