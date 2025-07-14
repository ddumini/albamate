import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';
import { MouseEventHandler } from 'react';
import { twMerge } from 'tailwind-merge';

export interface IconProps {
  /**
   * 아이콘 이미지의 경로입니다.
   */
  src: string | StaticImport;
  /**
   * 아이콘 이미지의 대체 텍스트입니다.
   */
  alt: string;
  /**
   * next/image의 `sizes` 속성입니다.
   * 기본값은 `(min-width:64rem) 36px, 24px` 입니다.
   */
  sizes?: string;
  /**
   * 아이콘 이미지의 실제 렌더링 크기를 결정하는 Tailwind CSS 클래스입니다.
   * 기본값은 'size-24 lg:size-36' 입니다.
   */
  sizeClass?: string;
  /**
   * 아이콘을 감싸는 최상위 컨테이너(`div` 또는 `button`)에 추가로 적용할 Tailwind CSS 클래스입니다.
   */
  className?: string;
  /**
   * 아이콘 클릭 시 실행될 이벤트 핸들러입니다. 이 prop이 제공되면 최상위 컨테이너는 `button` 태그로 렌더링되어 클릭 가능하게 됩니다.
   */
  onClick?: MouseEventHandler<HTMLButtonElement | HTMLDivElement>;
}

/**
 * 아이콘 컴포넌트입니다.
 * `onClick` prop 유무에 따라 `button` 또는 `div`로 렌더링됩니다.
 *  기본적으로 24x24, 1024px 이상에서 36x36으로 렌더링 됩니다.
 *
 * @example
 * // 기본 크기의 아이콘
 * <Icon alt="위치 아이콘" src="/icons/pin-solid.svg" />
 *
 * @example
 * // 클릭 가능한 40x40 의 아이콘
 * <Icon
 * alt="메뉴 아이콘"
 * sizeClass="size-40"
 * sizes="40px"
 * src="/icons/menu.svg"
 * onClick={() => alert('메뉴 클릭')}
 * />
 */
const Icon = ({
  src,
  alt,
  sizes = '(min-width:64rem) 36px, 24px',
  sizeClass = 'size-24 lg:size-36',
  className,
  onClick,
}: IconProps) => {
  const Component = onClick ? 'button' : 'div';
  return (
    <Component
      className={twMerge(
        'inline-block',
        Component === 'button' ? '' : 'pointer-events-none',
        className
      )}
      type={Component === 'button' ? 'button' : undefined}
      onClick={onClick}
    >
      <Image
        alt={alt}
        className={twMerge('object-cover object-center', sizeClass)}
        height={36}
        sizes={sizes}
        src={src}
        width={36}
      />
    </Component>
  );
};
export default Icon;
