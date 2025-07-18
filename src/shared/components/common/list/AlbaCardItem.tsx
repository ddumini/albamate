'use client';

import Chip from '@common/chip/Chip';
import AlbaDropdown from '@common/list/AlbaDropdown';
import { differenceInCalendarDays, format, isAfter } from 'date-fns';
import Image from 'next/image';
import { useRef, useState } from 'react';

import { useClickOutside } from '@/shared/hooks/useClickOutside';
import { cn } from '@/shared/lib/cn';
import { AlbaItem } from '@/shared/types/alba';

export interface DropdownOption {
  label: string;
  onClick: () => void;
}

interface Props {
  item: AlbaItem;
  onClick: () => void;
  dropdownOptions: DropdownOption[];
}

const AlbaCardItem = ({ item, onClick, dropdownOptions }: Props) => {
  const start = new Date(item.recruitmentStartDate);
  const end = new Date(item.recruitmentEndDate);
  const dDay = differenceInCalendarDays(end, new Date());
  const isRecruiting = isAfter(end, new Date());

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useClickOutside(dropdownRef, () => setOpen(false));

  // 마감일에 따른 클래스 설정
  const dDayClass = cn(
    'px-25 whitespace-nowrap lg:px-48',
    dDay < 0 && 'text-gray-400',
    dDay >= 0 && dDay <= 3 && 'text-error brightness-150 font-semibold',
    dDay > 3 && 'text-gray-600 hover:text-gray-900'
  );

  // 알바 카드의 통계 정보
  const stats = [
    {
      label: '지원자',
      value: `${item.applyCount}명`,
    },
    {
      label: '스크랩',
      value: `${item.scrapCount}명`,
    },
    {
      label: dDay < 0 ? '마감 완료' : `마감 D-${dDay}`,
      isDeadline: true,
    },
  ];

  return (
    <div
      className="Border-Card cursor-pointer flex-col gap-8 rounded-2xl p-24 transition-all duration-300 hover:scale-[1.01] hover:shadow-lg"
      onClick={onClick}
    >
      <div className="relative flex h-180 w-full justify-end overflow-hidden rounded-lg">
        <Image
          fill
          alt="알바 이미지"
          className="object-cover"
          src={item.imageUrls?.[0] || '/icons/user.svg'}
        />
      </div>

      <div className="relative mt-12 flex items-center gap-8 text-sm">
        {item.isPublic && <Chip active label="공개" variant="filled" />}
        <Chip
          active
          label={isRecruiting ? '모집 중' : '모집 완료'}
          variant="filled"
        />
        <span className="Text-gray ml-8 whitespace-nowrap">
          {format(start, 'yyyy.MM.dd')} ~ {format(end, 'yyyy.MM.dd')}
        </span>
        <div ref={dropdownRef} className="relative ml-auto">
          <Image
            alt="드롭다운 아이콘"
            className="cursor-pointer"
            height={24}
            src="/icons/kebab-menu.svg"
            width={24}
            onClick={e => {
              e.stopPropagation();
              setOpen(prev => !prev);
            }}
          />
          {open && <AlbaDropdown options={dropdownOptions} />}
        </div>
      </div>

      <h3 className="Text-black mt-12 text-lg font-semibold">{item.title}</h3>

      <div className="mt-12 flex w-full justify-center rounded-lg bg-gray-25 py-6 text-xs text-gray-600 dark:bg-gray-50">
        {stats.map((stat, idx) => (
          <span
            key={stat.label}
            className={cn(
              'px-24 whitespace-nowrap lg:px-48',
              idx !== stats.length - 1 && 'border-r border-gray-200',
              stat.isDeadline && dDayClass
            )}
          >
            {!stat.isDeadline ? (
              <>
                {stat.label}{' '}
                <span className="hover:brightness-150">{stat.value}</span>
              </>
            ) : (
              stat.label
            )}
          </span>
        ))}
      </div>
    </div>
  );
};

export default AlbaCardItem;
