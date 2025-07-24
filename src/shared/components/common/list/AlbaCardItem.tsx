'use client';

import AlbaDropdown from '@common/list/AlbaDropdown';
import { differenceInCalendarDays } from 'date-fns';
import Image from 'next/image';
import { useRef, useState } from 'react';

import { OwnerMyAlbaItem } from '@/features/myalbalist/types/myalbalist';
import { useClickOutside } from '@/shared/hooks/useClickOutside';
import { cn } from '@/shared/lib/cn';
import { AlbaItem } from '@/shared/types/alba';
import { formatDateLong } from '@/shared/utils/format';
import { getPublicLabel, getStatusLabel } from '@/shared/utils/label';

export interface DropdownOption {
  label: string;
  onClick: () => void;
}

interface Props {
  item: AlbaItem | OwnerMyAlbaItem;
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
  const {
    title,
    isPublic,
    recruitmentStartDate,
    recruitmentEndDate,
    imageUrls,
    applyCount,
    scrapCount,
  } = item;
  const [imgSrc, setImgSrc] = useState(imageUrls?.[0] || '/icons/user.svg');
  const [open, setOpen] = useState(false);
  const dDay = differenceInCalendarDays(recruitmentEndDate, new Date());
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useClickOutside(dropdownRef, () => setOpen(false));

  // 마감일에 따른 클래스 설정
  const dDayClass = cn(
    dDay < 0 && 'text-gray-400',
    dDay >= 0 && dDay <= 3 && 'text-error brightness-150 font-semibold',
    dDay > 3 && 'text-gray-600 hover:text-gray-900'
  );

  // 알바 카드의 통계 정보
  const stats = [
    {
      label: '지원자',
      value: `${applyCount}명`,
    },
    {
      label: '스크랩',
      value: `${scrapCount}명`,
    },
    {
      label: dDay < 0 ? '마감 완료' : `마감 D-${dDay}`,
      isDeadline: true,
    },
  ];

  return (
    <div
      className="Border-Card cursor-pointer flex-col gap-8 rounded-2xl p-16 transition-all duration-300 hover:scale-[1.01] hover:shadow-lg"
      onClick={onClick}
    >
      <div className="relative flex aspect-[1/0.637] w-full justify-end overflow-hidden rounded-lg border border-line-200 dark:border-transparent">
        <Image
          fill
          alt="알바 이미지"
          className="object-cover"
          src={imgSrc}
          onError={() => setImgSrc('/icons/user.svg')}
        />
      </div>

      <div className="relative mt-12 flex items-center gap-8 pb-30 text-sm xs:pt-0">
        {getPublicLabel(isPublic)}
        {getStatusLabel(recruitmentEndDate)}
        <span className="Text-gray absolute bottom-0 left-0 whitespace-nowrap xs:static">
          {formatDateLong(recruitmentStartDate)} ~{' '}
          {formatDateLong(recruitmentEndDate)}
        </span>
        <div ref={dropdownRef} className="relative ml-auto flex-shrink-0">
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

      <h3 className="Text-black mt-12 text-lg font-semibold">{title}</h3>

      <div className="mt-12 flex h-38 w-full justify-center rounded-lg bg-gray-25 text-xs text-gray-600 lg:h-50 dark:bg-gray-50">
        {stats.map((stat, idx) => (
          <span
            key={stat.label}
            className={cn(
              'relative flex flex-1 items-center justify-center whitespace-nowrap',
              idx !== stats.length - 1 &&
                'after:absolute after:top-1/2 after:right-0 after:h-14 after:w-1 after:-translate-y-1/2 after:bg-gray-100',
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
