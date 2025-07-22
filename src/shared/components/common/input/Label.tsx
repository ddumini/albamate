import { DetailedHTMLProps, LabelHTMLAttributes, ReactNode } from 'react';

import { cn } from '@/shared/lib/cn';

interface LabelProps
  extends DetailedHTMLProps<
    LabelHTMLAttributes<HTMLLabelElement>,
    HTMLLabelElement
  > {
  /**
   * 라벨 내부에 표시될 내용
   */
  children: ReactNode;
  /**
   * 필수 항목 여부 (오른쪽에 * 로 표시됨)
   */
  isRequired?: boolean;
}

/**
 * 공통적으로 사용할 수 있는 라벨 컴포넌트 입니다.
 * `isRequired`를 통해 필수 항목을 표시할 수 있습니다.
 */
const Label = ({ children, isRequired, className, ...props }: LabelProps) => {
  return (
    <label
      className={cn(
        'text-md font-medium text-black-400 lg:text-xl dark:text-gray-100',
        className
      )}
      {...props}
    >
      {children}
      {isRequired && (
        <>
          <span
            aria-hidden="true"
            className="ml-4 text-mint-300 dark:text-mint-350"
          >
            *
          </span>
          <span className="sr-only">필수</span>
        </>
      )}
    </label>
  );
};
export default Label;
