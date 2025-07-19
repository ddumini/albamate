'use client';

import { PostCardItem, PostCardProps } from '@/shared/types/mypage';

import MyPostCard from './MyPostCard';

const PostCardSection = ({ cardInfo }: PostCardProps) => {
  const cardDropdown = [
    { value: '수정하기', clickEvent: () => console.error('') },
    { value: '삭제하기', clickEvent: () => console.error('') },
  ];
  return (
    <section className="grid-rows-auto grid grid-cols-1 items-center gap-y-16 lg:flex-row lg:flex-wrap lg:gap-x-25 lg:gap-y-45 xl:grid-cols-3">
      {cardInfo.map((item: PostCardItem) => {
        return (
          <MyPostCard
            key={item.id}
            cardContent={item}
            dropdownItem={cardDropdown}
          />
        );
      })}
    </section>
  );
};
export default PostCardSection;
