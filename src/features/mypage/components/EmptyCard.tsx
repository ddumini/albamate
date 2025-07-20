import Image from 'next/image';

type EmptyCardProps = 'post' | 'comment' | 'scrap';
interface EmptyInfo {
  image: string;
  title: string;
  description?: string;
}

const EMPTY_DATA: Record<EmptyCardProps, EmptyInfo> = {
  post: {
    image: '/images/mypage/non-post.svg',
    title: '작성한 게시글이 없어요',
    description: '궁금한 점, 고민 등의 게시글을 올려보세요',
  },
  comment: {
    image: '/images/mypage/non-post.svg',
    title: '작성한 댓글이 없어요',
  },
  scrap: {
    image: '/images/mypage/non-scrap.svg',
    title: '스크랩한 알바폼이 없어요',
  },
};

const EmptyCard = ({ type }: { type: EmptyCardProps }) => {
  const { image, title, description } = EMPTY_DATA[type];
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="relative mb-24 h-80 w-80 lg:mb-32 lg:h-120 lg:w-120">
        <Image
          fill
          alt="Empty Card"
          className="object-contain"
          sizes="120px"
          src={image}
        />
      </div>
      <p className="text-md text-gray-400 lg:text-2lg">{title}</p>
      {description && (
        <p className="text-md text-gray-400 lg:text-2lg">{description}</p>
      )}
    </div>
  );
};

export default EmptyCard;
