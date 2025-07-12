import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';
import { MouseEventHandler } from 'react';
import { twMerge } from 'tailwind-merge';

interface IconProps {
  src: string | StaticImport;
  alt: string;
  sizes?: string;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement | HTMLDivElement>;
}

const Icon = ({
  src,
  alt,
  sizes = '(min-width:64rem) 36px, 24px',
  className,
  onClick,
}: IconProps) => {
  const Component = onClick ? 'button' : 'div';
  return (
    <Component
      className={twMerge(
        'relative size-24 lg:size-36',
        Component === 'button' ? 'cursor-pointer' : 'pointer-events-none',
        className
      )}
      type={Component === 'button' ? 'button' : undefined}
      onClick={onClick}
    >
      <Image
        fill
        alt={alt}
        className="object-cover object-center"
        sizes={sizes}
        src={src}
      />
    </Component>
  );
};
export default Icon;
