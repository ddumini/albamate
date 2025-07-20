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

/**
 * 단일 알바 카드 컴포넌트
 *
 * @param {AlbaItem} item - 알바 정보 (제목, 이미지, 모집기간, 지원자 수 등)
 * @param {() => void} onClick - 카드 전체 클릭 시 실행할 함수 (예: 상세 페이지 이동)
 * @param {DropdownOption[]} dropdownOptions - 카드 우측 상단 드롭다운의 옵션 목록
 *
 * 사용 예시
 * <AlbaCard key={`${item.id}-${item.recruitmentEndDate}`} item={item} />
 *
 */
const AlbaCardItem = ({ item, onClick, dropdownOptions }: Props) => {
  const start = new Date(item.recruitmentStartDate);
  const end = new Date(item.recruitmentEndDate);
  const dDay = differenceInCalendarDays(end, new Date());
  const isRecruiting = isAfter(end, new Date());

  const [imgSrc, setImgSrc] = useState(
    item.imageUrls?.[0] || '/icons/user.svg'
  );
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
          src={imgSrc}
          onError={() => setImgSrc('/icons/user.svg')}
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
