import React from 'react';

import { Z_INDEX } from '@/shared/constants/zIndex';

/**
 * FloatingButtonContainer 컴포넌트의 Props 인터페이스
 */
export interface FloatingButtonContainerProps {
  /** 컨테이너 내부 버튼들 */
  children: React.ReactNode;
  /** 화면에 고정할 위치 */
  position?: 'right-center' | 'right-bottom';
  /** 추가 CSS 클래스명 */
  className?: string;
}

/**
 * 플로팅 버튼들을 담는 컨테이너 컴포넌트
 *
 * @description
 * - 여러 개의 FloatingButton을 세로로 정렬
 * - 우측 중앙 또는 우측 하단에 고정
 * - 버튼 간 적절한 간격 자동 설정
 *
 * @example
 * ```tsx
 * // 우측 중앙에 버튼 그룹
 * <FloatingButtonContainer position="right-center">
 *   <FloatingButton
 *     isBookmarked={isBookmarked}
 *     type="bookmark"
 *     onClick={handleBookmarkToggle}
 *   />
 *   <FloatingButton type="share" />
 * </FloatingButtonContainer>
 *
 * // 우측 하단에 버튼 그룹
 * <FloatingButtonContainer>
 *   <FloatingButton
 *     href="/forms/create"
 *     text="폼 만들기"
 *     type="addForm"
 *   />
 * </FloatingButtonContainer>
 * ```
 */
const FloatingButtonContainer: React.FC<FloatingButtonContainerProps> = ({
  children,
  position = 'right-bottom',
  className = '',
}) => {
  /**
   * 위치별 포지셔닝 스타일 결정
   * @returns 포지션에 맞는 CSS 클래스 문자열
   */
  const getPositionClasses = (): string => {
    const baseClasses = `fixed flex flex-col gap-24 z-[${Z_INDEX.FLOATING_BUTTON}}]`;

    if (position === 'right-center') {
      return `${baseClasses} right-23 top-1/2 lg:right-220 transform -translate-y-1/2`;
    } else {
      return `${baseClasses} right-23 bottom-68 lg:right-220 lg:bottom-108`;
    }
  };

  return (
    <div className={`${getPositionClasses()} ${className}`}>{children}</div>
  );
};

export default FloatingButtonContainer;
