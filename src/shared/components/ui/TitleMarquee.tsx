'use client';

import { usePathname } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';

interface TitleMarqueeProps {
  title: string;
}

const TitleMarquee = ({ title }: TitleMarqueeProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLSpanElement>(null); // 너비 측정용 숨김 텍스트
  const [animationDuration, setAnimationDuration] = useState<number | null>(
    null
  );
  const pathname = usePathname();

  useEffect(() => {
    const container = containerRef.current;
    const measure = measureRef.current;

    if (container && measure) {
      const containerWidth = container.offsetWidth;
      const textWidth = measure.offsetWidth;

      if (textWidth > containerWidth) {
        const duration = textWidth * 0.02;
        setAnimationDuration(duration);
      } else {
        setAnimationDuration(null);
      }
    }
  }, [title]);

  return (
    <div
      ref={containerRef}
      className={`relative max-w-345 overflow-hidden text-2lg font-bold whitespace-nowrap lg:text-xl ${
        pathname?.startsWith('/alba/') ? 'lg:max-w-500' : ''
      }`}
    >
      {/* 너비 측정용 숨겨진 텍스트 */}
      <span
        ref={measureRef}
        className="invisible absolute whitespace-nowrap"
        style={{
          position: 'absolute',
          whiteSpace: 'nowrap',
          visibility: 'hidden',
        }}
      >
        {title}
      </span>

      {animationDuration ? (
        <div
          className="flex w-fit gap-160 will-change-transform hover:animate-marquee"
          style={{
            animationDuration: `${animationDuration}s`,
          }}
        >
          <span>{title}</span>
          <span>{title}</span> {/* 반복용 */}
        </div>
      ) : (
        <span>{title}</span>
      )}
    </div>
  );
};

export default TitleMarquee;
