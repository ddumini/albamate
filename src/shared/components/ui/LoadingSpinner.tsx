'use client';

/**
 * LoadingSpinner 컴포넌트
 *
 * - 로딩 애니메이션을 렌더링합니다.
 *
 * @author sumin
 * @date 2025-07-17
 *
 * @component
 *
 * @param {Object} props
 * @param {string} props.size - 로딩 애니메이션 크기
 * @param {string} props.className - 추가 클래스 이름
 * @returns {JSX.Element} 로딩 애니메이션을 렌더링하는 컴포넌트
 *
 * 참고: prefers-reduced-motion 설정 감지
 * 사용자가 애니메이션 감소 설정을 하면 애니메이션을 멈춥니다.
 * 시각적 민감성: 애니메이션에 민감한 사용자들을 보호합니다
 * 성능 최적화: 애니메이션을 비활성화하여 배터리 수명과 성능을 개선합니다
 *
 */

import Lottie from 'lottie-react';
import { useEffect, useState } from 'react';

import animationData from '@/assets/animations/Loading.json';
import { cn } from '@/shared/lib/cn';

interface LoadingSpinnerProps {
  size: 'sm' | 'lg';
  className?: string;
}

const LoadingSpinner = ({
  size = 'sm',
  className = '',
}: LoadingSpinnerProps) => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // 사용자의 prefers-reduced-motion 설정 확인
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    // 설정 변경 감지
    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return (
    <div
      className={cn(
        `flex aspect-square items-center justify-center ${className}`,
        size === 'sm' && 'w-60 lg:w-80',
        size === 'lg' && 'w-90 lg:w-120'
      )}
    >
      <Lottie
        animationData={animationData}
        aria-label="로딩 중입니다"
        autoplay={!prefersReducedMotion}
        className="h-full w-full"
        loop={!prefersReducedMotion}
        role="img"
      />
    </div>
  );
};

export default LoadingSpinner;
