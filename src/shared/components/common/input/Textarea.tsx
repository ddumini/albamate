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
 * Textarea 컴포넌트입니다.
 * variant와 isInvalid를 통해 스타일을 적용할 수 있습니다.
 * 사용자가 크기를 임의로 조절할 수 없도록 `resize-none`이 기본적으로 적용됩니다.
 *
 * @example
 * // 기본 `solid` 스타일의 입력 필드
 * <Textarea placeholder="내용을 입력하세요" />
 *
 * @example
 * // `outlined` 스타일의 입력 필드
 * <Textarea variant="outlined" placeholder="내용을 입력하세요" />
 *
 */
const Textarea = ({
  variant = 'solid',
  isInvalid,
  className,
  ...props
}: TextareaProps) => {
  return (
    <textarea
      className={twMerge(
        'h-124 w-full resize-none p-14 lg:h-192 lg:p-18',
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
