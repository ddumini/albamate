'use client';

import PrimaryButton from '@/shared/components/common/button/PrimaryButton';

import MyPageDropDown from './MyPageDropDown';

const MyPageTopButtons = () => {
  const dropDownItem = [
    { value: '내 정보 수정', clickEvent: () => console.error('임시') },
    { value: '비밀번호 변경', clickEvent: () => console.error('임시') },
  ];
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
      <MyPageDropDown className="lg:hidden" items={dropDownItem} />
    </>
  );
};
export default MyPageTopButtons;
