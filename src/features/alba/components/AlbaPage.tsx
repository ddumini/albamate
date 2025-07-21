'use client';

import AlbaDetail from '@alba/AlbaDetail';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import AlbaDescription from '@/shared/components/alba/AlbaDescription';
import ToastPopup from '@/shared/components/common/popup/ToastPopup';

import { albaMockData } from '../mocks/mockData';
import AlbaApplyButton from './AlbaApplyButton';
import AlbaCondition from './AlbaCondition';
import AlbaContact from './AlbaContact';
import AlbaInfo from './AlbaInfo';
import AlbaLocation from './AlbaLocation';

const AlbaPage = () => {
  const { formId } = useParams();
  const [popupVisible, setPopupVisible] = useState(false);

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

      {/* 1. 모바일/태블릿 전용 세로 배치 (원래 순서 그대로) */}
      <div className="flex flex-col gap-32 lg:hidden">
        <AlbaDetail item={item} />
        <AlbaInfo item={item} />
        <AlbaContact item={item} />
        <AlbaDescription description={item.description} />
        <AlbaCondition item={item} />
        <AlbaLocation />
        <AlbaApplyButton myId={123} ownerId={item.ownerId} />
      </div>

      {/* 2. 데스크탑 전용 좌우 배치 (순서 재구성) */}
      <div className="mx-auto hidden max-w-screen-xl grid-cols-12 gap-42 lg:grid">
        {/* 왼쪽 열 (col 5/12) */}
        <div className="col-span-5 flex flex-col gap-32">
          <AlbaDetail item={item} />
          <AlbaDescription description={item.description} />
          <AlbaLocation />
        </div>

        {/* 오른쪽 열 (col 5/12) */}
        <div className="col-span-7 flex flex-col justify-end gap-32">
          <AlbaInfo item={item} />
          <AlbaContact item={item} />
          <AlbaApplyButton myId={123} ownerId={item.ownerId} />
          <AlbaCondition item={item} />
        </div>
      </div>
    </div>
  );
};

export default AlbaPage;
