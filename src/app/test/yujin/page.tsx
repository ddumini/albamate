'use client';

import MainGnb from '@components/common/gnb/MainGnb';
import { useEffect, useState } from 'react';

import AuthGnb from '@/shared/components/common/gnb/AuthGnb';
import EditPopup from '@/shared/components/common/popup/EditPopup';
import Popup from '@/shared/components/common/popup/Popup';
import Tab from '@/shared/components/common/tap/Tab';

const TestPage = () => {
  const [popupVisible, setPopupVisible] = useState(false);

  // EditPopup용 상태들 따로 관리
  const [editPopupVisible, setEditPopupVisible] = useState(false);
  const [errorVisible, setErrorVisible] = useState(false);
  const [infoVisible, setInfoVisible] = useState(false);

  useEffect(() => {
    setPopupVisible(true);
  }, []);

  return (
    <div className="m-16 flex flex-col gap-24 text-md">
      <ul>
        <li className="mb-36">
          로그인 전 헤더
          <AuthGnb />
        </li>
        <li>
          메인 헤더
          <MainGnb />
        </li>
      </ul>

      <div className="bg-gray-200">Hello Mint</div>
      <div className="BG-lightmint">Mint</div>
      <Tab />

      {/* 성공 팝업 */}
      <div className="p-8">
        <button
          className="hover:bg-mint-600 cursor-pointer rounded bg-mint-400 px-4 py-2 text-white transition"
          type="button"
          onClick={() => setEditPopupVisible(true)}
        >
          성공 팝업 열기
        </button>

        <EditPopup
          duration={3000}
          message="정보가 수정되었습니다."
          type="success"
          visible={editPopupVisible}
          onClose={() => setEditPopupVisible(false)}
        />
      </div>

      {/* 에러 팝업 */}
      <div className="p-8">
        <button
          className="hover:bg-mint-600 cursor-pointer rounded bg-red-400 px-4 py-2 text-white transition"
          type="button"
          onClick={() => setErrorVisible(true)}
        >
          에러 팝업 열기
        </button>

        <EditPopup
          duration={3000}
          message="에러가 발생했습니다."
          type="error"
          visible={errorVisible}
          onClose={() => setErrorVisible(false)}
        />
      </div>

      {/* 정보 팝업 */}
      <div className="p-8">
        <button
          className="hover:bg-mint-600 cursor-pointer rounded bg-blue-400 px-4 py-2 text-white transition"
          type="button"
          onClick={() => setInfoVisible(true)}
        >
          정보 팝업 열기
        </button>

        <EditPopup
          duration={3000}
          message="일반 정보 팝업입니다."
          type="info"
          visible={infoVisible}
          onClose={() => setInfoVisible(false)}
        />
      </div>

      <Popup
        count={5}
        duration={5000}
        visible={popupVisible}
        onClose={() => setPopupVisible(false)}
      />
    </div>
  );
};

export default TestPage;
