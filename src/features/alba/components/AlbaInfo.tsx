import Image from 'next/image';
import React from 'react';

import useViewport from '@/shared/hooks/useViewport'; // 너가 저장한 경로에 따라 수정
import { formatDateLong, formatDateShort } from '@/shared/utils/format';

import { MockAlbaItem } from '../types/MockAlbaItem';

interface AlbaInfoProps {
  item: MockAlbaItem;
}

const getBorderClass = (idx: number) => {
  if (idx === 0) {
    // 1번 요소: 오른쪽 선 + 아래쪽 선, 선을 요소에서 8px 떨어뜨림
    return `
      after:absolute after:top-0 after:right-[-32px] after:h-[calc(100%+40px)] after:w-[1px] after:bg-gray-100 dark:after:bg-gray-200
      before:absolute before:bottom-[-8px] before:left-[-28px] before:h-[1px] before:w-[calc(100%+120px)] before:bg-gray-100 dark:before:bg-gray-200 
    `;
  }
  if (idx === 1) {
    // 2번 요소: 아래쪽 선만 (좌측으로 8px 더 확장)
    return `after:absolute after:bottom-[-8px] after:left-[-80px] after:h-[1px] after:w-[calc(100%+100px)] after:bg-gray-100 dark:after:bg-gray-200`;
  }
  if (idx === 2) {
    // 3번 요소: 오른쪽 선만 (위쪽으로 8px 더 확장)
    return `after:absolute after:top-[-26px] after:right-[-32px] after:h-[calc(100%+36px)] after:w-[1px] after:bg-gray-100 dark:after:bg-gray-200`;
  }
  return '';
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
      <div className="grid h-336 max-w-640 grid-cols-2 gap-36 rounded-lg border border-gray-50 bg-gray-25 p-40">
        {Info.map(({ label, value, img }, idx) => (
          <div
            key={label}
            className={`relative mx-30 flex items-center justify-start gap-20 p-4 ${getBorderClass(idx)}`}
          >
            <div className="relative h-36 w-36 flex-shrink-0 lg:h-40 lg:w-40">
              <div className="absolute inset-[-5px] rounded-3xl bg-gray-50 dark:bg-gray-100" />
              <Image fill alt="icon" objectFit="cover" src={img} />
            </div>

            <div className="ml-4">
              <div className="text-sm text-gray-500">{label}</div>
              <div className="text-base font-bold text-teal-500">
                {value || '미정'}
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
