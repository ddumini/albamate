import { twMerge } from 'tailwind-merge';

import Icon, { IconProps } from '@/shared/components/common/input/Icon';
import Input, { InputProps } from '@/shared/components/common/input/Input';

interface IconInput
  extends Omit<InputProps, 'className' | 'onClick' | 'alt' | 'src'> {
  position?: 'left' | 'right';
  className?: string;
  src: IconProps['src'];
  alt: IconProps['alt'];
  sizes?: IconProps['sizes'];
  sizeClass?: IconProps['sizeClass'];
  inputClassName?: InputProps['className'];
  iconClassName?: IconProps['className'];
  inputOnClick?: InputProps['onClick'];
  iconOnClick?: IconProps['onClick'];
}

const IconInput = ({
  position = 'left',
  src,
  alt,
  sizes,
  sizeClass,
  className,
  inputClassName,
  iconClassName,
  inputOnClick,
  iconOnClick,
  ...props
}: IconInput) => {
  return (
    <div className={twMerge('relative h-54 w-327 lg:h-64 lg:w-640', className)}>
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
          'h-full w-full lg:h-full lg:w-full',
          inputClassName
        )}
        onClick={inputOnClick}
        {...props}
      />
    </div>
  );
};
export default IconInput;
