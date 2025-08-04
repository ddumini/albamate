import React from 'react';

import useViewport from '@/shared/hooks/useViewport'; // 너가 만든 훅 경로 맞게 수정
import { cn } from '@/shared/lib/cn';
import { AlbaItemDetail } from '@/shared/types/albaDetail';
import {
  formatDateLong,
  formatPhoneNumber,
  getDDayString,
} from '@/shared/utils/format';

interface AlbaContactProps {
  item: AlbaItemDetail;
}

const AlbaContact: React.FC<AlbaContactProps> = ({ item }) => {
  const { isDesktop } = useViewport();

  const period = `${formatDateLong(item.recruitmentStartDate)} ~ ${formatDateLong(item.recruitmentEndDate)}`;
  const dDayString = getDDayString(item.recruitmentEndDate);

  const infoData = [
    {
      name: '모집기간',
      value: <span>{period}</span>,
      isPeriod: true,
    },
    {
      name: '가게 전화번호',
      value: formatPhoneNumber(item.storePhoneNumber),
    },
    {
      name: '사장님 연락처',
      value: formatPhoneNumber(item.phoneNumber),
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
            <div className="text-black">{value || '없음'}</div>
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
          <div>{value || '없음'}</div>
        </div>
      ))}
    </div>
  );
};

export default AlbaContact;
