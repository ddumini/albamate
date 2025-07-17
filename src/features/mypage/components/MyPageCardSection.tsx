'use client';

import MyPostCard from './MyPostCard';

interface CardItem {
  id: number;
  title: string;
  content: string;
  imageUrl: string;
  likeCount: number;
  commentCount: number;
  createdAt: string;
  updatedAt: string;
  writer: {
    id: number;
    nickname: string;
    imageUrl: string | null;
  };
}

interface CardInfo {
  cardInfo: CardItem[];
}

const MyPageCardSection = ({ cardInfo }: CardInfo) => {
  const cardDropdown = [
    { value: '수정하기', clickEvent: () => console.error('') },
    { value: '삭제하기', clickEvent: () => console.error('') },
  ];
  return (
    <section>
      <MyPostCard cardContent={cardInfo} dropdownItem={cardDropdown} />
    </section>
  );
};
export default MyPageCardSection;
