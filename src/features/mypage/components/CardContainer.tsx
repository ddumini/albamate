import { ReactNode } from 'react';

import { cn } from '@/shared/lib/cn';

interface CardContainer {
  children: ReactNode;
  className?: string;
  key?: string | number;
  itemId?: string | number;
}

const CardContainer = ({ children, className, key, itemId }: CardContainer) => {
  return (
    <div key={itemId} className={cn('rounded-2xl dark:bg-gray-50', className)}>
      {children}
    </div>
  );
};
export default CardContainer;
