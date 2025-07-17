'use client';
import Icon from '@common/input/Icon';
import IconInput from '@common/input/IconInput';
import Input from '@common/input/Input';
import Textarea from '@common/input/Textarea';
import PrivateWrapper from '@common/PrivateWrapper';
import Profile from '@common/profile/Profile';
import ProfileEdit from '@common/profile/ProfileEdit';
import UploadMultipleImage from '@common/uploadImage/UploadMultipleImage';
import UploadSingleImage from '@common/uploadImage/UploadSingleImage';
import Image from 'next/image';
import { useRef, useState } from 'react';

const TaesikTest = () => {
  const [isp, setIsp] = useState(true);
  const inputRef1 = useRef<HTMLInputElement>(null);
  const [isPass, setIsPass] = useState(true);
  return (
    <div className="bg-background-300 p-50">
      <div>태식 테스트 페이지</div>
      <Icon alt="위치" src="/icons/pin-solid.svg" />
      <Icon
        alt="위치"
        src="/icons/pin-solid.svg"
        onClick={() => alert('클릭')}
      />
      <button type="button" onClick={() => inputRef1.current?.focus()}>
        ref 테스트
      </button>
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
      <PrivateWrapper isPrivate={isp}>
        <div className="flex flex-col">
          <div className="relative h-208 w-327">
            <Image
              fill
              alt="카드 이미지"
              className="rounded-2xl"
              sizes="327px"
              src="https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Albaform/user/415/1752142046479/15-2_5882_1752141901515.jpeg"
            />
          </div>
          <div className="mt-24 flex gap-4 text-sm">
            <span className="rounded-xs bg-mint-50 px-4 text-mint-100">
              공개
            </span>
            <span className="rounded-xs bg-mint-50 px-4 text-mint-100">
              모집 중
            </span>
            <span className="text-gray-200">2024.05.22 ~ 2024.05.31</span>
          </div>
          <p className="font-bold">
            코드잇 스터디카페 관리 (주말 오전) 모집합니다 서울 종로구 용산구
            서대문
          </p>
        </div>
      </PrivateWrapper>
      <button
        className="block"
        type="button"
        onClick={() => setIsp(prev => !prev)}
      >
        변환
      </button>
      <Profile className="size-26 border-none lg:size-26" sizes="26px" />
      <Profile
        className="size-26 border-none lg:size-26"
        imageUrl="https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Albaform/user/415/1752142046479/15-2_5882_1752141901515.jpeg"
        sizes="26px"
      />
      <ProfileEdit onImageChange={() => {}} />
      <ProfileEdit
        id="editProfile2"
        imageUrl="https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Albaform/user/415/1752142046479/15-2_5882_1752141901515.jpeg"
        onImageChange={() => {}}
      />
      <div className="p-20">
        <UploadSingleImage onImageChange={() => {}} />
      </div>
      <div className="p-20">
        <UploadMultipleImage onImageChange={() => {}} />
      </div>
    </div>
  );
};
export default TaesikTest;
