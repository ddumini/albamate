'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useMemo, useState } from 'react';

import {
  getExperienceLabel,
  getStatusColor,
  getStatusLabel,
} from '@/shared/utils/application';

import { mockApplications } from '../mocks/mockApplicationData';

const AlbaApplicationList = () => {
  const [visibleCount, setVisibleCount] = useState(5); // 보여줄 개수

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 5); // 5개씩 추가로 보여줌
  };

  const visibleApplications = useMemo(() => {
    return mockApplications.slice(0, visibleCount);
  }, [visibleCount]);

  const hasMore = visibleCount < mockApplications.length;

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
        </div>
        <div>
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
      </div>

      {/* 리스트 */}
      <ul className="Text-black">
        {visibleApplications.map(applicant => (
          <li key={applicant.id} className="BorderB-gray p-20">
            <div className="grid grid-cols-[1fr_2fr_1fr_1fr] gap-4 text-sm lg:text-base">
              <Link
                className="hover:text-mint-500 text-left underline underline-offset-2"
                href={`/applications/${applicant.applicantId}`}
              >
                {applicant.name}
              </Link>
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
            className="bg-mint-500 hover:bg-mint-600 w-100 rounded border border-gray-300 text-white lg:w-200"
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

export default AlbaApplicationList;
