'use client';

import Chip from '@common/chip/Chip';
import { format } from 'date-fns';
import Image from 'next/image';
import React from 'react';

import { MockAlbaItem } from '@/features/alba/types/MockAlbaItem';

interface AlbaDetailProps {
  item: MockAlbaItem;
}

/**
 * 알바 상세 페이지에서 알바 상태 정보를 표시하는 컴포넌트입니다.
 *
 * 공개 여부, 모집 상태, 등록일, 가게 정보, 제목, 스크랩/지원 현황, 상세 설명 등을 포함합니다.
 *
 * @component
 * @author yujin
 * @date 2025-07-20
 *
 * @param {AlbaDetailProps} props
 * @param {MockAlbaItem} props.item - 알바 데이터 객체
 *
 * @example
 * <AlbaState item={mockAlbaItem} />
 */
const AlbaDetail = ({ item }: AlbaDetailProps) => {
  const {
    isPublic,
    recruitmentEndDate,
    storeName,
    location,
    preferred,
    title,
    scrapCount,
    applyCount,
    createdAt,
  } = item;

  const getStatusLabel = (recruitmentEndDate: string) => {
    return new Date(recruitmentEndDate) > new Date() ? (
      <Chip active label="모집 중" variant="filled" />
    ) : (
      <Chip active label="모집 마감" variant="filled" />
    );
  };

  const getPublicLabel = (isPublic: boolean) => {
    return isPublic ? (
      <Chip active label="공개" variant="filled" />
    ) : (
      <Chip active label="비공개" variant="filled" />
    );
  };

  const recruitLabel = getStatusLabel(recruitmentEndDate);
  const publicLabel = getPublicLabel(isPublic);

  const formattedStart = format(new Date(createdAt), 'yyyy.MM.dd HH:mm');

  return (
    <div className="space-y-16 lg:space-y-32">
      <div className="flex items-center justify-between md:justify-start md:gap-16">
        {/* 1. 공개/모집여부 */}
        <div className="flex gap-4">
          {publicLabel}
          {recruitLabel}
        </div>

        {/* 2. 모집 날짜 범위 */}
        <div>{formattedStart} 등록</div>
      </div>

      {/* 3. 가게 이름, 위치, 우대사항 */}
      <div className="flex flex-wrap items-center gap-x-8">
        <div className="font-semibold underline underline-offset-4">
          {storeName}
        </div>
        <div>{location}</div>
        <div className="">{`· ${preferred}`}</div>
      </div>

      {/* 4. 알바 제목 (굵게) */}
      <div className="text-2lg font-bold lg:text-[26px]">{title}</div>

      {/* 5. 스크랩, 지원 현황 */}
      <div className="mt-6 border-t border-b border-gray-100 py-4">
        <div className="grid grid-cols-[1fr_2fr] gap-12 p-12 lg:grid-cols-[1fr_4fr] lg:gap-24 lg:p-24">
          <div className="flex items-center gap-3 font-bold">
            <Image
              alt="스크랩"
              height={20}
              src="/icons/bookmark-mint.svg"
              width={20}
            />
            스크랩
          </div>
          <span className="font-semibold">{scrapCount}회</span>

          <div className="flex items-center gap-3 font-bold">
            <Image
              alt="지원현황"
              height={20}
              src="/icons/user.svg"
              width={20}
            />
            지원현황
          </div>
          <span className="font-normal whitespace-nowrap">
            현재까지 <span className="font-semibold">{applyCount}명</span>이
            알바폼에 지원했어요!
          </span>
        </div>
      </div>
    </div>
  );
};

export default AlbaDetail;
