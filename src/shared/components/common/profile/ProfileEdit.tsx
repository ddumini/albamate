import Image from 'next/image';

import Profile from './Profile';

interface ProfileEditProps {
  /**
   * 프로필 이미지 URL입니다. 없을 경우 기본 프로필 이미지가 보여집니다.
   */
  imageUrl?: string;
}

/**
 * ProfileEdit 컴포넌트는 사용자의 프로필 이미지를 표시하고,
 * 이미지를 변경할 수 있는 '수정' 버튼을 제공합니다.
 */
const ProfileEdit = ({ imageUrl }: ProfileEditProps) => {
  return (
    <div className="relative size-80 lg:size-100">
      <Profile className="size-full" imageUrl={imageUrl} />
      <button
        className="absolute right-0 bottom-0 flex size-24 cursor-pointer items-center justify-center rounded-full bg-background-300 ring-2 ring-white lg:size-36 lg:ring-3"
        type="button"
      >
        <Image
          alt="프로필 수정하기"
          className="size-20 lg:size-28"
          height={24}
          src="/icons/edit.svg"
          width={24}
        />
      </button>
    </div>
  );
};
export default ProfileEdit;
