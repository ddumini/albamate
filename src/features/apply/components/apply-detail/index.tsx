'use client';
import { useState } from 'react';

import { MockAlbaItem } from '@/features/alba/types/MockAlbaItem';
import { User } from '@/features/auth/types';
import AlbaDescription from '@/shared/components/alba/AlbaDescription';
import AlbaDetail from '@/shared/components/alba/AlbaDetail';
import ImageCarousel from '@/shared/components/ui/ImageCarousel';
import { Slide } from '@/shared/types/carousel';
import { createSlidesFromUrls } from '@/shared/utils/carousel';

import { ApplyResponse } from '../../types/apply';
import ApplyProfile from './ApplyProfile';
import ApplyState from './ApplyState';

interface ApplyDetailProps {
  albaformData: MockAlbaItem;
  applicationData?: ApplyResponse;
  images?: string[];
}

const ApplyDetail = ({
  albaformData,
  applicationData,
  images = [
    '/images/landing/albaform-clock.png',
    '/images/landing/apply-girl.png',
    '/images/landing/anywhere-application.png',
  ],
}: ApplyDetailProps) => {
  const sampleSlides: Slide[] = createSlidesFromUrls(images);

  const [user, _setUser] = useState<User | null>(null);

  const _isOwner = user?.role === 'OWNER';

  if (!albaformData) {
    return (
      <div className="py-40 text-center text-red-500">
        해당 알바 정보를 찾을 수 없습니다.
      </div>
    );
  }

  if (!applicationData) {
    return <div>지원서 정보가 없습니다.</div>;
  }

  return (
    <div className="mx-auto flex w-full max-w-375 min-w-320 flex-col gap-40 py-40 text-sm lg:max-w-7xl lg:gap-80 lg:text-lg">
      <ImageCarousel showCounter interval={4000} slides={sampleSlides} />

      <div className="space-y-40 lg:grid lg:grid-cols-2 lg:gap-150 lg:space-y-0">
        <div className="space-y-40">
          <AlbaDetail item={albaformData} />
          <AlbaDescription description={albaformData.description} />
        </div>
        {/* 지원서 상태 */}
        <div>
          <ApplyState
            createdAt={applicationData.createdAt}
            recruitmentEndDate={albaformData.recruitmentEndDate}
            status={applicationData.status}
          />
        </div>
      </div>
      <div className="border-4 border-line-100 dark:border-gray-800" />
      <ApplyProfile data={applicationData} />
    </div>
  );
};

export default ApplyDetail;
