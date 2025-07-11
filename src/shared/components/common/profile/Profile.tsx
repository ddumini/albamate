import Image from 'next/image';
import { twMerge } from 'tailwind-merge';

interface ProfileProps {
  /**
   * next/image의 `sizes` 속성입니다.
   * 기본값은 `(min-width:64rem) 100px, 80px` 입니다.
   */
  sizes?: string;
  /**
   * 컴포넌트에 추가로 적용할 클래스입니다.
   */
  className?: string;
  /**
   * 프로필 이미지 URL입니다. 없을 경우 기본 프로필 이미지가 보여집니다.
   */
  imageUrl?: string;
}

/**
 * 프로필 이미지를 렌더링하는 컴포넌트입니다.
 * 기본적으로 (min-width:64rem) 100px, 80px 크기입니다.
 * className으로 추가적인 스타일 지정이 가능합니다
 * imageUrl이 없다면 기본 프로필 이미지가 보여집니다.
 *
 * @example <Profile className='size-26 border-none lg:size-26' sizes='26px' />
 *
 */
const Profile = ({ sizes = '(min-width:64rem) 100px, 80px', imageUrl, className }: ProfileProps) => {
  return (
    <div
      className={twMerge(
        'relative size-80 overflow-hidden rounded-full border-3 border-line-200 lg:size-100 lg:border-4',
        className,
      )}
    >
      <Image fill alt='프로필 이미지' sizes={sizes} src={imageUrl ?? '/icons/user-profile.svg'} />
    </div>
  );
};
export default Profile;
