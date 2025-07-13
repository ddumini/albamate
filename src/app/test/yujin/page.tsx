'use client';

import MainGnb from '@components/common/gnb/MainGnb';
import Image from 'next/image';

import AuthGnb from '@/shared/components/common/gnb/AuthGnb';
import Tab from '@/shared/components/common/tab/Tab';
import Tooltip from '@/shared/components/common/tooltip/Tooltip';

const TestPage = () => {
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

      <p className="bg-blue-500">layer</p>
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
          <button>버튼</button>
        </Tooltip>
      </div>
    </div>
  );
};

export default TestPage;
