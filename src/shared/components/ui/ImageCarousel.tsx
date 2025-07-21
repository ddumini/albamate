'use client';
import Image from 'next/image';
import React, { useCallback, useEffect, useRef } from 'react';

import useCarousel from '@/shared/hooks/useCarousel';
import { useSwipeGesture } from '@/shared/hooks/useSwipeGesture';
import { cn } from '@/shared/lib/cn';
import { CarouselProps } from '@/shared/types/carousel';

import CardPagination from '../common/pagination/CardPagination';
import Indicator from '../common/pagination/Indicator';

const ImageCarousel: React.FC<CarouselProps> = ({
  slides,
  interval = 4000,
  showCounter = true,
  className = '',
  ...props
}) => {
  const {
    currentSlide,
    isAutoPlaying,
    isTransitioning,
    goToSlide,
    nextSlide,
    prevSlide,
  } = useCarousel({ totalSlides: slides.length });

  const { handleTouchStart, handleTouchMove, handleTouchEnd } = useSwipeGesture(
    {
      onSwipeLeft: nextSlide,
      onSwipeRight: prevSlide,
    }
  );

  const carouselRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // 자동재생 타이머 관리
  const startAutoPlay = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    if (isAutoPlaying && slides.length > 1) {
      intervalRef.current = setInterval(nextSlide, interval);
    }
  }, [isAutoPlaying, slides.length, nextSlide, interval]);

  const stopAutoPlay = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // 인디케이터 클릭 핸들러
  const handleIndicatorClick = useCallback(
    (index: number) => {
      if (!isTransitioning) {
        goToSlide(index);
      }
    },
    [goToSlide, isTransitioning]
  );

  // 마우스 이벤트 핸들러
  const handleMouseEnter = useCallback(() => {
    stopAutoPlay();
  }, [stopAutoPlay]);

  const handleMouseLeave = useCallback(() => {
    startAutoPlay();
  }, [startAutoPlay]);

  // 자동재생 초기화 및 정리
  useEffect(() => {
    startAutoPlay();
    return stopAutoPlay;
  }, [startAutoPlay, stopAutoPlay]);

  // 키보드 네비게이션
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent): void => {
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          prevSlide();
          break;
        case 'ArrowRight':
          e.preventDefault();
          nextSlide();
          break;
        case 'Home':
          e.preventDefault();
          goToSlide(0);
          break;
        case 'End':
          e.preventDefault();
          goToSlide(slides.length - 1);
          break;
      }
    };

    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener('keydown', handleKeyDown);
      return () => carousel.removeEventListener('keydown', handleKeyDown);
    }
  }, [prevSlide, nextSlide, goToSlide, slides.length]);

  // 빈 슬라이드 처리
  if (!slides || slides.length === 0) {
    return null;
  }

  return (
    <div
      ref={carouselRef}
      aria-label="이미지 캐러셀"
      aria-live="polite"
      className={cn(
        'relative mx-auto h-260 w-full overflow-hidden rounded-2xl bg-white shadow-2xl lg:h-562',
        className
      )}
      role="region"
      tabIndex={0}
      {...props}
    >
      {/* 메인 캐러셀 영역 */}
      <div
        className="group relative h-full w-full overflow-hidden"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchEnd={handleTouchEnd}
        onTouchMove={handleTouchMove}
        onTouchStart={handleTouchStart}
      >
        {/* 슬라이드 컨테이너 */}
        <div
          aria-label={`슬라이드 ${currentSlide + 1} / ${slides.length}`}
          className="flex h-full transition-transform duration-300 ease-out"
          role="group"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              aria-hidden={index !== currentSlide}
              aria-label={slide.alt ?? '슬라이드'}
              className="relative h-full min-w-full overflow-hidden"
              role="tabpanel"
            >
              <Image
                fill
                alt={slide.alt ?? '슬라이드 이미지'}
                className="object-contain"
                priority={index === 0}
                src={slide.image}
              />
            </div>
          ))}
        </div>

        {/* 슬라이드 카운터 - 우측 하단으로 이동 */}
        {showCounter && (
          <div className="absolute right-4 bottom-4">
            <CardPagination
              currentPage={currentSlide + 1}
              totalPage={slides.length}
            />
          </div>
        )}

        {/* 인디케이터 - 하단 가운데 */}
        {slides.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 transform">
            <Indicator
              current={currentSlide}
              disabled={isTransitioning}
              total={slides.length}
              onIndicatorClick={handleIndicatorClick}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageCarousel;
