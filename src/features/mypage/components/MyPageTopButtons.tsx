'use client';

import Image from 'next/image';

import PrimaryButton from '@/shared/components/common/button/PrimaryButton';
import Dropdown from '@/shared/components/ui/Dropdown';

const MyPageTopButtons = () => {
  const dropDownItem = ['내 정보 수정', '비밀번호 변경'];
  return (
    <>
      <div className="hidden items-center justify-center gap-16 lg:inline-flex">
        <PrimaryButton
          className="h-58 w-180 py-16 text-2lg font-semibold"
          label="내 정보 수정"
          type="button"
          variant="solid"
        />
        <PrimaryButton
          className="h-58 w-180 py-16 text-2lg font-semibold"
          label="비밀번호 변경"
          type="button"
          variant="outline"
        />
      </div>
      <div className="relative flex items-center justify-center lg:hidden">
        <Dropdown
          className="relative flex w-96 justify-end"
          trigger={isOpen => (
            <button
              className="relative h-24 w-24"
              type="button"
              onClick={() => isOpen}
            >
              <Image
                fill
                alt="메뉴 열기"
                sizes="24px"
                src="/icons/kebab-menu.svg"
              />
            </button>
          )}
        >
          <ul className="flex h-68 w-full flex-col items-center justify-between rounded-lg border border-solid border-line-100 p-4 [box-shadow:4px_4px_4px_rgba(228,228,228,0.1)]">
            <li className="inline-flex w-full items-center justify-center">
              <button
                className="w-90 rounded-lg py-4 text-xs text-gray-400 hover:bg-mint-50 hover:font-semibold hover:text-black"
                type="button"
              >
                내 정보 수정
              </button>
            </li>
            <li className="inline-flex w-full items-center justify-center">
              <button
                className="w-90 rounded-lg py-4 text-xs text-gray-400 hover:bg-mint-50 hover:font-semibold hover:text-black"
                type="button"
              >
                비밀번호 변경
              </button>
            </li>
          </ul>
        </Dropdown>
      </div>
    </>
  );
};
export default MyPageTopButtons;
