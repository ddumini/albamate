import { ReactNode } from 'react';

import { cn } from '@/shared/lib/cn';

interface CardContainer {
  children: ReactNode;
  className?: string;
}

const CardContainer = ({ children, className }: CardContainer) => {
  return (
    <div className={cn('rounded-2xl dark:bg-gray-50', className)}>
      {children}
    </div>
  );
};
export default CardContainer;
