'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

import InputFileImage from '../input/InputFileImage';
import Profile from './Profile';

interface ProfileEditProps {
  /**
   * 프로필 이미지 URL입니다. 없을 경우 기본 프로필 이미지가 보여집니다.
   */
  imageUrl?: string;
  /**
   * 내부 `InputFileImage` 컴포넌트와 연결될 `id`입니다.
   */
  id?: string;
  /**
   * 사용자가 새 이미지를 선택했을 때 호출되는 콜백 함수입니다.
   * 선택된 `File`을 인자로 받습니다.
   */
  onImageChange: (file: File) => void;
  /**
   * 파일 유효성 검사 실패 시 호출되는 콜백 함수입니다.
   */
  onError?: (error: string) => void;
}

/**
 * ProfileEdit 컴포넌트는 사용자의 프로필 이미지를 표시하고,
 * 이미지를 변경할 수 있는 '수정' 버튼을 제공합니다.
 * 사용자가 새 이미지를 선택하면 미리보기 이미지가 보여집니다.
 * 선택된 파일은 `onImageChange` 콜백을 통해 상위 컴포넌트로 전달됩니다.
 */
const ProfileEdit = ({
  imageUrl,
  id = 'editProfile',
  onImageChange,
  onError,
}: ProfileEditProps) => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  useEffect(() => {
    return () => {
      if (previewImage) URL.revokeObjectURL(previewImage);
    };
  }, [previewImage]);
  const handleImageChange = (files: File[]) => {
    if (!files[0]) return;
    const url = URL.createObjectURL(files[0]);
    setPreviewImage(url);

    onImageChange(files[0]);
  };
  return (
    <div className="relative size-80 lg:size-100">
      <Profile className="size-full" imageUrl={previewImage || imageUrl} />
      <label
        className="absolute right-0 bottom-0 flex size-24 cursor-pointer items-center justify-center rounded-full bg-background-300 ring-2 ring-white lg:size-36 lg:ring-3"
        htmlFor={id}
      >
        <Image
          alt="프로필 수정하기"
          className="size-20 lg:size-28"
          height={24}
          sizes="20px (min-width:64rem) 28px"
          src="/icons/edit.svg"
          width={24}
        />
      </label>
      <InputFileImage
        className="sr-only"
        id={id}
        onError={onError}
        onImageChange={handleImageChange}
      />
    </div>
  );
};
export default ProfileEdit;
