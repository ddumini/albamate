'use client';

import { motion } from 'framer-motion';

import { cn } from '@/shared/lib/cn';

import AnalogClock from './AnalogClock';
import LandingContainer from './LandingContainer';
import LandingSection from './LandingSection';
import LandingSectionImage from './LandingSectionImage';
import SubTitle from './SubTitle';
import Title from './Title';

const DiagonalLine = [
  '-top-[25%] left-[55%]',
  '-top-[15%] left-[50%]',
  'top-[70%] -left-[30%]',
  'top-[75%] -left-[40%]',
];

const subTitles = [
  '1분만에 알바폼을 만들어 보세요!',
  '링크를 복사하여 어디서든지 사용하세요.',
];

const AlbaformSection = () => {
  return (
    <LandingSection>
      <LandingContainer>
        <div className="flex flex-col gap-2">
          <Title className="text-gray-50">쉽고 빨라요</Title>
          <SubTitle className="text-gray-100" subTitles={subTitles} />
        </div>
        <LandingSectionImage className="mt-104 translate-x-1/5 md:translate-x-0 lg:mt-126">
          <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={`animation-line-${DiagonalLine[i]}`}
                animate={{
                  scaleX: [0.2, 1, 0.2],
                  opacity: [0.3, 1, 0.3],
                }}
                aria-hidden="true"
                className={cn(
                  'absolute h-1 w-60 rotate-[45deg] rounded-full bg-white/30 opacity-30 md:w-80 lg:h-2 lg:w-180',
                  DiagonalLine[i]
                )}
                initial={{ scaleX: 0.2, opacity: 0.3 }}
                transition={{
                  repeat: Infinity,
                  duration: 0.8,
                  delay: i * 0.1,
                  ease: 'easeInOut',
                  repeatType: 'reverse',
                }}
                viewport={{ once: false }}
                whileInView={{
                  transition: { repeat: Infinity },
                }}
              />
            ))}
          </div>
          <AnalogClock />
        </LandingSectionImage>
      </LandingContainer>
    </LandingSection>
  );
};

export default AlbaformSection;
