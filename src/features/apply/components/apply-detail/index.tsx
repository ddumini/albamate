'use client';
import { useParams, usePathname } from 'next/navigation';

import { albaMockData } from '@/features/alba/mocks/mockData';
import AlbaDescription from '@/shared/components/alba/AlbaDescription';
import AlbaDetail from '@/shared/components/alba/AlbaDetail';
import ImageCarousel from '@/shared/components/ui/ImageCarousel';
import { Slide } from '@/shared/types/carousel';
import { createSlidesFromUrls } from '@/shared/utils/carousel';

import { ApplyResponse } from '../../types/apply';
import ApplyProfile from './ApplyProfile';
import ApplyState from './ApplyState';

interface ApplyDetailProps {
  applyResponse?: ApplyResponse;
  images?: string[];
}

const ApplyDetail = ({
  applyResponse,
  images = [
    '/images/landing/albaform-clock.png',
    '/images/landing/apply-girl.png',
    '/images/landing/anywhere-application.png',
  ],
}: ApplyDetailProps) => {
  const sampleSlides: Slide[] = createSlidesFromUrls(images);
  const params = useParams();
  const pathname = usePathname(); // 또는 router.pathname

  // URL 패턴으로 구분
  const isOwnerView = pathname.includes('/application/'); // 사장님 뷰

  const itemId = isOwnerView
    ? Number(params.applicationId)
    : Number(params.formId);

  const item = albaMockData.find(alba => alba.id === Number(itemId));

  if (!item) {
    return (
      <div className="py-40 text-center text-red-500">
        {itemId}
        해당 알바 정보를 찾을 수 없습니다.
      </div>
    );
  }

  if (!applyResponse) {
    return <div>지원서 정보가 없습니다.</div>;
  }

  return (
    <div className="mx-auto flex w-full max-w-375 min-w-320 flex-col gap-40 py-40 text-sm lg:max-w-7xl lg:gap-80 lg:text-lg">
      <ImageCarousel showCounter interval={4000} slides={sampleSlides} />

      <div className="space-y-40 lg:grid lg:grid-cols-2 lg:gap-150 lg:space-y-0">
        <div className="space-y-40">
          <AlbaDetail item={item} />
          <AlbaDescription description={item.description} />
        </div>
        {/* 지원서 상태 */}
        <div>
          <ApplyState
            createdAt={applyResponse.createdAt}
            recruitmentEndDate={item.recruitmentEndDate}
            status={applyResponse.status}
          />
        </div>
      </div>
      <div className="border-4 border-line-100 dark:border-gray-800" />
      <ApplyProfile data={applyResponse} />
    </div>
  );
};

export default ApplyDetail;
