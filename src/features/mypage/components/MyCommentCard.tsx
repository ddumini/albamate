'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { CommentCardItem, DropdownValue } from '@/shared/types/mypage';

import DateFormatter from './DateFormatter';
import MyPageDropDown from './MyPageDropDown';

interface MyCommentCardProps {
  cardContent: CommentCardItem;
  dropdownItem: DropdownValue[];
}

const MyCommentCard = ({ cardContent, dropdownItem }: MyCommentCardProps) => {
  const router = useRouter();

  const handleCardClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    const isInteractiveElement =
      target.closest('button') ||
      target.closest('[role="button"]') ||
      target.closest('[role="menu"]');

    if (isInteractiveElement) {
      return;
    }

    router.push(`/albatalks/${cardContent.post.id}`);
  };
  return (
    <div
      key={cardContent.id}
      className="Border-Card flex h-264 w-full flex-col items-start justify-between rounded-2xl border border-line-100 p-24 shadow-md transition-all duration-300 hover:scale-[1.01] hover:shadow-lg lg:w-full xl:max-w-476"
      onClick={handleCardClick}
    >
      <section className="flex w-full items-center justify-between">
        <div className="inline-flex items-center">
          <span className="relative inline-flex h-24 w-24 items-center justify-center lg:h-36 lg:w-36">
            <Image fill alt="제목" sizes="36px" src="/icons/apply-list.svg" />
          </span>
          <h3 className="Text-black text-xs font-medium lg:text-lg">
            {cardContent.post.title}
          </h3>
        </div>
        <MyPageDropDown items={dropdownItem} />
      </section>
      <section className="inline-flex flex-col gap-40">
        <p className="Text-gray text-xs font-normal lg:text-lg">
          {cardContent.post.content}
        </p>
        <p className="Text-black text-md font-semibold lg:text-2lg">
          {cardContent.content}
        </p>
      </section>
      <section className="flex w-full items-center justify-between">
        <div className="Text-gray flex items-center gap-16 text-xs font-normal lg:text-lg">
          <span>{DateFormatter(cardContent.updatedAt)}</span>
        </div>
      </section>
    </div>
  );
};

export default MyCommentCard;
