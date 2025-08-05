import Image from 'next/image';
import React from 'react';

import Tooltip from '@/shared/components/common/tooltip/Tooltip';
import { useSessionUtils } from '@/shared/lib/auth/use-session-utils';
import { cn } from '@/shared/lib/cn';
import useModalStore from '@/shared/store/useModalStore';
import { getStatusColor, getStatusLabel } from '@/shared/utils/application';
import { formatDateTime, getDDayString } from '@/shared/utils/format';

import { ApplicationStatus } from '../../types/application';
import ApplicationStateModal from './ApplicationStateModal';

interface ApplicationStateProps {
  status: ApplicationStatus;
  createdAt: string;
  recruitmentEndDate: string;
  applicationId: string;
}

const ApplicationState = ({
  status,
  createdAt,
  recruitmentEndDate,
  applicationId,
}: ApplicationStateProps) => {
  const { isOwner } = useSessionUtils();
  // D-Day 계산
  const dDayString = getDDayString(recruitmentEndDate);

  // 지원일시 포맷팅
  const applicationDate = formatDateTime(createdAt);

  const statusInfo = getStatusLabel(status);
  const statusColor = getStatusColor(status);

  const { openModal } = useModalStore();

  const handleApplyStateModal = () => {
    openModal(
      <ApplicationStateModal
        applicationId={applicationId}
        currentStatus={status}
      />
    );
  };

  return (
    <div className="lg:rounded-lg lg:bg-gray-25 lg:p-24">
      {/* 지원 일시 */}
      <div className="flex items-center justify-between border-b border-gray-200 py-14">
        <div className="flex items-center gap-4">
          <span className="text-gray-400">지원 일시</span>
          <span
            className={cn(
              'ml-2 hidden font-semibold lg:block',
              dDayString === '모집 마감' ? 'Text-error' : 'text-mint-400'
            )}
          >
            {dDayString}
          </span>
        </div>
        <span className="lg:text-black">{applicationDate}</span>
      </div>

      {/* 진행 상태 */}
      <div className="flex w-full items-center justify-between border-b border-gray-200 py-14 lg:border-b-0">
        <div className="flex items-center gap-2">
          <span className="text-gray-400">진행 상태</span>
          {isOwner && (
            <Tooltip
              content={
                <div className="flex items-center gap-2">
                  <div className="relative h-24 w-24 md:h-30 md:w-30">
                    <Image fill alt="info" src="/icons/info.svg" />
                  </div>
                  <span className="text-xs md:text-md">
                    알바폼 현재 진행상태를 변경할 수 있어요!
                  </span>
                </div>
              }
            >
              <button
                aria-label="진행 상태 수정"
                className="flex"
                type="button"
                onClick={handleApplyStateModal}
              >
                <Image
                  alt="수정 아이콘"
                  height={24}
                  src="/icons/edit.svg"
                  width={24}
                />
              </button>
            </Tooltip>
          )}
        </div>
        <span className={statusColor}>{statusInfo}</span>
      </div>
    </div>
  );
};

export default ApplicationState;
