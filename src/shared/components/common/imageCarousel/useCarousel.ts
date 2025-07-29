'use client';

import { useCallback, useEffect, useReducer } from 'react';

import { CarouselAction, CarouselState, UseCarouselProps } from './carousel';

function reducer(state: CarouselState, action: CarouselAction): CarouselState {
  switch (action.type) {
    case 'GO_TO':
      return { ...state, isTransitioning: true, currentSlide: action.index };
    case 'NEXT':
      return {
        ...state,
        isTransitioning: true,
        currentSlide: (state.currentSlide + 1) % action.total,
      };
    case 'PREV':
      return {
        ...state,
        isTransitioning: true,
        currentSlide:
          state.currentSlide === 0 ? action.total - 1 : state.currentSlide - 1,
      };
    case 'END_TRANSITION':
      return { ...state, isTransitioning: false };
    case 'TOGGLE_AUTOPLAY':
      return { ...state, isAutoPlaying: !state.isAutoPlaying };
    default:
      return state;
  }
}

export default function useCarousel({
  totalSlides,
  onSlideChange,
}: UseCarouselProps) {
  const [state, dispatch] = useReducer(reducer, {
    currentSlide: 0,
    isTransitioning: false,
    isAutoPlaying: true,
  });

  // transition이 시작될 때 END_TRANSITION을 300ms 후에 dispatch
  useEffect(() => {
    if (state.isTransitioning) {
      const timer = setTimeout(() => {
        dispatch({ type: 'END_TRANSITION' });
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [state.isTransitioning]);

  const goToSlide = useCallback(
    (index: number) => {
      if (state.isTransitioning || index < 0 || index >= totalSlides) return;
      dispatch({ type: 'GO_TO', index });
      onSlideChange?.(index);
    },
    [state.isTransitioning, totalSlides, onSlideChange]
  );

  const nextSlide = useCallback(() => {
    if (state.isTransitioning) return;
    const nextIndex = (state.currentSlide + 1) % totalSlides;
    dispatch({ type: 'NEXT', total: totalSlides });
    onSlideChange?.(nextIndex);
  }, [state.isTransitioning, totalSlides, state.currentSlide, onSlideChange]);

  const prevSlide = useCallback(() => {
    if (state.isTransitioning) return;
    const prevIndex =
      state.currentSlide === 0 ? totalSlides - 1 : state.currentSlide - 1;
    dispatch({ type: 'PREV', total: totalSlides });
    onSlideChange?.(prevIndex);
  }, [state.isTransitioning, totalSlides, state.currentSlide, onSlideChange]);

  const toggleAutoPlay = useCallback(() => {
    dispatch({ type: 'TOGGLE_AUTOPLAY' });
  }, []);

  return {
    ...state,
    goToSlide,
    nextSlide,
    prevSlide,
    toggleAutoPlay,
  };
}
