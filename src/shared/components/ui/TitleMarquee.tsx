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

  useEffect(() => {
    const container = containerRef.current;
    const measure = measureRef.current;

    if (container && measure) {
      const containerWidth = container.offsetWidth;
      const textWidth = measure.offsetWidth; // 순수 텍스트 너비만 측정

      console.log('containerWidth:', containerWidth, 'textWidth:', textWidth);

      if (textWidth > containerWidth) {
        const duration = textWidth * 0.03;
        setAnimationDuration(duration);
      } else {
        setAnimationDuration(null);
      }
    }
  }, [title]);

  return (
    <div
      ref={containerRef}
      className="relative max-w-[375px] overflow-hidden text-2lg font-bold whitespace-nowrap lg:max-w-[624px] lg:text-[26px]"
    >
      {/* 너비 측정용 숨겨진 텍스트 (화면에 안 보임) */}
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

      {/* 애니메이션용 텍스트 */}
      <span
        className={`inline-block will-change-transform ${
          animationDuration ? 'animate-marquee' : ''
        }`}
        style={{
          animationDuration: animationDuration
            ? `${animationDuration}s`
            : undefined,
          paddingRight: animationDuration ? '100%' : undefined,
        }}
      >
        {title}
      </span>
    </div>
  );
};

export default TitleMarquee;
