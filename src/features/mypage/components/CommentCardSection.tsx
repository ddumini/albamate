'use client';

import MyCommentCard from './MyCommentCard';

interface CommentCardItem {
  post: {
    content: string;
    title: string;
    id: number;
  };
  updatedAt: string;
  createdAt: string;
  content: string;
  id: number;
}

interface CommentCardInfo {
  cardInfo: {
    totalPages: number;
    currentPage: number;
    totalItemCount: number;
    data: CommentCardItem[];
  };
}

const CommentCardSection = ({ cardInfo }: CommentCardInfo) => {
  const cardDropdown = [
    { value: '수정하기', clickEvent: () => console.error('') },
    { value: '삭제하기', clickEvent: () => console.error('') },
  ];
  return (
    <section className="grid-rows-auto grid grid-cols-1 items-center lg:flex-row lg:flex-wrap lg:gap-x-25 lg:gap-y-45 xl:grid-cols-3">
      <MyCommentCard cardInfo={cardInfo} dropdownItem={cardDropdown} />
    </section>
  );
};

export default CommentCardSection;
