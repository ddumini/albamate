'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import ToastPopup from '@/shared/components/common/popup/ToastPopup';

import { albaMockData } from '../mocks/mockData';
import AlbaState from './AlbaState';

const AlbaListPage = () => {
  const { formId } = useParams();

  const [popupVisible, setPopupVisible] = useState(false);
  useEffect(() => {
    // 페이지 진입 시 1회 팝업 띄우기
    setPopupVisible(true);
  }, []);

  // formId는 문자열이므로 숫자로 변환해서 비교
  const item = albaMockData.find(alba => alba.id === Number(formId));

  // item이 없을 경우 처리
  if (!item) {
    return (
      <div className="py-40 text-center text-red-500">
        해당 알바 정보를 찾을 수 없습니다.
      </div>
    );
  }

  return (
    <div className="py-40">
      <div className="mb-4 text-sm text-gray-500">
        알바 상세 페이지 - ID: {formId}
      </div>
      <ToastPopup
        count={5}
        duration={5000}
        visible={popupVisible}
        onClose={() => setPopupVisible(false)}
      />
      <AlbaState
        applyCount={item.applyCount}
        isPublic={item.isPublic}
        location={item.location}
        preferred={item.preferred}
        recruitmentEndDate={item.recruitmentEndDate}
        recruitmentStartDate={item.recruitmentStartDate}
        scrapCount={item.scrapCount}
        storeName={item.storeName}
        title={item.title}
      />
    </div>
  );
};

export default AlbaListPage;
