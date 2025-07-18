'use client';

import Image from 'next/image';

import CardContainer from './CardContainer';
import DateFormatter from './DateFormatter';
import MyPageDropDown from './MyPageDropDown';

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

interface DropdownValue {
  value: string;
  clickEvent: () => void;
}

interface MyPostCardProps {
  cardContent: CardItem[];
  dropdownItem: DropdownValue[];
}

const MyPostCard = ({ cardContent, dropdownItem }: MyPostCardProps) => {
  return (
    <>
      {cardContent.map(item => {
        return (
          <CardContainer
            key={item.id}
            className="flex h-264 w-full flex-col items-start justify-between border border-line-100 bg-white p-24 shadow-[4px_4px_6px_rgba(212,212,212,0.1)] xl:max-w-476"
          >
            <section className="flex w-full items-center justify-between">
              <div className="inline-flex items-center">
                <span className="relative inline-flex h-24 w-24 items-center justify-center lg:h-36 lg:w-36">
                  <Image
                    fill
                    alt="제목"
                    sizes="36px"
                    src="/icons/apply-list.svg"
                  />
                </span>
                <h3 className="text-lg font-medium text-black-400">
                  {item.title}
                </h3>
              </div>
              <MyPageDropDown items={dropdownItem} />
            </section>
            <section>
              <p className="text-lg font-normal text-gray-500">
                {item.content}
              </p>
            </section>
            <section className="flex w-full items-center justify-between">
              <div className="flex items-center gap-16 text-lg font-normal text-gray-500">
                <div className="flex items-center gap-4">
                  <span className="relative inline-flex h-24 w-24 items-center justify-center overflow-hidden rounded-full lg:h-36 lg:w-36">
                    <Image
                      fill
                      alt="프로필 이미지"
                      sizes="36px"
                      src={
                        item.imageUrl
                          ? item.imageUrl
                          : '/icons/user-profile.svg'
                      }
                    />
                  </span>
                  <span className="text-xs lg:text-lg">
                    {item.writer.nickname}
                  </span>
                </div>
                <span className="inline-flex h-16 w-1 bg-line-200" />
                <span className="text-xs lg:text-lg">
                  {DateFormatter(item.updatedAt)}
                </span>
              </div>
              <div className="inline-flex items-center gap-12 text-gray-500">
                <div className="inline-flex items-center gap-2">
                  <span className="relative inline-flex h-24 w-24 items-center justify-center gap-2 overflow-hidden rounded-full lg:h-36 lg:w-36">
                    <Image
                      fill
                      alt="프로필 이미지"
                      sizes="36px"
                      src="/icons/comment.svg"
                    />
                  </span>
                  <p>{item.commentCount}</p>
                </div>
                <div className="inline-flex items-center gap-2">
                  <span className="relative inline-flex h-24 w-24 items-center justify-center overflow-hidden rounded-full lg:h-36 lg:w-36">
                    <Image
                      fill
                      alt="프로필 이미지"
                      sizes="36px"
                      src="/icons/like.svg"
                    />
                  </span>
                  <p>{item.likeCount}</p>
                </div>
              </div>
            </section>
          </CardContainer>
        );
      })}
    </>
  );
};

export default MyPostCard;
