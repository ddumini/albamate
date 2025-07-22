import { differenceInCalendarDays, format } from 'date-fns';
import React from 'react';

import useViewport from '@/shared/hooks/useViewport';
import { cn } from '@/shared/lib/cn';

import { ApplyStatus } from '../../types/apply';

interface ApplyStateProps {
  status: ApplyStatus;
  createdAt: string;
  recruitmentEndDate: string;
}

const ApplyState = ({
  status,
  createdAt,
  recruitmentEndDate,
}: ApplyStateProps) => {
  const { isDesktop } = useViewport();

  const desktopStyle = isDesktop ? 'text-black' : '';

  // D-Day 계산
  const today = new Date();
  const recruitmentEnd = new Date(recruitmentEndDate);
  const daysLeft = differenceInCalendarDays(recruitmentEnd, today);
  const dDayString = daysLeft >= 0 ? `D-${daysLeft}` : '모집 마감';

  // 지원일시 포맷팅
  const applicationDate = format(new Date(createdAt), 'yyyy.MM.dd HH:mm');

  // 상태별 정보
  const getStatusInfo = (status: ApplyStatus) => {
    switch (status) {
      case 'INTERVIEW_PENDING':
        return { text: '면접 대기' };
      case 'INTERVIEW_COMPLETED':
        return { text: '면접 완료' };
      case 'HIRED':
        return { text: '채용 완료' };
      case 'REJECTED':
        return { text: '거절' };
      default:
        return { text: '알 수 없음' };
    }
  };

  const statusInfo = getStatusInfo(status);

  return (
    <div className="lg:rounded-lg lg:bg-gray-25 lg:p-24">
      {/* 지원 일시 */}
      <div className="flex items-center justify-between border-b border-gray-200 py-14">
        <div className="flex items-center gap-4">
          <span className="text-gray-400">지원 일시</span>
          {isDesktop && (
            <span
              className={cn(
                'ml-2 font-semibold',
                dDayString === '모집 마감' ? 'Text-error' : 'text-mint-400'
              )}
            >
              {dDayString}
            </span>
          )}
        </div>
        <span className={desktopStyle}>{applicationDate}</span>
      </div>

      {/* 진행 상태 */}
      <div className="flex items-center justify-between border-b border-gray-200 py-14 lg:border-b-0">
        <span className="text-gray-400">진행 상태</span>
        <span className={desktopStyle}>{statusInfo.text}</span>
      </div>
    </div>
  );
};

export default ApplyState;
