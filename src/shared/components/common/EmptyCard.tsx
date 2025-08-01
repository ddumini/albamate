import Image from 'next/image';

import { cn } from '@/shared/lib/cn';
import { EmptyType } from '@/shared/types/mypage';

interface EmptyInfo {
  image: string;
}

interface EmptyCardProps {
  type: EmptyType;
  title?: string;
  description?: string;
  wrapClassName?: string;
  imgWrapClassName?: string;
  textClassName?: string;
}

const EMPTY_DATA: Record<EmptyType, EmptyInfo> = {
  post: {
    image: '/images/mypage/non-post.svg',
  },
  comment: {
    image: '/images/mypage/non-post.svg',
  },
  scrap: {
    image: '/images/mypage/non-scrap.svg',
  },
  albaList: {
    image: '/images/non-form.svg',
  },
  applyList: {
    image: '/images/non-form.svg',
  },
  albaTalkComment: {
    image: '/images/mypage/non-post.svg',
  },
};

const EmptyCard = ({
  type,
  title,
  description,
  wrapClassName,
  imgWrapClassName,
  textClassName,
}: EmptyCardProps) => {
  const { image } = EMPTY_DATA[type];
  return (
    <div
      className={cn(
        'flex h-full w-full flex-col items-center justify-center',
        wrapClassName
      )}
    >
      <div
        className={cn(
          'relative mb-24 h-80 w-80 lg:mb-32 lg:h-120 lg:w-120',
          imgWrapClassName
        )}
      >
        <Image
          fill
          alt="Empty Card"
          className="object-contain"
          sizes="120px"
          src={image}
        />
      </div>
      {title && (
        <p className={cn('text-md text-gray-400 lg:text-2lg', textClassName)}>
          {title}
        </p>
      )}
      {description && (
        <p className={cn('text-md text-gray-400 lg:text-2lg', textClassName)}>
          {description}
        </p>
      )}
    </div>
  );
};

export default EmptyCard;
