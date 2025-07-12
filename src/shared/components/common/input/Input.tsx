import { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

interface InputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  variant?: 'solid' | 'outlined';
  isInvalid?: boolean;
}

const inputVariants = {
  solid: 'bg-background-200 hover:bg-background-300',
  outlined:
    'border border-gray-200 hover:border-gray-400 focus:border-mint-300',
};

const Input = ({
  variant = 'solid',
  isInvalid,
  className,
  ...props
}: InputProps) => {
  return (
    <input
      className={twMerge(
        'h-54 w-327 p-14 lg:h-64 lg:w-640',
        'text-lg font-normal text-black-400 placeholder:text-gray-400 lg:text-xl',
        'rounded-lg caret-mint-300 outline-mint-300 focus:outline',
        'transition duration-200',
        inputVariants[variant],
        isInvalid &&
          'border border-error caret-error hover:border-error focus:border-error focus:outline-error',
        className
      )}
      {...props}
    />
  );
};
export default Input;
