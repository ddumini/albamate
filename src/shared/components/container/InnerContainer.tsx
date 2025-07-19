import { ReactNode } from 'react';

import { cn } from '@/shared/lib/cn';

/**
 * @author Sumin
 * @since 2025-07-17
 * @description 콘텐츠 영역을 감싸는 컴포넌트
 *
 * @param {ReactNode} children - 콘텐츠
 * @param {string} className - 추가 스타일
 * @param {boolean} isFlex - 콘텐츠 영역을 감싸는 컴포넌트들이 좌우 정렬 될지 여부
 *
 * pc 기준
 * sm 640px
 * md 1480px
 * lg 1560px
 * xl 1624px(알바폼 만들기)
 *
 */
interface InnerContainerProps {
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  isFlex?: boolean;
}

const InnerContainer = ({
  children,
  size = 'md',
  className,
  isFlex,
}: InnerContainerProps) => {
  return (
    <div
      className={cn(
        'mx-auto max-w-375 px-24',
        // 패딩(padding) 24px * 2 = 48px을 더한 max-w값
        size === 'sm' && 'md:max-w-568 lg:max-w-688',
        size === 'md' && 'md:max-w-648 lg:max-w-1528',
        size === 'lg' && 'md:max-w-768 lg:max-w-1608',
        size === 'xl' && 'lg:max-w-1672',
        isFlex && 'flex flex-col lg:flex-row',
        className
      )}
    >
      {children}
    </div>
  );
};

export default InnerContainer;
