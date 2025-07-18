'use client';

import { CardInfo } from '@/shared/types/mypage';

import MyPostCard from './MyPostCard';

const PostCardSection = ({ cardInfo }: CardInfo) => {
  const cardDropdown = [
    { value: '수정하기', clickEvent: () => console.error('') },
    { value: '삭제하기', clickEvent: () => console.error('') },
  ];
  return (
    <section className="grid-rows-auto grid grid-cols-1 items-center lg:flex-row lg:flex-wrap lg:gap-x-25 lg:gap-y-45 xl:grid-cols-3">
      <MyPostCard cardContent={cardInfo} dropdownItem={cardDropdown} />
    </section>
  );
};
export default PostCardSection;
