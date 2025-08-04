'use client';

import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import React, { useMemo, useState } from 'react';

import albaApi from '@/features/alba/api/albaApi';
import Tooltip from '@/shared/components/common/tooltip/Tooltip';
import LoadingSpinner from '@/shared/components/ui/LoadingSpinner';
import {
  getExperienceLabel,
  getStatusColor,
  getStatusLabel,
} from '@/shared/utils/application';

interface Applicant {
  id: number;
  applicantId: number;
  name: string;
  phoneNumber: string;
  experienceMonths: number;
  status: 'HIRED' | 'INTERVIEW_PENDING' | 'INTERVIEW_ACCEPTED' | 'REJECTED'; // 필요한 경우 추가
  introduction: string;
  resumeId: number;
  resumeName: string;
  createdAt: string;
  updatedAt: string;
}

interface ApplicantListProps {
  formId: number;
}

const ApplicationList = ({ formId }: ApplicantListProps) => {
  const [visibleCount, setVisibleCount] = useState(5);

  const { getApplications } = albaApi();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['applications', formId],
    queryFn: () => getApplications(formId),
  });

  // 매 렌더마다 새롭게 생성되는 불필요한 재계산 방지 및 구조 개선
  const { applications, visibleApplications } = useMemo(() => {
    const list: Applicant[] = data?.data?.data ?? [];
    return {
      applications: list,
      visibleApplications: list.slice(0, visibleCount),
    };
  }, [data, visibleCount]);

  const hasMore = visibleCount < applications.length;

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 5);
  };

  if (isLoading)
    return (
      <div className="flex justify-center">
        <LoadingSpinner size="sm" />
      </div>
    );
  if (isError)
    return (
      <div className="max-w-640">
        <h2 className="mb-60 text-2lg font-bold lg:mb-120 lg:text-[26px]">
          지원 현황
        </h2>

        <div className="text-center text-error">지원자가 아직 없어요!</div>
      </div>
    );

  return (
    <div className="max-w-640">
      <h2 className="mb-12 text-2lg font-bold lg:mb-24 lg:text-[26px]">
        지원 현황
      </h2>

      {/* 헤더 */}
      <div className="grid grid-cols-[1fr_2fr_1fr_1fr] border-b border-gray-100 px-16 py-16 text-gray-400 dark:border-gray-400">
        <div className="flex items-center px-4">이름</div>
        <div className="flex items-center px-4">전화번호</div>
        <div className="flex items-center gap-8">
          경력
          <Image
            alt="경력"
            className="lg:h-32 lg:w-32"
            height={24}
            src="/icons/array-outlined-descending.svg"
            width={24}
          />
        </div>
        <div className="flex items-center gap-8">
          상태
          <Image
            alt="상태"
            className="lg:h-32 lg:w-32"
            height={24}
            src="/icons/array-outlined.svg"
            width={24}
          />
        </div>
      </div>

      {/* 리스트 */}
      <ul className="Text-black">
        {visibleApplications.map(applicant => (
          <li key={applicant.id} className="BorderB-gray p-20">
            <div className="grid grid-cols-[1fr_2fr_1fr_1fr] gap-4 text-sm lg:text-base">
              <Tooltip content="지원자 상세 정보를 확인할 수 있습니다.">
                <Link
                  className="hover:text-mint-500 text-left underline underline-offset-2"
                  href={`/application/${applicant.id}/form/${formId}`}
                >
                  {applicant.name}
                </Link>
              </Tooltip>
              <div className="whitespace-nowrap">{applicant.phoneNumber}</div>
              <div>{getExperienceLabel(applicant.experienceMonths)}</div>
              <div className={getStatusColor(applicant.status)}>
                {getStatusLabel(applicant.status)}
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* 더보기 버튼 */}
      {hasMore && (
        <div className="mt-20 text-center">
          <button
            className="w-100 rounded border border-gray-300 hover:brightness-80 lg:w-200"
            type="button"
            onClick={handleLoadMore}
          >
            더보기
          </button>
        </div>
      )}
    </div>
  );
};

export default ApplicationList;
