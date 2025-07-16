'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

import LandingContainer from './LandingContainer';
import LandingSection from './LandingSection';
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
            className="mb-40 text-5xl font-bold text-[#3A5497]"
            initial={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            viewport={{ once: true, amount: 0.7 }}
            whileInView={{ opacity: 1 }}
          >
            어디서든 지원받으세요
          </motion.h2>
          <SubTitle className="text-[#8C9ECC]" subTitles={subTitles} />
        </div>
        <div className="relative mt-126 flex flex-col gap-2">
          <motion.div
            className="absolute -top-92 -left-30 -translate-x-full"
            initial={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
            viewport={{ once: true, amount: 0.3 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <Image
              alt="anywhere-1"
              height={137}
              src="/images/landing/anywhere-icon01.png"
              width={147}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            viewport={{ once: true, amount: 0.3 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <Image
              alt="anywhere-1"
              height={462}
              loading="lazy"
              quality={90}
              src="/images/landing/anywhere-application.png"
              style={{ width: '100%', height: 'auto' }}
              width={354}
            />
          </motion.div>
          <motion.div
            className="absolute top-114 -left-54 -translate-x-full"
            initial={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.5 }}
            viewport={{ once: true, amount: 0.3 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <Image
              alt="anywhere-1"
              height={133}
              src="/images/landing/anywhere-icon02.png"
              width={157}
            />
          </motion.div>
        </div>
      </LandingContainer>
    </LandingSection>
  );
};

export default AnywhereSection;
