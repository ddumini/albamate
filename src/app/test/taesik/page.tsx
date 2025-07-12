'use client';

import { useRef } from 'react';

import Icon from '@/shared/components/common/input/Icon';
import Input from '@/shared/components/common/input/Input';
import Profile from '@/shared/components/common/profile/Profile';
import ProfileEdit from '@/shared/components/common/profile/ProfileEdit';

const TaesikTest = () => {
  const inputRef1 = useRef<HTMLInputElement>(null);
  return (
    <div className="bg-background-100">
      <div>태식 테스트 페이지</div>
      <Icon alt="위치" src="/icons/pin-solid.svg" />
      <Icon
        alt="위치"
        src="/icons/pin-solid.svg"
        onClick={() => alert('클릭')}
      />
      <div className="flex gap-10 p-10">
        <Input ref={inputRef1} name="input1" />
        <Input variant="outlined" />
        <Input isInvalid />
        <Input isInvalid variant="outlined" />
        <button onClick={() => inputRef1.current?.focus()}>ref 테스트</button>
      </div>
      <Profile imageUrl="https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Albaform/user/415/1752142046479/15-2_5882_1752141901515.jpeg" />
      <Profile />
      <Profile className="size-26 border-none lg:size-26" sizes="26px" />
      <Profile
        className="size-26 border-none lg:size-26"
        imageUrl="https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Albaform/user/415/1752142046479/15-2_5882_1752141901515.jpeg"
        sizes="26px"
      />
      <ProfileEdit />
      <ProfileEdit imageUrl="https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Albaform/user/415/1752142046479/15-2_5882_1752141901515.jpeg" />
    </div>
  );
};
export default TaesikTest;
