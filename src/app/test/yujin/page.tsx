'use client';

import Chip from '@common/chip/Chip';
import AuthGnb from '@common/gnb/auth-gnb';
import EditPopup from '@common/popup/EditPopup';
import ToastPopup from '@common/popup/ToastPopup';
import Tab from '@common/tab/Tab';
import Tooltip from '@common/tooltip/Tooltip';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import DatePicker from '@/shared/components/common/date-picker';
import Dropdown from '@/shared/components/ui/Dropdown';

const TestPage = () => {
  const [popupVisible, setPopupVisible] = useState(false);

  // EditPopup용 상태들 따로 관리
  const [successVisible, setSuccessVisible] = useState(false);
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
      </ul>

      <div className="bg-gray-200">Hello Mint</div>
      <div className="BG-lightmint">Mint</div>
      <Tab tabs={['내가 쓴 글', '내가 쓴 댓글', '스크랩']} />

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
          onClick={() => setSuccessVisible(true)}
        >
          성공 팝업 열기
        </button>

        <EditPopup
          duration={3000}
          message="정보가 수정되었습니다."
          type="success"
          visible={successVisible}
          onClose={() => setSuccessVisible(false)}
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

      <ToastPopup
        count={5}
        duration={5000}
        visible={popupVisible}
        onClose={() => setPopupVisible(false)}
      />
      <div className="flex flex-wrap gap-4 bg-neutral-800 p-6">
        <Chip active label="Label" variant="filled" />
        <Chip label="Label" variant="filled" />

        <Chip label="Label" variant="icon" />
      </div>

      <div className="bg-red">red</div>

      <Dropdown
        className="w-48"
        id="example-menu"
        trigger={
          <button
            className="w-full rounded bg-blue-500 px-4 py-2 text-white"
            type="button"
          >
            메뉴 열기
          </button>
        }
      >
        <ul className="flex flex-col gap-2 p-4">
          <li className="cursor-pointer hover:text-blue-500">옵션 1</li>
          <li className="cursor-pointer hover:text-blue-500">옵션 2</li>
          <li className="cursor-pointer hover:text-blue-500">옵션 3</li>
        </ul>
      </Dropdown>

      <DatePicker />
    </div>
  );
};

export default TestPage;
