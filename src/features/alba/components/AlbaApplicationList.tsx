'use client';

import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';

import { mockApplications } from '../mocks/mockApplicationData';

const getStatusLabel = (status: string) => {
  switch (status) {
    case 'PENDING':
      return '대기중';
    case 'REJECTED':
      return '거절됨';
    case 'ACCEPTED':
      return '승인됨';
    default:
      return '알수없음';
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'REJECTED':
      return 'text-error';
    case 'PENDING':
      return 'text-gray-500';
    case 'ACCEPTED':
      return 'text-blue-600';
    default:
      return 'Text-black';
  }
};

const getExperienceLabel = (months: number) => {
  if (months === 0) return '없음';

  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  if (years > 0 && remainingMonths > 0) {
    return `${years}년 ${remainingMonths}개월`;
  }

  if (years > 0) {
    return `${years}년`;
  }

  return `${remainingMonths}개월`;
};

const AlbaApplicationList = () => {
  const router = useRouter();

  const handleClick = (applicantId: number) => {
    router.push(`/applications/${applicantId}`);
  };

  return (
    <div className="max-w-640">
      <h2 className="mb-12 text-2lg font-bold lg:mb-24 lg:text-[26px]">
        지원 현황
      </h2>

      {/* 헤더 */}
      <div className="BorderB-gray grid grid-cols-[1fr_2fr_1fr_1fr] px-24 py-16 text-gray-400">
        <div className="flex items-center px-4">이름</div>
        <div className="flex items-center px-4">전화번호</div>
        <div>
          <div className="flex items-center gap-2">
            경력
            <Image
              alt="경력"
              className="lg:h-32 lg:w-32"
              height={24}
              src="/icons/array-outlined-descending.svg"
              width={24}
            />
          </div>
        </div>
        <div>
          <div className="flex items-center gap-2">
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
      </div>

      {/* 리스트 */}
      <ul className="Text-black">
        {mockApplications.map(applicant => (
          <li key={applicant.id} className="BorderB-gray p-20">
            <div className="grid grid-cols-[1fr_2fr_1fr_1fr] gap-4 text-sm lg:text-base">
              <button
                className="hover:text-mint-500 text-left underline underline-offset-2"
                type="button"
                onClick={() => handleClick(applicant.applicantId)}
              >
                {applicant.name}
              </button>
              <div className="whitespace-nowrap">{applicant.phoneNumber}</div>
              <div>{getExperienceLabel(applicant.experienceMonths)}</div>
              <div className={getStatusColor(applicant.status)}>
                {getStatusLabel(applicant.status)}
              </div>
            </div>
          </li>
        ))}
      </ul>
      <ul className="Text-black">
        {mockApplications.map(applicant => (
          <li key={applicant.id} className="BorderB-gray p-20">
            <div className="grid grid-cols-[1fr_2fr_1fr_1fr] gap-4 text-sm lg:text-base">
              <div className="underline underline-offset-2">
                {applicant.name}
              </div>
              <div className="whitespace-nowrap">{applicant.phoneNumber}</div>
              <div>{getExperienceLabel(applicant.experienceMonths)}</div>

              <div className={getStatusColor(applicant.status)}>
                {getStatusLabel(applicant.status)}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AlbaApplicationList;
