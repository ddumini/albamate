'use client';

import Image from 'next/image';

import CardContainer from './CardContainer';
import DateFormatter from './DateFormatter';
import MyPageDropDown from './MyPageDropDown';

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

interface DropdownValue {
  value: string;
  clickEvent: () => void;
}

interface MyCommentCardProps {
  cardInfo: {
    totalPages: number;
    currentPage: number;
    totalItemCount: number;
    data: CommentCardItem[];
  };
  dropdownItem: DropdownValue[];
}

const MyCommentCard = ({ cardInfo, dropdownItem }: MyCommentCardProps) => {
  const { data } = cardInfo;
  return (
    <>
      {data.map(item => {
        return (
          <CardContainer
            key={item.id}
            className="flex h-264 w-full flex-col items-start justify-between rounded-2xl border border-line-100 bg-white p-24 shadow-[4px_4px_6px_rgba(212,212,212,0.1)] xl:max-w-476"
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
                <h3 className="text-xs font-medium text-black-400 lg:text-lg">
                  {item.post.title}
                </h3>
              </div>
              <MyPageDropDown items={dropdownItem} />
            </section>
            <section className="inline-flex flex-col gap-40">
              <p className="text-xs font-normal text-gray-500 lg:text-lg">
                {item.post.content}
              </p>
              <p className="text-md font-semibold text-black-400 lg:text-2lg">
                {item.content}
              </p>
            </section>
            <section className="flex w-full items-center justify-between">
              <div className="flex items-center gap-16 text-xs font-normal text-gray-500 lg:text-lg">
                <span>{DateFormatter(item.updatedAt)}</span>
              </div>
            </section>
          </CardContainer>
        );
      })}
    </>
  );
};

export default MyCommentCard;
