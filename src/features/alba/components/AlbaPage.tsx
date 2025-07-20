'use client';

import AlbaDetail from '@alba/AlbaDetail';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import AlbaDescription from '@/shared/components/alba/AlbaDescription';
import ToastPopup from '@/shared/components/common/popup/ToastPopup';

import { albaMockData } from '../mocks/mockData';
import AlbaInfo from './AlbaInfo';

const AlbaPage = () => {
  const { formId } = useParams();

  const [popupVisible, setPopupVisible] = useState(false);

  useEffect(() => {
    // 페이지 진입 시 1회 팝업 띄우기
    setPopupVisible(true);
  }, []);

  // formId는 문자열이므로 숫자로 변환해서 비교
  const item = albaMockData.find(alba => alba.id === Number(formId));

  if (!item) {
    return (
      <div className="py-40 text-center text-red-500">
        해당 알바 정보를 찾을 수 없습니다.
      </div>
    );
  }

  return (
    <div className="Text-black flex w-full max-w-375 min-w-320 flex-col gap-32 py-40 text-sm lg:max-w-770 lg:text-lg">
      <div className="mb-40 text-gray-500">알바 상세 페이지 - ID: {formId}</div>
      <ToastPopup
        applyCount={item.applyCount}
        duration={5000}
        visible={popupVisible}
        onClose={() => setPopupVisible(false)}
      />
      <AlbaDetail item={item} />
      <AlbaInfo item={item} />
      <AlbaDescription description={item.description} />
    </div>
  );
};

export default AlbaPage;
