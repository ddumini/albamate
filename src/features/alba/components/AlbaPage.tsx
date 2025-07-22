'use client';

// 컴파운드 네임스페이스
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import FloatingButton from '@/shared/components/common/button/FloatingButton';
import FloatingButtonContainer from '@/shared/components/common/button/FloatingButtonContainer';
import ToastPopup from '@/shared/components/common/popup/ToastPopup';
import ImageCarousel from '@/shared/components/ui/ImageCarousel';
import useViewport from '@/shared/hooks/useViewport';
import useModalStore from '@/shared/store/useModalStore';
import { Slide } from '@/shared/types/carousel';
import { createSlidesFromUrls } from '@/shared/utils/carousel';

import { albaMockData } from '../mocks/mockData';
import ApplicationList from './AlbaApplicationList';
import AlbaPageDesktop from './desktop/AlbaPageDesktop';
import RecruitCloseModal from './modal/RecruitClosedModal';
import AlbaPageTablet from './tablet/AlbaPageTablet';

const AlbaPage = () => {
  const { formId } = useParams();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const [isOwner, setIsOwner] = useState(true);
  const { isDesktop } = useViewport();

  const { openModal } = useModalStore();

  const item = albaMockData.find(alba => alba.id === Number(formId));

  const isRecruitmentClosed = (recruitmentEndDate: string) => {
    const now = new Date();
    const end = new Date(recruitmentEndDate);
    return now > end;
  };

  // 진입 시 모집 마감 모달 띄우기
  useEffect(() => {
    if (!item) return;

    const closed = isRecruitmentClosed(item.recruitmentEndDate);

    if (closed) {
      openModal(<RecruitCloseModal />);
    }

    setPopupVisible(true);
  }, [item]);

  const handleBookmarkToggle = () => {
    const newBookmarkState = !isBookmarked;
    // 북마크 API 호출 자리
    setIsBookmarked(newBookmarkState);
  };

  if (!item) {
    return (
      <div className="py-40 text-center text-error">
        해당 알바 정보를 찾을 수 없습니다.
      </div>
    );
  }

  const images = [
    '/images/landing/albaform-clock.png',
    '/images/landing/apply-girl.png',
    '/images/landing/anywhere-application.png',
  ];

  const sampleSlides: Slide[] = createSlidesFromUrls(images);

  return (
    <div className="mx-auto flex w-full max-w-375 min-w-320 flex-col gap-40 py-120 text-sm lg:max-w-7xl lg:gap-80 lg:text-lg">
      <ToastPopup
        applyCount={item.applyCount}
        duration={5000}
        visible={popupVisible}
        onClose={() => setPopupVisible(false)}
      />
      <FloatingButtonContainer position="right-center">
        <FloatingButton
          isBookmarked={isBookmarked}
          type="bookmark"
          onClick={handleBookmarkToggle}
        />
        <FloatingButton type="share" />
        {/* 사장님/지원자 변경을 위한 임시 floatingBtn */}
        <FloatingButton
          type="addAlbatalk"
          onClick={() => setIsOwner(!isOwner)}
        />
      </FloatingButtonContainer>

      <ImageCarousel showCounter interval={4000} slides={sampleSlides} />
      <div className="text-gray-500">알바 상세 페이지 - ID: {formId}</div>
      {isDesktop ? (
        <AlbaPageDesktop isOwner={isOwner} item={item} />
      ) : (
        <AlbaPageTablet isOwner={isOwner} item={item} />
      )}

      {isOwner && (
        <div>
          <div className="my-40 h-8 w-full bg-gray-50 lg:my-80 lg:h-12 dark:bg-gray-800" />
          <ApplicationList />
        </div>
      )}
    </div>
  );
};

export default AlbaPage;
