import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

/**
 * FloatingButton 컴포넌트의 Props 인터페이스
 */
interface FloatingButtonProps {
  /** 버튼의 타입 (용도별로 기본 스타일과 동작이 달라짐) */
  type?: 'addForm' | 'bookmark' | 'share' | 'addAlbatalk';
  /** 버튼에 표시할 텍스트 (있으면 타원형, 없으면 원형) */
  text?: string;
  /** 버튼 클릭 시 실행할 함수 */
  onClick?: () => void;
  /** 추가 CSS 클래스명 */
  className?: string;
  /** 커스텀 아이콘 경로 (지정하지 않으면 type에 따라 자동 선택) */
  iconPath?: string;
  /** 아이콘의 alt 텍스트 */
  iconAlt?: string;
  /** 북마크 상태 (type이 'bookmark'일 때만 사용) */
  isBookmarked?: boolean;
  /** 링크 주소 (지정하면 Link 컴포넌트로 렌더링) */
  href?: string;
}

/**
 * 타입별 기본 아이콘 경로 매핑
 */
const defaultIconPaths = {
  addForm: '/icons/plus.svg',
  bookmarkMint: '/icons/bookmark-mint.svg',
  bookmarkGray: '/icons/bookmark-gray.svg',
  share: '/icons/share-filled.svg',
  addAlbatalk: '/icons/edit.svg',
} as const;

/** 아이콘 크기 상수 */
const ICON_SIZE = 32;

/**
 * 다목적 플로팅 버튼 컴포넌트
 *
 * @description
 * - 텍스트 유무에 따라 자동으로 원형/타원형 모양 결정
 * - 북마크 상태에 따른 아이콘/색상 자동 변경
 * - 공유 기능 내장 (현재 페이지 URL 클립보드 복사)
 * - href 제공 시 Next.js Link로 자동 변환
 *
 * @example
 * ```tsx
 * // 기본 사용법
 * <FloatingButton type="addForm" text="폼 만들기" href="/forms/create" />
 *
 * // 북마크 토글
 * <FloatingButton
 *   type="bookmark"
 *   isBookmarked={isBookmarked}
 *   onClick={handleBookmarkToggle}
 * />
 *
 * // 공유 버튼 (현재 페이지 URL 복사)
 * <FloatingButton type="share" />
 * ```
 */
const FloatingButton: React.FC<FloatingButtonProps> = ({
  type = 'addForm',
  text,
  onClick,
  className = '',
  iconPath,
  iconAlt = '버튼',
  isBookmarked = false,
  href,
}) => {
  /** 기본 스타일 클래스 */
  const baseClasses =
    'flex items-center cursor-pointer justify-center rounded-full shadow-lg transition-all duration-300 ease-in-out hover:bg-mint-400';

  /** 텍스트 여부에 따라 모양 결정 */
  const isOval = Boolean(text);

  /** 모양별 스타일 클래스 */
  const shapeClasses = isOval
    ? 'w-fit pl-16 pr-18 py-14 lg:pl-12 lg:pr-16' // 타원형
    : 'size-54 lg:size-64'; // 원형

  /** 텍스트 스타일 클래스 */
  const textClasses = 'ml-2 text-lg lg:text-xl font-medium whitespace-nowrap';

  /**
   * 타입별 색상 스타일 결정
   * @returns 타입에 맞는 색상 클래스 문자열
   */
  const getColorClasses = (): string => {
    if (type === 'bookmark') {
      return isBookmarked ? 'bg-mint-50' : 'bg-gray-50';
    }
    return 'bg-mint-300 text-white';
  };

  /**
   * 아이콘 경로 결정
   * @returns 아이콘 파일 경로 또는 null
   */
  const getIconPath = (): string | null => {
    if (iconPath) return iconPath;

    if (type === 'bookmark') {
      return isBookmarked
        ? defaultIconPaths.bookmarkMint
        : defaultIconPaths.bookmarkGray;
    }

    return defaultIconPaths[type] || null;
  };

  /**
   * 공유 버튼 클릭 핸들러
   * 현재 페이지 URL을 클립보드에 복사
   */
  const handleShareClick = async (): Promise<void> => {
    if (typeof window === 'undefined') return;

    try {
      const currentUrl = window.location.href;
      await navigator.clipboard.writeText(currentUrl);
      alert('현재 페이지 링크가 복사되었습니다!');
    } catch (error) {
      console.error('클립보드 복사 실패:', error);
      alert('링크 복사에 실패했습니다.');
    }

    // 외부에서 전달된 onClick도 실행
    onClick?.();
  };

  /** 최종 스타일 클래스들 */
  const colorClasses = getColorClasses();
  const finalIconPath = getIconPath();

  /**
   * 버튼 내용 JSX
   */
  const buttonContent = (
    <>
      {finalIconPath && (
        <Image
          alt={iconAlt}
          className="flex-shrink-0"
          height={ICON_SIZE}
          src={finalIconPath}
          width={ICON_SIZE}
        />
      )}
      {text && <span className={textClasses}>{text}</span>}
    </>
  );

  /** 최종 CSS 클래스 조합 */
  const finalClassName = `${baseClasses} ${shapeClasses} ${colorClasses} ${className}`;

  // href가 있으면 Link로 렌더링 (페이지 이동용)
  if (href) {
    return (
      <Link className={finalClassName} href={href}>
        {buttonContent}
      </Link>
    );
  }

  // 일반 버튼으로 렌더링 (액션 실행용)
  return (
    <button
      className={finalClassName}
      type="button"
      onClick={type === 'share' ? handleShareClick : onClick}
    >
      {buttonContent}
    </button>
  );
};

export default FloatingButton;
