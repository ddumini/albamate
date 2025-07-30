'use client';

import ToastPopup from '@common/popup/ToastPopup';
import { useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import useAlbaListApi from '@/features/albalist/api/albaListApi';
import useModalStore from '@/shared/store/useModalStore';
import { getDDayString } from '@/shared/utils/format';

import ApplicationList from './ApplicationList';
import FloatingButtons from './button/FloatingButtons';
import ImageCarousel from './ImageCarousel';
import RecruitCloseModal from './modal/RecruitClosedModal';
import PageContent from './PageContent';

const AlbaPage = () => {
  const { formId } = useParams();
  const router = useRouter();
  const { openModal } = useModalStore();

  const [popupVisible, setPopupVisible] = useState(false);
  const [isOwner, setIsOwner] = useState(true);
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
    staleTime: 1000 * 60 * 30, // 개발기간 동안만 30분 캐시 유지
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
    return <div className="py-40 text-center">불러오는 중...</div>;
  }

  if (isError || !item) {
    return (
      <div className="py-40 text-center text-error">
        해당 알바 정보를 찾을 수 없습니다.
      </div>
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-375 min-w-320 flex-col gap-40 py-120 text-sm lg:max-w-7xl lg:gap-80 lg:text-lg">
      <ToastPopup
        applyCount={item.applyCount}
        duration={5000}
        visible={popupVisible}
        onClose={() => setPopupVisible(false)}
      />

      <FloatingButtons
        formId={Number(formId)}
        onSigninRedirect={() => router.push('/signin')}
        onToggleOwner={() => setIsOwner(prev => !prev)}
      />

      <ImageCarousel />

      <PageContent isOwner={isOwner} item={item} />

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
