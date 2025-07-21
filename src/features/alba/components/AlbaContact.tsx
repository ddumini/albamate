import { differenceInCalendarDays } from 'date-fns';
import React from 'react';

import { cn } from '@/shared/lib/cn';

import { MockAlbaItem } from '../types/MockAlbaItem';

interface AlbaContactProps {
  item: MockAlbaItem;
}

const formatDateShort = (isoString: string) => {
  const date = isoString.slice(0, 10);
  const [year, month, day] = date.split('-');
  const monthStr = month?.padStart(2, '0'); // 1자리면 0붙임
  const dayStr = day?.padStart(2, '0');
  return `${year}.${monthStr}. ${dayStr}.`;
};

const AlbaContact: React.FC<AlbaContactProps> = ({ item }) => {
  const today = new Date();

  const recruitmentEnd = new Date(item.recruitmentEndDate);
  const daysLeft = differenceInCalendarDays(recruitmentEnd, today);

  const period = `${formatDateShort(item.recruitmentStartDate)} ~ ${formatDateShort(item.recruitmentEndDate)}`;
  const dDayString = daysLeft >= 0 ? `D-${daysLeft}` : '모집 마감';

  const infoData = [
    {
      name: '모집기간',
      value: <span className="ml-2">{period}</span>,
      isPeriod: true,
    },
    {
      name: '가게 전화번호',
      value: item.storePhoneNumber,
    },
    {
      name: '사장님 연락처',
      value: item.phoneNumber,
    },
  ];

  return (
    <div className="max-w-md">
      {infoData.map(({ name, value, isPeriod }) => (
        <div
          key={name}
          className="flex justify-between border-b border-gray-200 py-14"
        >
          <div className="flex items-center gap-8 text-gray-400">
            {name}
            {isPeriod && (
              <div
                className={cn(
                  'ml-2',
                  dDayString === '모집 마감' ? 'Text-error' : 'text-mint-400'
                )}
              >
                {dDayString}
              </div>
            )}
          </div>
          <div>{value}</div>
        </div>
      ))}
    </div>
  );
};

export default AlbaContact;
