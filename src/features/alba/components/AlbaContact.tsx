import { differenceInCalendarDays } from 'date-fns';
import React from 'react';

import useViewport from '@/shared/hooks/useViewport'; // 너가 만든 훅 경로 맞게 수정
import { cn } from '@/shared/lib/cn';
import { formatDateLong, formatPhoneNumber } from '@/shared/utils/format';

import { MockAlbaItem } from '../types/MockAlbaItem';

interface AlbaContactProps {
  item: MockAlbaItem;
}

const AlbaContact: React.FC<AlbaContactProps> = ({ item }) => {
  const { isDesktop } = useViewport();

  const today = new Date();
  const recruitmentEnd = new Date(item.recruitmentEndDate);
  const daysLeft = differenceInCalendarDays(recruitmentEnd, today);

  const period = `${formatDateLong(item.recruitmentStartDate)} ~ ${formatDateLong(item.recruitmentEndDate)}`;
  const dDayString = daysLeft >= 0 ? `D-${daysLeft}` : '모집 마감';

  const infoData = [
    {
      name: '모집기간',
      value: <span>{period}</span>,
      isPeriod: true,
    },
    {
      name: '가게 전화번호',
      value: formatPhoneNumber(item.storePhoneNumber, false),
    },
    {
      name: '사장님 연락처',
      value: formatPhoneNumber(item.phoneNumber, true),
    },
  ];

  if (isDesktop) {
    // 데스크탑 레이아웃 (가로 정렬, 여유있게)
    return (
      <div className="max-w-640 rounded-lg border border-gray-50 bg-gray-25 p-24">
        {infoData.map(({ name, value, isPeriod }) => (
          <div key={name} className="flex justify-between py-32">
            <div className="flex items-center gap-8 text-gray-500">
              {name}
              {isPeriod && (
                <div
                  className={cn(
                    'ml-12 font-semibold',
                    dDayString === '모집 마감' ? 'Text-error' : 'text-mint-400'
                  )}
                >
                  {dDayString}
                </div>
              )}
            </div>
            <div className="text-black">{value}</div>
          </div>
        ))}
      </div>
    );
  }

  // 모바일/태블릿 레이아웃 (세로 정렬)
  return (
    <div>
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
                  'ml-2 font-semibold',
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
