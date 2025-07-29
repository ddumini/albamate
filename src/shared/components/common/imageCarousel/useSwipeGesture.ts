'use client';
import { useCallback, useState } from 'react';

import { TouchPosition, UseSwipeGestureProps } from './carousel';

export const useSwipeGesture = ({
  onSwipeLeft,
  onSwipeRight,
  minSwipeDistance = 50,
}: UseSwipeGestureProps) => {
  const [touchStart, setTouchStart] = useState<TouchPosition | null>(null);
  const [touchEnd, setTouchEnd] = useState<TouchPosition | null>(null);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    // 터치 이벤트가 있고 첫 번째 터치포인트가 존재하는지 확인
    const touch = e.targetTouches?.[0];
    if (!touch) return;

    setTouchStart({ x: touch.clientX, y: touch.clientY });
    setTouchEnd(null);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    // 터치 이벤트가 있고 첫 번째 터치포인트가 존재하는지 확인
    const touch = e.targetTouches?.[0];
    if (!touch) return;

    setTouchEnd({ x: touch.clientX, y: touch.clientY });
  }, []);

  const handleTouchEnd = useCallback(() => {
    // 시작점과 끝점이 모두 존재하는지 확인
    if (!touchStart || !touchEnd) return;

    const distanceX = touchStart.x - touchEnd.x;
    const distanceY = touchStart.y - touchEnd.y;
    const isHorizontalSwipe = Math.abs(distanceX) > Math.abs(distanceY);

    // 최소 스와이프 거리를 만족하는 수평 스와이프인지 확인
    if (isHorizontalSwipe && Math.abs(distanceX) > minSwipeDistance) {
      if (distanceX > 0) {
        onSwipeLeft(); // 왼쪽으로 스와이프 (다음 슬라이드)
      } else {
        onSwipeRight(); // 오른쪽으로 스와이프 (이전 슬라이드)
      }
    }

    // 상태 초기화
    setTouchStart(null);
    setTouchEnd(null);
  }, [touchStart, touchEnd, minSwipeDistance, onSwipeLeft, onSwipeRight]);

  return {
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  };
};
