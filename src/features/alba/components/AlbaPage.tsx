'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import ToastPopup from '@/shared/components/common/popup/ToastPopup';

import { albaMockData } from '../mocks/mockData';
import ApplicationList from './AlbaApplicationList';
import AlbaPageDesktop from './AlbaPageDesktop';
import AlbaPageMobile from './AlbaPageMobile';

const AlbaPage = () => {
  const { formId } = useParams();
  const [popupVisible, setPopupVisible] = useState(false);
  const isOwner = true;

  useEffect(() => {
    setPopupVisible(true);
  }, []);

  const item = albaMockData.find(alba => alba.id === Number(formId));

  if (!item) {
    return (
      <div className="py-40 text-center text-red-500">
        해당 알바 정보를 찾을 수 없습니다.
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-375 min-w-320 py-40 text-sm lg:max-w-7xl lg:text-lg">
      <div className="mb-40 text-gray-500">알바 상세 페이지 - ID: {formId}</div>

      <ToastPopup
        applyCount={item.applyCount}
        duration={5000}
        visible={popupVisible}
        onClose={() => setPopupVisible(false)}
      />

      <AlbaPageMobile item={item} />
      <AlbaPageDesktop item={item} />

      <div className="my-40 h-8 w-full bg-gray-50 lg:my-80 lg:h-12 dark:bg-gray-800" />

      {isOwner && <ApplicationList />}
    </div>
  );
};

export default AlbaPage;
