'use client';

import { motion } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';

import { cn } from '@/shared/lib/cn';

// 섹션별 배경색 정의 (RGB)
const SECTION_COLORS = [
  { r: 31, g: 31, b: 31 }, // black-400 (HeroSection)
  { r: 255, g: 255, b: 255 }, // white (AnywhereSection)
];

// 두 RGB 색상 간의 보간
const interpolateRgb = (
  color1: { r: number; g: number; b: number },
  color2: { r: number; g: number; b: number },
  progress: number
) => {
  const r = Math.round(color1.r + (color2.r - color1.r) * progress);
  const g = Math.round(color1.g + (color2.g - color1.g) * progress);
  const b = Math.round(color1.b + (color2.b - color1.b) * progress);

  return `rgb(${r}, ${g}, ${b})`;
};

const LandingBg = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [sections, setSections] = useState<Element[]>([]);

  // 스크롤 진행률 계산
  const calculateScrollProgress = useCallback(() => {
    if (sections.length === 0) return;

    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    const totalScrollable = documentHeight - windowHeight;
    const progress = Math.min(Math.max(scrollTop / totalScrollable, 0), 1);

    setScrollProgress(progress);
  }, [sections.length]);

  // 스크롤 이벤트 핸들러 (throttle 적용)
  const handleScroll = useCallback(() => {
    let ticking = false;

    return () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          calculateScrollProgress();
          ticking = false;
        });
        ticking = true;
      }
    };
  }, [calculateScrollProgress]);

  useEffect(() => {
    const sectionElements = document.querySelectorAll('section');
    setSections(Array.from(sectionElements));

    const throttledScrollHandler = handleScroll();
    window.addEventListener('scroll', throttledScrollHandler, {
      passive: true,
    });

    calculateScrollProgress();

    return () => {
      window.removeEventListener('scroll', throttledScrollHandler);
    };
  }, [handleScroll, calculateScrollProgress]);

  // 스크롤 진행률에 따른 배경색 계산
  const getBackgroundColor = () => {
    if (sections.length < 2) {
      return `rgb(${SECTION_COLORS[0]?.r}, ${SECTION_COLORS[0]?.g}, ${SECTION_COLORS[0]?.b})`;
    }

    return interpolateRgb(
      SECTION_COLORS[0]!,
      SECTION_COLORS[1]!,
      scrollProgress
    );
  };

  const backgroundColor = getBackgroundColor();

  return (
    <motion.div
      ref={containerRef}
      className={cn('fixed inset-0 z-0 h-full w-full')}
      style={{ backgroundColor }}
      transition={{
        duration: 0.1,
        ease: 'linear',
      }}
    />
  );
};

export default LandingBg;
