import Image from 'next/image';

import { cn } from '@/shared/lib/cn';
import { EmptyType } from '@/shared/types/mypage';

interface EmptyInfo {
  image: string;
  title: string;
  description?: string;
}

interface EmptyCardProps {
  type: EmptyType;
  wrapClassName?: string;
  imgWrapClassName?: string;
  textClassName?: string;
}

const EMPTY_DATA: Record<EmptyType, EmptyInfo> = {
  post: {
    image: '/images/mypage/non-post.svg',
    title: '작성한 게시글이 없어요.',
    description: '궁금한 점, 고민 등의 게시글을 올려보세요',
  },
  comment: {
    image: '/images/mypage/non-post.svg',
    title: '작성한 댓글이 없어요.',
  },
  scrap: {
    image: '/images/mypage/non-scrap.svg',
    title: '스크랩한 알바폼이 없어요.',
  },
  albaList: {
    image: 'images/non-form.svg',
    title: '등록된 알바폼이 없어요.',
    description: '1분 만에 등록하고 알바를 구해보세요!',
  },
  applyList: {
    image: 'images/non-form.svg',
    title: '지원한 알바폼이 없어요.',
    description: '알바폼을 둘러보고 지원해보세요!',
  },
  albaTalkComment: {
    image: '/images/mypage/non-post.svg',
    title: '등록된 댓글이 없어요.',
    description: '댓글을 등록하고 의견을 공유해보세요.',
  },
};

const EmptyCard = ({
  type,
  wrapClassName,
  imgWrapClassName,
  textClassName,
}: EmptyCardProps) => {
  const { image, title, description } = EMPTY_DATA[type];
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
      <p className={cn('text-md text-gray-400 lg:text-2lg', textClassName)}>
        {title}
      </p>
      {description && (
        <p className={cn('text-md text-gray-400 lg:text-2lg', textClassName)}>
          {description}
        </p>
      )}
    </div>
  );
};

export default EmptyCard;
