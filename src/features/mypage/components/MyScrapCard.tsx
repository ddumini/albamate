'use client';

import { isAfter } from 'date-fns';
import Image from 'next/image';

import { ScrapInfo } from '@/shared/types/mypage';

import Chip from '../../../shared/components/common/chip/Chip';
import { DropdownValue, ScrapItem } from '../../../shared/types/mypage';
import CardContainer from './CardContainer';
import DateFormatter from './DateFormatter';
import MyPageDropDown from './MyPageDropDown';

interface MyScrapCardProps {
  cardContent: ScrapInfo;
  dropdownItem: DropdownValue[];
}

const MyScrapCard = ({ cardContent, dropdownItem }: MyScrapCardProps) => {
  const { data } = cardContent;
  return (
    <>
      {data.map((item: ScrapItem) => {
        const imgSrc = item.imageUrls[0]
          ? item?.imageUrls[0]
          : '/images/logo.svg';
        const isRecruiting = isAfter(item.recruitmentEndDate, new Date());
        return (
          <CardContainer
            key={item.id}
            className="flex h-264 w-full flex-col items-start justify-between border border-line-100 bg-white shadow-[4px_4px_6px_rgba(212,212,212,0.1)] xl:max-w-476"
          >
            {/* Card top */}
            <section className="relative flex h-304 w-full items-center justify-between">
              <Image fill alt="공고 이미지" src={imgSrc} />
            </section>
            {/* Card body */}
            <section>
              <div>
                <div>
                  <Chip
                    active
                    label={isRecruiting ? '비공개' : '공개'}
                    variant="filled"
                  />
                  <Chip
                    active
                    label={item.isPublic ? '모집중' : '모집마감'}
                    variant="filled"
                  />
                </div>
              </div>
              <h3 className="text-lg font-medium text-black-400">
                {item.title}
              </h3>
              {DateFormatter(item.updatedAt)}
              <MyPageDropDown items={dropdownItem} />
              <p className="text-lg font-normal text-gray-500">{item.title}</p>
            </section>
            {/* Card footer */}
            <section className="flex w-full items-center justify-between">
              {item.applyCount}
              {item.scrapCount}
              {item.recruitmentEndDate}
            </section>
          </CardContainer>
        );
      })}
    </>
  );
};

export default MyScrapCard;
