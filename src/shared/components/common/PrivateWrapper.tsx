import Image from 'next/image';
import { twMerge } from 'tailwind-merge';

interface PrivateWrapperProps {
  children: React.ReactNode;
  isPrivate: boolean;
  className?: string;
  content?: string;
}

const PrivateWrapper = ({
  children,
  isPrivate,
  className,
  content = '비공개 처리된 알바폼이에요',
}: PrivateWrapperProps) => {
  return (
    <div
      className={twMerge(
        'relative h-390 w-327 overflow-hidden rounded-xl lg:h-536 lg:w-477',
        className
      )}
    >
      {children}
      {isPrivate && (
        <div className="absolute inset-0 flex cursor-not-allowed flex-col items-center justify-center gap-16 rounded-xl border border-gray-200 bg-[#3e3e3e]/60 lg:gap-24 lg:rounded-2xl lg:border-2">
          <Image
            alt="비공개"
            className="size-80 lg:size-120"
            height={120}
            src="/icons/private.svg"
            width={120}
          />
          <p className="text-md font-medium text-gray-50 lg:text-2lg">
            {content}
          </p>
        </div>
      )}
    </div>
  );
};
export default PrivateWrapper;
