import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';
import { MouseEventHandler } from 'react';
import { twMerge } from 'tailwind-merge';

export interface IconProps {
  src: string | StaticImport;
  alt: string;
  sizes?: string;
  sizeClass?: string;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement | HTMLDivElement>;
}

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
        Component === 'button' ? 'cursor-pointer' : 'pointer-events-none',
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
