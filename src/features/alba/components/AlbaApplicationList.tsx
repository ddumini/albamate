'use client';

import Image from 'next/image';
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

const ApplicationList = () => {
  return (
    <div className="max-w-640">
      <h2 className="mb-6 text-2lg font-bold lg:text-[26px]">지원 현황</h2>

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
          <li key={applicant.id} className="BorderB-gray p-24">
            <div className="grid grid-cols-[1fr_2fr_1fr_1fr] gap-4 text-sm lg:text-base">
              <div className="underline underline-offset-2">
                {applicant.name}
              </div>
              <div className="whitespace-nowrap">{applicant.phoneNumber}</div>
              <div>{applicant.experienceMonths}개월</div>
              <div className="text-blue-600">
                {getStatusLabel(applicant.status)}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ApplicationList;
