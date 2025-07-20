'use client';

import { format } from 'date-fns';
import React from 'react';

interface AlbaStateProps {
  isPublic: boolean;
  recruitmentStartDate: string;
  recruitmentEndDate: string;
  storeName: string;
  location: string;
  preferred: string;
  title: string;
  scrapCount: number;
  applyCount: number;
}

const AlbaState = ({
  isPublic,
  recruitmentStartDate,
  recruitmentEndDate,
  storeName,
  location,
  preferred,
  title,
  scrapCount,
  applyCount,
}: AlbaStateProps) => {
  const getStatusLabel = (isPublic: boolean, recruitmentEndDate: string) => {
    if (!isPublic) return '비공개';
    return new Date(recruitmentEndDate) > new Date() ? '모집중' : '모집 마감';
  };

  const statusLabel = getStatusLabel(isPublic, recruitmentEndDate);

  const formattedStart = format(new Date(recruitmentStartDate), 'yyyy.MM.dd');
  const formattedEnd = format(new Date(recruitmentEndDate), 'yyyy.MM.dd');

  return (
    <div className="space-y-2 text-sm text-gray-800">
      {/* 1. 공개/모집여부 */}
      <div className="inline-block rounded bg-blue-500 px-2 py-1 text-xs font-medium text-white">
        {statusLabel}
      </div>

      {/* 2. 모집 날짜 범위 */}
      <div>{`${formattedStart} ~ ${formattedEnd}`}</div>

      {/* 3. 가게 이름, 위치, 우대사항 */}
      <div>{`${storeName} · ${location} · ${preferred}`}</div>

      {/* 4. 알바 제목 (굵게) */}
      <div className="text-base font-bold">{title}</div>

      {/* 5. 스크랩, 지원 현황 */}
      <div className="mt-1">
        <p>스크랩 {scrapCount}회</p>
        <p>현재까지 {applyCount}명이 알바폼에 지원했어요!</p>
      </div>
    </div>
  );
};

export default AlbaState;
