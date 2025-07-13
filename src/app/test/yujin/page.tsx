'use client';

import AuthGnb from '@components/common/gnb/AuthGnb';
import MainGnb from '@components/common/gnb/MainGnb';
import EditPopup from '@components/common/popup/EditPopup';
import Popup from '@components/common/popup/Popup';
import Tab from '@components/common/tab/Tab';
import Tooltip from '@components/common/tooltip/Tooltip';
import Image from 'next/image';
import { useEffect, useState } from 'react';

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

      <div className="flex justify-center">
        <Tooltip
          content={({ close }) => (
            <div className="flex items-center gap-2">
              <div className="relative h-24 w-24 md:h-30 md:w-30">
                <Image fill alt="info" src="/icons/info.svg" />
              </div>
              <span className="text-xs md:text-md">
                알바폼 현재 진행상태를 변경할 수 있어요!
              </span>
              <button
                className="relative h-24 w-24 cursor-pointer md:h-30 md:w-30"
                type="button"
                onClick={close}
              >
                <Image fill alt="닫기 버튼" src="/icons/x-thin.svg" />
              </button>
            </div>
          )}
        >
          <Image
            alt="수정 아이콘"
            height={24}
            src="/icons/edit.svg"
            width={24}
          />
        </Tooltip>
        <Tooltip content="기본형 툴팁 테스트용 임시 버튼이에요!!">
          <button className="cursor-pointer" type="button">
            버튼
          </button>
        </Tooltip>
      </div>

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
