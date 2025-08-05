'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

import LandingContainer from './LandingContainer';
import LandingSection from './LandingSection';
import LandingSectionImage from './LandingSectionImage';
import SubTitle from './SubTitle';

const subTitles = [
  '다양한 사이트, SNS, 문자까지',
  '언제 어디서든 알바생을 구해보세요.',
];

const AnywhereSection = () => {
  return (
    <LandingSection>
      <LandingContainer>
        <div className="flex flex-col gap-2">
          <motion.h2
            className="mb-10 text-xl font-bold text-[#3A5497] md:mb-20 md:text-2xl lg:mb-40 lg:text-5xl"
            initial={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            viewport={{ once: true, amount: 0.7 }}
            whileInView={{ opacity: 1 }}
          >
            어디서든 지원받으세요
          </motion.h2>
          <SubTitle className="text-[#8C9ECC]" subTitles={subTitles} />
        </div>
        <LandingSectionImage className="mt-60 lg:mt-126">
          <motion.div
            className="absolute -top-26 -left-15 -translate-x-full lg:-top-92 lg:-left-30"
            initial={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
            viewport={{ once: true, amount: 0.3 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <Image
              alt="파일 아이콘"
              className="h-69 w-74 lg:h-137 lg:w-147"
              height={69}
              src="/images/landing/anywhere-icon01.png"
              width={74}
            />
          </motion.div>
          <motion.div
            className="relative h-231 w-186 lg:h-462 lg:w-372"
            initial={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            viewport={{ once: true, amount: 0.3 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <Image
              fill
              alt="알바 지원 이미지"
              className="object-contain"
              loading="lazy"
              quality={90}
              src="/images/landing/anywhere-application.png"
            />
          </motion.div>
          <motion.div
            className="absolute top-60 -left-27 -translate-x-full lg:top-114 lg:-left-54"
            initial={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.5 }}
            viewport={{ once: true, amount: 0.3 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <Image
              alt="메일 아이콘"
              className="h-67 w-79 lg:h-133 lg:w-157"
              height={67}
              src="/images/landing/anywhere-icon02.png"
              width={79}
            />
          </motion.div>
        </LandingSectionImage>
      </LandingContainer>
    </LandingSection>
  );
};

export default AnywhereSection;
