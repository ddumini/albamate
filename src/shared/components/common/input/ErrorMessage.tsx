import { cn } from '@/shared/lib/cn';

interface ErrorMessageProps {
  message?: string;
  isVisible?: boolean;
  className?: string;
}

const ErrorMessage = ({
  message,
  isVisible = false,
  className = '',
}: ErrorMessageProps) => {
  return (
    <div
      className={cn(
        'mt-8 hidden text-right text-sm font-medium text-error lg:text-lg',
        isVisible && 'block',
        className
      )}
    >
      {message}
    </div>
  );
};

export default ErrorMessage;
