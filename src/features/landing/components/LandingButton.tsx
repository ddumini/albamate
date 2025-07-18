'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { useState } from 'react';

interface LandingButtonProps {
  content: string;
}

const LandingButton = ({ content }: LandingButtonProps) => {
  const [circleStyle, setCircleStyle] = useState<React.CSSProperties>({});
  const linkRef = useRef<HTMLAnchorElement>(null);

  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!linkRef.current) return;
    const rect = linkRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // 초기 상태 설정
    setCircleStyle({
      left: x - 160,
      top: y - 160,
      transform: 'scale(0)',
      opacity: 0,
    });

    requestAnimationFrame(() => {
      setCircleStyle(prev => ({
        ...prev,
        transform: 'scale(1.5)',
        opacity: 1,
        transition:
          'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease-out',
      }));
    });
  };

  const handleMouseLeave = () => {
    setCircleStyle(prev => ({
      ...prev,
      transform: 'scale(0)',
      opacity: 0,
      transition:
        'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.2s ease-in',
    }));
  };

  return (
    <Link
      ref={linkRef}
      className="relative flex h-80 min-w-223 items-center justify-center overflow-hidden rounded-full bg-blue-300 px-30 text-2xl font-bold text-gray-50"
      href="/albalist"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span
        // 동적 애니메이션을 위한 인라인 스타일
        // tailwind로 처리할 수 없는 transform, opacity, transition 값들을 동적으로 제어
        style={{
          position: 'absolute',
          width: 320,
          height: 320,
          borderRadius: '50%',
          pointerEvents: 'none',
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          zIndex: 0,
          ...circleStyle,
          transform: circleStyle.transform || 'scale(0)',
          opacity: circleStyle.opacity ?? 0,
        }}
      />
      <span className="relative z-10">{content}</span>
    </Link>
  );
};

export default LandingButton;
