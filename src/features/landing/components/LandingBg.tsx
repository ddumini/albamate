'use client';

import { motion } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';

import { cn } from '@/shared/lib/cn';

// 섹션별 배경색 정의 (RGB) - 섹션 순서대로 정의
const SECTION_COLORS = [
  { r: 31, g: 31, b: 31 }, // black-400 (HeroSection)
  { r: 220, g: 230, b: 255 }, // white (AnywhereSection)
  { r: 70, g: 114, b: 225 }, // white (AlbaformSection)
  { r: 254, g: 242, b: 221 }, // white (AlbaformSection)
  { r: 254, g: 242, b: 221 }, // white (AlbaformSection)
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

  // 스크롤 진행률에 따른 배경색 계산 (동적 섹션 지원)
  const getBackgroundColor = () => {
    if (sections.length === 0) {
      return `rgb(${SECTION_COLORS[0]?.r || 31}, ${SECTION_COLORS[0]?.g || 31}, ${SECTION_COLORS[0]?.b || 31})`;
    }

    if (sections.length === 1) {
      const color = SECTION_COLORS[0] || { r: 31, g: 31, b: 31 };
      return `rgb(${color.r}, ${color.g}, ${color.b})`;
    }

    // 섹션이 2개 이상인 경우
    const totalSections = sections.length;
    const totalColorSegments = totalSections - 1;

    // 전체 스크롤 진행률을 섹션별 세그먼트로 변환
    const segmentProgress = scrollProgress * totalColorSegments;
    const currentSegmentIndex = Math.floor(segmentProgress);
    const nextSegmentIndex = Math.min(
      currentSegmentIndex + 1,
      totalColorSegments
    );

    // 현재 세그먼트 내에서의 진행률 (0~1)
    const segmentLocalProgress = segmentProgress - currentSegmentIndex;

    // 색상 배열에서 해당하는 색상 가져오기
    const currentColor = SECTION_COLORS[currentSegmentIndex] ||
      SECTION_COLORS[0] || { r: 31, g: 31, b: 31 };
    const nextColor =
      SECTION_COLORS[nextSegmentIndex] ||
      SECTION_COLORS[totalColorSegments] ||
      currentColor;

    return interpolateRgb(currentColor, nextColor, segmentLocalProgress);
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
