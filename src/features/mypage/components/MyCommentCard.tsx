'use client';

import { DropdownOption } from '@common/list/AlbaCardItem';
import Image from 'next/image';
import Link from 'next/link';

import KebabMenuDropdown from '@/shared/components/common/kebabMenuDropdown';
import { CommentCardItem } from '@/shared/types/mypage';

import DateFormatter from './DateFormatter';

interface MyCommentCardProps {
  cardContent: CommentCardItem;
  dropdownItem: DropdownOption[];
}

const MyCommentCard = ({ cardContent, dropdownItem }: MyCommentCardProps) => {
  return (
    <Link
      key={cardContent.id}
      className="Border-Card flex h-264 w-full cursor-pointer flex-col items-start justify-between rounded-2xl border border-line-100 p-24 shadow-md transition-all duration-300 hover:scale-[1.01] hover:shadow-lg lg:w-full xl:max-w-476"
      href={`/albatalk/${cardContent.post.id}`}
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
        <KebabMenuDropdown options={dropdownItem} />
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
    </Link>
  );
};

export default MyCommentCard;
