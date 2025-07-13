'use client';

import { useRef, useState } from 'react';

import Icon from '@/shared/components/common/input/Icon';
import IconInput from '@/shared/components/common/input/IconInput';
import Input from '@/shared/components/common/input/Input';
import Textarea from '@/shared/components/common/input/Textarea';
import Profile from '@/shared/components/common/profile/Profile';
import ProfileEdit from '@/shared/components/common/profile/ProfileEdit';

const TaesikTest = () => {
  const inputRef1 = useRef<HTMLInputElement>(null);
  const [isPass, setIsPass] = useState(true);
  return (
    <div className="bg-background-100">
      <div>태식 테스트 페이지</div>
      <Icon alt="위치" src="/icons/pin-solid.svg" />
      <Icon
        alt="위치"
        src="/icons/pin-solid.svg"
        onClick={() => alert('클릭')}
      />
      <button onClick={() => inputRef1.current?.focus()}>ref 테스트</button>
      <div className="flex flex-col gap-10 p-10">
        <Input ref={inputRef1} name="input1" />
        <Input variant="outlined" />
        <Input isInvalid />
        <Input isInvalid variant="outlined" />
      </div>
      <div className="flex flex-col gap-10 p-10">
        <IconInput
          alt="위치"
          iconOnClick={() => alert('클릭')}
          src="/icons/pin-solid.svg"
        />
        <IconInput alt="위치" src="/icons/pin-solid.svg" variant="outlined" />
        <IconInput isInvalid alt="위치" src="/icons/pin-solid.svg" />
        <IconInput
          isInvalid
          alt="위치"
          src="/icons/pin-solid.svg"
          variant="outlined"
        />
      </div>
      <div className="flex flex-col gap-10 p-10">
        <IconInput
          alt="위치"
          iconOnClick={() => alert('클릭')}
          position="right"
          src="/icons/pin-solid.svg"
        />
        <IconInput
          alt="위치"
          position="right"
          src="/icons/pin-solid.svg"
          variant="outlined"
        />
        <IconInput
          isInvalid
          alt="위치"
          position="right"
          src="/icons/pin-solid.svg"
        />
        <IconInput
          isInvalid
          alt="위치"
          position="right"
          src="/icons/pin-solid.svg"
          variant="outlined"
        />
      </div>
      <div className="flex flex-col gap-10 p-10">
        <Textarea />
        <Textarea variant="outlined" />
        <Textarea isInvalid />
        <Textarea isInvalid variant="outlined" />
      </div>
      <div className="flex flex-col gap-10 p-10">
        <IconInput
          alt="검색"
          className="lg:w-728"
          iconClassName="pl-24"
          iconOnClick={() => alert('검색 버튼 클릭')}
          inputClassName="rounded-2xl lg:rounded-3xl lg:pl-68"
          placeholder="어떤 알바를 찾고 계세요?"
          src="/icons/search.svg"
        />
        <IconInput
          isInvalid
          alt="password"
          iconOnClick={() => setIsPass(prev => !prev)}
          placeholder="codeit@email.com"
          position="right"
          src={
            isPass ? '/icons/visibility-on.svg' : '/icons/visibility-off.svg'
          }
          type={isPass ? 'password' : 'text'}
        />
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
