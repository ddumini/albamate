import Image from 'next/image';
import React from 'react';

import useViewport from '@/shared/hooks/useViewport'; // 너가 저장한 경로에 따라 수정
import { AlbaItemDetail } from '@/shared/types/albaDetail';
import { formatDateLong, formatDateShort } from '@/shared/utils/format';

interface AlbaInfoProps {
  item: AlbaItemDetail;
}

const getBorderClass = (idx: number) => {
  if (idx === 0) {
    return `
      border-b border-r border-gray-100 dark:border-gray-200 pt-0 
    `;
  }
  if (idx === 1) {
    return `border-b border-gray-100 dark:border-gray-200 pt-0`;
  }
  if (idx === 2) {
    return `border-r border-gray-100 dark:border-gray-200 items-end`;
  }
  return 'items-end';
};

const AlbaInfo: React.FC<AlbaInfoProps> = ({ item }) => {
  const { isDesktop } = useViewport();

  const period = isDesktop
    ? `${formatDateLong(item.recruitmentStartDate)} ~ ${formatDateLong(item.recruitmentEndDate)}`
    : `${formatDateShort(item.recruitmentStartDate)}~${formatDateShort(item.recruitmentEndDate)}`;

  const workDays = item.workDays.join(', ');
  const workTime = `${item.workStartTime}~${item.workEndTime}`;

  const Info = [
    {
      label: '시급',
      value: `${item.hourlyWage.toLocaleString()}원`,
      img: '/icons/coins.svg',
    },
    { label: '기간', value: period, img: '/icons/calendar-clock.svg' },
    { label: '요일', value: workDays, img: '/icons/calendar.svg' },
    { label: '시간', value: workTime, img: '/icons/clock.svg' },
  ];

  if (isDesktop) {
    // 데스크탑 레이아웃 (하나의 박스에 모두 표시)
    return (
      <div className="grid grid-cols-2 rounded-lg border border-gray-50 bg-gray-25 px-24 py-40">
        {Info.map(({ label, value, img }, idx) => (
          <div
            key={label}
            className={`relative flex h-130 justify-center ${getBorderClass(idx)}`}
          >
            <div className="flex h-108 w-250 gap-20 pt-16 pl-24">
              <div className="relative flex flex-shrink-0 items-center justify-center rounded-full bg-gray-50 lg:h-56 lg:w-56 dark:bg-gray-100">
                <div className="relative h-24 w-24 lg:h-36 lg:w-36">
                  <Image fill alt="icon" src={img} />
                </div>
              </div>

              <div className="ml-4">
                <div className="mb-8 text-sm text-gray-500">{label}</div>
                <div className="text-base font-bold text-teal-500">
                  {value || '미정'}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // 모바일/태블릿 레이아웃 (각 항목 개별 카드로 표시)
  return (
    <div className="grid grid-cols-2 gap-8">
      {Info.map(({ label, value, img }) => (
        <div
          key={label}
          className="flex w-full items-center justify-start gap-10 rounded-lg border border-gray-100 px-6 py-4"
        >
          <div className="relative h-24 w-24 flex-shrink-0 lg:h-36 lg:w-36">
            <div className="absolute inset-0 scale-120 rounded-2xl bg-gray-50 dark:bg-gray-100" />
            <Image
              fill
              alt="이미지"
              className="relative rounded-2xl"
              src={img}
            />
          </div>

          <div>
            <div className="Text-gray text-xs">{label}</div>
            <div className="Text-mint font-bold">{value || '협의 가능'}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AlbaInfo;
