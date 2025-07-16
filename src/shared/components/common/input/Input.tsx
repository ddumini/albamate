import { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

import {
  inputStyle,
  inputVariants,
} from '@/shared/components/common/input/inputStyles';

export interface InputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  /**
   * 입력 필드의 시각적 스타일을 정의합니다.
   * 'solid'는 채워진 배경, 'outlined'는 테두리가 있는 형태입니다.
   * 기본값은 'solid'입니다.
   */
  variant?: 'solid' | 'outlined';
  /**
   * 입력 필드의 유효성 상태를 나타냅니다.
   * `true`일 경우, `invalid` 스타일이 적용됩니다
   */
  isInvalid?: boolean;
}

/**
 * Input 컴포넌트입니다.
 * variant와 isInvalid를 통해 스타일을 적용할 수 있습니다.
 *
 * @example
 * // 기본 `solid` 스타일의 입력 필드
 * <Input placeholder="이름을 입력하세요" />
 *
 * @example
 * // `outlined` 스타일의 입력 필드
 * <Input variant="outlined" placeholder="이메일을 입력하세요" />
 *
 */
const Input = ({
  variant = 'solid',
  isInvalid,
  className,
  ...props
}: InputProps) => {
  return (
    <input
      className={twMerge(
        'h-54 w-full p-14 lg:h-64 dark:bg-gray-800 dark:text-gray-200',
        inputStyle['default'],
        inputVariants[variant],
        isInvalid && inputStyle['invalid'],
        className
      )}
      {...props}
    />
  );
};
export default Input;
