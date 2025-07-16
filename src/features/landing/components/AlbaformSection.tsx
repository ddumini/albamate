'use client';

import { motion } from 'framer-motion';

import AnalogClock from './AnalogClock';
import LandingContainer from './LandingContainer';
import SubTitle from './SubTitle';

const DiagonalLine = [
  { top: -110, left: '55%' },
  { top: -80, left: '50%' },
  { top: 320, left: '-30%' },
  { top: 350, left: '-40%' },
];

const subTitles = [
  '1분만에 알바폼을 만들어 보세요!',
  '링크를 복사하여 어디서든지 사용하세요.',
];

const AlbaformSection = () => {
  return (
    <section className="relative z-10 flex h-screen flex-col justify-center overflow-hidden bg-transparent">
      <LandingContainer>
        <div className="flex flex-col gap-2">
          <motion.h2
            className="mb-40 text-5xl font-bold text-gray-50"
            initial={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            viewport={{ once: true, amount: 0.7 }}
            whileInView={{ opacity: 1 }}
          >
            쉽고 빨라요
          </motion.h2>
          <SubTitle className="text-gray-100" subTitles={subTitles} />
        </div>
        <div className="relative mt-126 flex flex-col gap-2">
          <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={`animation-line-${DiagonalLine[i]?.top}`}
                animate={{
                  scaleX: [0.2, 1, 0.2],
                  opacity: [0.3, 1, 0.3],
                }}
                aria-hidden="true"
                className="absolute h-[2px] w-[180px] rotate-[45deg] rounded-full bg-white/30 opacity-30"
                initial={{ scaleX: 0.2, opacity: 0.3 }}
                style={{
                  top: DiagonalLine[i]?.top ?? 0,
                  left: DiagonalLine[i]?.left ?? 0,
                }}
                transition={{
                  repeat: Infinity,
                  duration: 0.8,
                  delay: i * 0.1,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>
          <AnalogClock />
        </div>
      </LandingContainer>
    </section>
  );
};

export default AlbaformSection;
