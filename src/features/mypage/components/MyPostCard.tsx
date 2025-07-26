'use client';

import { DropdownOption } from '@common/list/AlbaCardItem';
import Image from 'next/image';
import Link from 'next/link';

import KebabMenuDropdown from '@/shared/components/common/kebabMenuDropdown';
import { PostCardItem } from '@/shared/types/mypage';

import DateFormatter from './DateFormatter';

interface MyPostCardProps {
  cardContent: PostCardItem;
  dropdownItem: DropdownOption[];
  key?: string | number;
}

const MyPostCard = ({ cardContent, dropdownItem }: MyPostCardProps) => {
  return (
    <Link
      key={cardContent.id}
      className="Border-Card flex h-264 w-full cursor-pointer flex-col items-start justify-between rounded-2xl border border-line-100 p-24 shadow-md transition-all duration-300 hover:scale-[1.01] hover:shadow-lg lg:w-full xl:max-w-476"
      href={`/albatalks/${cardContent.id}`}
    >
      <section className="flex w-full items-center justify-between">
        <div className="inline-flex items-center">
          <span className="relative inline-flex h-24 w-24 items-center justify-center lg:h-36 lg:w-36">
            <Image fill alt="제목" sizes="36px" src="/icons/apply-list.svg" />
          </span>
          <h3 className="Text-black text-lg font-medium">
            {cardContent.title}
          </h3>
        </div>
        <KebabMenuDropdown options={dropdownItem} />
      </section>
      <section>
        <p className="Text-gray text-lg font-normal">{cardContent.content}</p>
      </section>
      <section className="flex w-full items-center justify-between">
        <div className="Text-gray flex items-center gap-16 text-lg font-normal">
          <div className="flex items-center gap-4">
            <span className="relative inline-flex h-24 w-24 items-center justify-center overflow-hidden rounded-full lg:h-36 lg:w-36">
              <Image
                fill
                alt="프로필 이미지"
                sizes="36px"
                src={
                  cardContent.writer.imageUrl
                    ? cardContent.writer.imageUrl
                    : '/icons/user-profile.svg'
                }
              />
            </span>
            <span className="text-xs lg:text-lg">
              {cardContent.writer.nickname}
            </span>
          </div>
          <span className="inline-flex h-16 w-1 bg-line-200" />
          <span className="text-xs lg:text-lg">
            {DateFormatter(cardContent.updatedAt)}
          </span>
        </div>
        <div className="Text-gray inline-flex items-center gap-12">
          <div className="inline-flex items-center gap-2">
            <span className="relative inline-flex h-24 w-24 items-center justify-center gap-2 overflow-hidden rounded-full lg:h-36 lg:w-36">
              <Image
                fill
                alt="댓글 아이콘"
                sizes="36px"
                src="/icons/comment.svg"
              />
            </span>
            <p>{cardContent.commentCount}</p>
          </div>
          <div className="inline-flex items-center gap-2">
            <span className="relative inline-flex h-24 w-24 items-center justify-center overflow-hidden rounded-full lg:h-36 lg:w-36">
              <Image
                fill
                alt="좋아요 아이콘"
                sizes="36px"
                src="/icons/like.svg"
              />
            </span>
            <p>{cardContent.likeCount}</p>
          </div>
        </div>
      </section>
    </Link>
  );
};

export default MyPostCard;
