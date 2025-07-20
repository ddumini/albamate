'use client';

import { differenceInCalendarDays, isAfter } from 'date-fns';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { cn } from '@/shared/lib/cn';

import Chip from '../../../shared/components/common/chip/Chip';
import PrivateWrapper from '../../../shared/components/common/PrivateWrapper';
import { DropdownValue, ScrapCardItem } from '../../../shared/types/mypage';
import DateFormatter from './DateFormatter';
import MyPageDropDown from './MyPageDropDown';

interface MyScrapCardProps {
  cardContent: ScrapCardItem;
  dropdownItem: DropdownValue[];
}

const MyScrapCard = ({ cardContent, dropdownItem }: MyScrapCardProps) => {
  const router = useRouter();

  const imgSrc = cardContent.imageUrls[0]
    ? cardContent?.imageUrls[0]
    : '/images/logo.svg';
  const isRecruiting = isAfter(cardContent.recruitmentEndDate, new Date());
  const dDay = differenceInCalendarDays(
    cardContent.recruitmentEndDate,
    new Date()
  );

  const dDayFormat = () => {
    if (dDay < 0) {
      return '마감완료';
    }

    return `마감 D-${dDay}`;
  };

  const handleCardClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    const isInteractiveElement =
      target.closest('button') ||
      target.closest('[role="button"]') ||
      target.closest('[role="menu"]');

    if (isInteractiveElement) {
      return;
    }

    router.push(`/apply/${cardContent.id}`);
  };

  return (
    <PrivateWrapper className="w-327 md:w-476" isPrivate={cardContent.isPublic}>
      <div
        key={cardContent.id}
        className="flex h-390 w-327 flex-col items-start justify-start gap-24 rounded-2xl p-3 transition-all duration-300 hover:scale-[1.01] hover:shadow-lg md:h-full md:w-full md:max-w-476"
        onClick={handleCardClick}
      >
        {/* Card top */}
        <section className="relative flex h-208 w-full items-center justify-between rounded-2xl shadow-md md:h-304">
          <Image fill alt="공고 이미지" src={imgSrc} />
        </section>
        {/* Card body */}
        <section className="mb-32 flex w-full flex-col justify-start">
          <div className="mb-16 inline-flex w-full items-center md:mb-24">
            <div className="mr-8 inline-flex items-center gap-8">
              <Chip
                active
                label={cardContent.isPublic ? '비공개' : '공개'}
                variant="filled"
              />
              <Chip
                active
                label={isRecruiting ? '모집중' : '모집마감'}
                variant="filled"
              />
            </div>
            <div className="Text-gray inline-flex flex-1 items-center text-md lg:text-lg">
              <span>{DateFormatter(cardContent.recruitmentStartDate)}</span> ~
              <span>{DateFormatter(cardContent.recruitmentEndDate)}</span>
            </div>
            <div className="self-end">
              <MyPageDropDown items={dropdownItem} />
            </div>
          </div>
          <h3 className="Text-black text-lg font-medium">
            {cardContent.title}
          </h3>
        </section>
        {/* Card footer */}
        <section className="relative bottom-0 flex w-full items-center justify-between rounded-2xl border border-line-100 bg-gray-25 px-43 py-12 text-xs text-black-200 md:text-lg dark:bg-gray-50">
          <span className="w-1/3 text-center">
            지원자 {cardContent.applyCount}명
          </span>
          <span className="inline-flex h-16 w-1 bg-line-200" />
          <span className="w-1/3 text-center">
            스크랩 {cardContent.scrapCount}명
          </span>
          <span className="inline-flex h-16 w-1 bg-line-200" />
          <span
            className={cn('w-1/3 text-center', dDay <= 5 && 'brightness-150')}
          >
            {dDayFormat()}
          </span>
        </section>
      </div>
    </PrivateWrapper>
  );
};

export default MyScrapCard;
