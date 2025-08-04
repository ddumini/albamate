'use client';

import ToastPopup from '@common/popup/ToastPopup';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import useAlbaListApi from '@/features/albalist/api/albaListApi';
import { useSessionUtils } from '@/shared/lib/auth/use-session-utils';
import useModalStore from '@/shared/store/useModalStore';
import { getDDayString } from '@/shared/utils/format';

import ApplicationList from './ApplicationList';
import FloatingButtons from './button/FloatingButtons';
import ImageCarousel from './ImageCarousel';
import RecruitCloseModal from './modal/RecruitClosedModal';
import PageContent from './PageContent';
import AlbaSkeleton from './skeleton/AlbaSkeleton';

const AlbaPage = () => {
  const { formId } = useParams();
  const { openModal } = useModalStore();

  const [popupVisible, setPopupVisible] = useState(false);
  const { isOwner, isLoading: isSessionLoading } = useSessionUtils();
  const [hasMounted, setHasMounted] = useState(false);

  const { getAlbaDetail } = useAlbaListApi();

  // React Query로 상세 데이터 조회
  const {
    data: item,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['albaDetail', Number(formId)],
    queryFn: () => getAlbaDetail(Number(formId)).then(res => res.data),
    staleTime: 1000 * 60 * 5, // 5분간 신선한 데이터로 간주
    gcTime: 1000 * 60 * 10, // 10분간 캐시 유지
    refetchOnWindowFocus: true, // 윈도우 포커스 시 리페치
    refetchOnMount: true, // 컴포넌트 마운트 시 리페치
  });

  useEffect(() => setHasMounted(true), []);

  // 모집 마감 모달 띄우기
  useEffect(() => {
    if (!item) return;

    const dDayText = getDDayString(item.recruitmentEndDate);
    if (dDayText === '모집 마감') {
      openModal(<RecruitCloseModal />);
    }

    setPopupVisible(true);
  }, [item, openModal]);

  if (!hasMounted) return null;

  if (isLoading) {
    return <AlbaSkeleton />;
  }

  if (isError || !item) {
    return (
      <div className="py-40 text-center text-error">
        해당 알바 정보를 찾을 수 없습니다.
      </div>
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-375 min-w-320 flex-col gap-40 py-40 pb-140 text-sm lg:max-w-7xl lg:gap-80 lg:text-lg">
      <ToastPopup
        applyCount={item.applyCount}
        duration={5000}
        visible={popupVisible}
        onClose={() => setPopupVisible(false)}
      />

      <FloatingButtons formId={Number(formId)} />

      <ImageCarousel imageUrls={item.imageUrls} />

      <PageContent isOwner={isOwner} item={item} />

      {isOwner && (
        <div>
          <div className="my-40 h-8 w-full bg-gray-50 lg:my-80 lg:h-12 dark:bg-gray-800" />
          <ApplicationList formId={Number(formId)} />
        </div>
      )}
    </div>
  );
};

export default AlbaPage;
