import { cn } from '@/shared/lib/cn';

interface NumberCircle {
  isActive?: boolean;
  children: number;
}

const NumberCircle = ({ isActive, children }: NumberCircle) => {
  return (
    <div
      className={cn(
        'flex size-20 items-center justify-center rounded-full text-lg font-bold lg:size-28 lg:text-xl lg:font-semibold',
        isActive
          ? 'bg-background-100 text-mint-400'
          : 'bg-background-300 text-gray-200'
      )}
    >
      {children}
    </div>
  );
};
export default NumberCircle;
