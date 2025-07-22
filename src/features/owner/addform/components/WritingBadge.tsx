import { cn } from '@/shared/lib/cn';

const WritingBadge = ({ isActive }: { isActive?: boolean }) => {
  return (
    <div
      className={cn(
        'flex h-28 w-48 items-center justify-center rounded-full border text-xs font-semibold lg:h-38 lg:w-66 lg:border-2 lg:text-lg lg:font-bold',
        isActive
          ? 'border-gray-25 bg-mint-200 text-gray-25 dark:border-gray-100 dark:bg-mint-350 dark:text-gray-50'
          : 'border-gray-100 bg-background-100 text-gray-300 dark:border-gray-200 dark:bg-gray-600'
      )}
    >
      작성중
    </div>
  );
};
export default WritingBadge;
