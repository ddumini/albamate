import Image from 'next/image';
import React from 'react';

import useViewport from '@/shared/hooks/useViewport'; // 너가 저장한 경로에 따라 수정

import { MockAlbaItem } from '../types/MockAlbaItem';

interface AlbaInfoProps {
  item: MockAlbaItem;
}

const formatDate = (isoString: string, isDesktop: boolean) => {
  const date = isoString.slice(0, 10);
  const [year, month, day] = date.split('-');
  return isDesktop
    ? `${year?.slice(2)}.${month}.${day}` // 24.10.25
    : `${year}년 ${month}월 ${day}일`; // 2024년 10월 25일 (예시)
};

const AlbaInfo: React.FC<AlbaInfoProps> = ({ item }) => {
  const { isDesktop } = useViewport();

  const period = `${formatDate(item.recruitmentStartDate, isDesktop)} ~ ${formatDate(item.recruitmentEndDate, isDesktop)}`;

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
      <div className="grid max-w-640 grid-cols-2 gap-36 rounded-lg border border-gray-100 bg-gray-25 p-36 font-sans">
        {Info.map(({ label, value, img }) => (
          <div
            key={label}
            className="mx-60 flex items-center justify-start gap-16"
          >
            {/* 아이콘 */}
            <div className="relative h-24 w-24 shrink-0 lg:h-36 lg:w-36">
              <div className="absolute inset-0 scale-120 rounded-2xl bg-gray-50 dark:bg-gray-100" />
              <Image
                fill
                alt="icon"
                className="relative rounded-xl"
                src={img}
              />
            </div>

            {/* 텍스트 */}
            <div className="ml-2 lg:ml-4">
              <div className="text-sm text-gray-500">{label}</div>
              <div className="text-base font-bold text-teal-500">{value}</div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // 모바일/태블릿 레이아웃 (각 항목 개별 카드로 표시)
  return (
    <div className="grid grid-cols-2 gap-8 font-sans">
      {Info.map(({ label, value, img }) => (
        <div
          key={label}
          className="flex w-full items-center justify-start gap-10 rounded-lg border border-gray-100 px-6 py-4"
        >
          <div className="relative h-24 w-24 lg:h-36 lg:w-36">
            <div className="absolute inset-0 scale-120 rounded-2xl bg-gray-50 dark:bg-gray-100" />
            <Image
              fill
              alt="이미지"
              className="relative rounded-2xl"
              src={img}
            />
          </div>

          <div>
            <div className="Text-gray">{label}</div>
            <div className="Text-mint font-bold">{value}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AlbaInfo;
