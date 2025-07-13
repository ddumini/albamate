import { DetailedHTMLProps, TextareaHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

import {
  inputStyle,
  inputVariants,
} from '@/shared/components/common/input/inputStyles';

interface TextareaProps
  extends DetailedHTMLProps<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {
  variant?: 'solid' | 'outlined';
  isInvalid?: boolean;
}

const Textarea = ({
  variant = 'solid',
  isInvalid,
  className,
  ...props
}: TextareaProps) => {
  return (
    <textarea
      className={twMerge(
        'h-124 w-327 resize-none p-14 lg:h-192 lg:w-640 lg:p-18',
        inputStyle['default'],
        inputVariants[variant],
        isInvalid && inputStyle['invalid'],
        className
      )}
      {...props}
    />
  );
};
export default Textarea;
