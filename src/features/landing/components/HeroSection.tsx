'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

import RoundedButton from '@/shared/components/common/button/RoundedButton';

import LandingHeroText from './LandingHeroText';
import LandingSection from './LandingSection';

const HeroSection = () => {
  const fileList = [
    {
      src: '/images/landing/hero-file01.png',
      left: '50%',
      bottom: '40%',
    },
    {
      src: '/images/landing/hero-file04.png',
      left: '40%',
      bottom: '3%',
    },
    {
      src: '/images/landing/hero-file02.png',
      left: '20%',
      bottom: '30%',
    },
    {
      src: '/images/landing/hero-file03.png',
      left: '10%',
      bottom: '3%',
    },
  ];
  return (
    <LandingSection className="items-center justify-end gap-50">
      <hgroup className="relative z-5 flex flex-col items-center">
        <motion.h1
          animate={{ opacity: 1, y: 0 }}
          className="relative mb-50 h-29 w-204"
          initial={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          <span className="sr-only">알바메이트</span>
          <Image fill alt="알바메이트" src="/logos/logo.svg" />
        </motion.h1>
        <LandingHeroText isWhite />
        <motion.div
          animate={{ opacity: 1 }}
          className="mt-50"
          initial={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut', delay: 2.8 }}
        >
          <RoundedButton
            buttonClassName="bg-blue-300 text-gray-50 h-80 w-223 text-2xl font-bold"
            label="시작하기"
            type="button"
          />
        </motion.div>
      </hgroup>
      <div className="relative h-610 w-964">
        <Image
          alt="알바메이트"
          className="absolute right-0 bottom-0 z-1"
          height={515}
          src="/images/landing/hero-file-bg.png"
          width={909}
        />
        <ul className="relative h-full w-full">
          {fileList.map((file, index) => (
            <motion.li
              key={file.src}
              animate={{
                y: 0,
                opacity: 1,
              }}
              className="absolute z-2"
              initial={{
                y: -1000,
                opacity: 0,
              }}
              style={{
                left: file.left,
                bottom: file.bottom,
              }}
              transition={{
                duration: 0.5,
                delay: index * 0.15 + 2,
                ease: 'easeInOut',
                type: 'spring',
                stiffness: 120,
                damping: 18,
              }}
            >
              <Image alt="알바메이트" height={342} src={file.src} width={334} />
            </motion.li>
          ))}
        </ul>
        <Image
          alt="알바메이트"
          className="absolute bottom-0 left-0 z-3"
          height={390}
          src="/images/landing/hero-file-fw.png"
          width={798}
        />
      </div>
    </LandingSection>
  );
};

export default HeroSection;
