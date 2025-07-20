import Image from 'next/image';
import React from 'react';

import { MockAlbaItem } from '../types/MockAlbaItem';

interface AlbaInfoProps {
  item: MockAlbaItem;
}

const formatDate = (isoString: string) => {
  const date = isoString.slice(0, 10);
  const [year, month, day] = date.split('-');
  return `${year?.slice(2)}.${month}.${day}`;
};

const AlbaInfo: React.FC<AlbaInfoProps> = ({ item }) => {
  const period = `${formatDate(item.recruitmentStartDate)}~${formatDate(item.recruitmentEndDate)}`;
  const workDays = item.workDays.join(', ');
  const workTime = `${item.workStartTime} ~ ${item.workEndTime}`;

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
