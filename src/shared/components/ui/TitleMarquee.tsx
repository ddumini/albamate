import React, { useEffect, useRef, useState } from 'react';

interface TitleMarqueeProps {
  title: string;
}

const TitleMarquee = ({ title }: TitleMarqueeProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [animationDuration, setAnimationDuration] = useState<number | null>(
    null
  );

  useEffect(() => {
    const container = containerRef.current;
    const text = textRef.current;

    if (container && text) {
      const containerWidth = container.offsetWidth;
      const textWidth = text.scrollWidth;

      console.log('containerWidth:', containerWidth, 'textWidth:', textWidth);

      if (textWidth > containerWidth) {
        const duration = textWidth * 0.015;
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
      <span
        ref={textRef}
        className={`inline-block pr-[100%] will-change-transform ${
          animationDuration ? 'animate-marquee' : ''
        }`}
        style={
          animationDuration
            ? { animationDuration: `${animationDuration}s` }
            : undefined
        }
      >
        {title}
      </span>
    </div>
  );
};

export default TitleMarquee;
