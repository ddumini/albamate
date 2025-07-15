'use client';

import { motion } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';

import { cn } from '@/shared/lib/cn';

// 섹션별 배경색 정의
const SECTION_COLORS = [
  'hsl(0, 0%, 12%)', // black-400 (HeroSection)
  'hsl(223, 100%, 93%)', // (AnywhereSection)
  'hsl(234, 18%, 20%)', // blue-300 (추가 섹션)
  'hsl(0, 0%, 2%)', // black-500 (마지막 섹션)
];

const LandingBg = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentSection, setCurrentSection] = useState(0);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // 섹션 변경 핸들러를 useCallback으로 메모이제이션
  const handleSectionChange = useCallback((sectionIndex: number) => {
    setCurrentSection(sectionIndex);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll('section');

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -20% 0px', // 감지 영역을 줄여서 더 안정적으로
      threshold: [0, 0.5, 1], // 여러 임계값으로 더 정확한 감지
    };

    observerRef.current = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
          const sectionsArray = Array.from(sections);
          const sectionIndex = sectionsArray.findIndex(
            section => section === entry.target
          );

          if (sectionIndex !== -1 && sectionIndex !== currentSection) {
            handleSectionChange(sectionIndex);
          }
        }
      });
    }, observerOptions);

    // 모든 섹션을 관찰
    sections.forEach(section => {
      observerRef.current?.observe(section);
    });

    return () => {
      if (observerRef.current) {
        sections.forEach(section => {
          observerRef.current?.unobserve(section);
        });
        observerRef.current.disconnect();
      }
    };
  }, [currentSection, handleSectionChange]);

  // 현재 섹션에 따른 배경색
  const backgroundColor = SECTION_COLORS[currentSection] || SECTION_COLORS[0];

  return (
    <motion.div
      ref={containerRef}
      className={cn('fixed inset-0 z-0 h-full w-full')}
      style={{ backgroundColor }}
      transition={{
        duration: 2,
        ease: 'linear',
      }}
    />
  );
};

export default LandingBg;
