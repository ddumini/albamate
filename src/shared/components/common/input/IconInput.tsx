import { twMerge } from 'tailwind-merge';

import Icon, { IconProps } from '@/shared/components/common/input/Icon';
import Input, { InputProps } from '@/shared/components/common/input/Input';

interface IconInput
  extends Omit<InputProps, 'className' | 'onClick' | 'alt' | 'src'> {
  /**
   * 아이콘의 위치를 입력 필드의 왼편 또는 오른편으로 지정합니다.
   * 기본값은 'left'입니다.
   */
  position?: 'left' | 'right';
  /**
   * `IconInput` 컴포넌트의 최상위 컨테이너(`div`)에 추가로 적용할 Tailwind CSS 클래스입니다.
   * 전체 컴포넌트의 크기, 여백 등을 조절할 때 사용합니다.
   */
  className?: string;
  /**
   * `Icon` 컴포넌트로 전달될 아이콘 이미지의 경로입니다.
   */
  src: IconProps['src'];
  /**
   * `Icon` 컴포넌트로 전달될 아이콘 이미지의 대체 텍스트입니다.
   */
  alt: IconProps['alt'];
  /**
   * `Icon` 컴포넌트로 전달될 next/image의 `sizes` 속성입니다.
   * 기본값은 `(min-width:64rem) 36px, 24px` 입니다.
   */
  sizes?: IconProps['sizes'];
  /**
   * `Icon` 컴포넌트로 전달될 아이콘 이미지의 실제 렌더링 크기를 결정하는 Tailwind CSS 클래스입니다.
   * 기본값은 'size-24 lg:size-36' 입니다.
   */
  sizeClass?: IconProps['sizeClass'];
  /**
   * `Input` 컴포넌트에 추가로 적용할 Tailwind CSS 클래스입니다.
   */
  inputClassName?: InputProps['className'];
  /**
   * `Icon` 컴포넌트의 아이콘을 감싸는 최상위 컨테이너(`div` 또는 `button`)에 추가로 적용할 Tailwind CSS 클래스입니다.
   */
  iconClassName?: IconProps['className'];
  /**
   * `Icon` 컴포넌트로 전달될 아이콘 클릭 시 실행될 이벤트 핸들러입니다.
   */
  iconOnClick?: IconProps['onClick'];
}

/**
 * 아이콘과 함께 사용되는 Input컴포넌트 입니다.
 * 아이콘의 위치를 position을 통해 왼쪽, 오른쪽 어디에 올지 정할 수 있습니다.
 *
 * @example
 * //검색 컴포넌트
 * <IconInput
 *   alt="검색"
 *   className="lg:w-728"
 *   iconClassName="pl-24"
 *   iconOnClick={() => alert('검색 버튼 클릭')}
 *   inputClassName="rounded-2xl lg:rounded-3xl lg:pl-68"
 *   placeholder="어떤 알바를 찾고 계세요?"
 *   src="/icons/search.svg"
 * />
 *
 */
const IconInput = ({
  position = 'left',
  src,
  alt,
  sizes,
  sizeClass,
  className,
  inputClassName,
  iconClassName,
  iconOnClick,
  ...props
}: IconInput) => {
  return (
    <div className={twMerge('relative h-54 w-full lg:h-64', className)}>
      <Icon
        alt={alt}
        className={twMerge(
          'absolute p-14',
          position === 'left' ? 'left-0 pr-8' : 'right-0',
          iconClassName
        )}
        sizeClass={sizeClass}
        sizes={sizes}
        src={src}
        onClick={iconOnClick}
      />
      <Input
        className={twMerge(
          position === 'left' ? 'pl-46 lg:pl-58' : 'pr-46 lg:pr-58',
          'h-full lg:h-full',
          inputClassName
        )}
        {...props}
      />
    </div>
  );
};
export default IconInput;
