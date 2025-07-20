// 기본 슬라이드 타입
export interface Slide {
  id: number;
  title?: string;
  description?: string;
  image: string;
  alt?: string;
  link?: string;
}

// 캐러셀 컴포넌트 props
export interface CarouselProps {
  slides: Slide[];
  interval?: number;
  showCounter?: boolean;
  className?: string;
}

// 캐러셀 상태
export interface CarouselState {
  currentSlide: number;
  isTransitioning: boolean;
  isAutoPlaying: boolean;
}

// 터치 위치
export interface TouchPosition {
  x: number;
  y: number;
}

// useCarousel 훅 props
export interface UseCarouselProps {
  totalSlides: number;
  onSlideChange?: (index: number) => void;
}

// useCarousel 훅의 액션 타입
export type CarouselAction =
  | { type: 'GO_TO'; index: number }
  | { type: 'NEXT'; total: number }
  | { type: 'PREV'; total: number }
  | { type: 'END_TRANSITION' }
  | { type: 'TOGGLE_AUTOPLAY' };

// useSwipeGesture 훅 props
export interface UseSwipeGestureProps {
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  minSwipeDistance?: number;
}

// 인디케이터 컴포넌트 props
export interface IndicatorProps {
  current: number;
  total: number;
  onIndicatorClick?: (index: number) => void;
}

// 카드 페이지네이션 컴포넌트 props
export interface CardPaginationProps {
  currentPage: number;
  totalPage: number;
}
