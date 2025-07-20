'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

import LandingButton from './LandingButton';
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
    <LandingSection className="min-h-750 items-center justify-center gap-80 lg:min-h-1080 lg:justify-end lg:gap-50">
      <hgroup className="relative z-5 flex flex-col items-center">
        <motion.h1
          animate={{ opacity: 1, y: 0 }}
          className="relative mb-28 h-21 w-121 lg:mb-50 lg:h-29 lg:w-204"
          initial={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          <span className="sr-only">알바메이트</span>
          <Image fill alt="알바메이트" src="/logos/logo.svg" />
        </motion.h1>
        <LandingHeroText isWhite />
        <motion.div
          animate={{ opacity: 1 }}
          className="mt-50"
          initial={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut', delay: 2 }}
        >
          <LandingButton content="시작하기" />
        </motion.div>
      </hgroup>
      <div className="relative h-244 w-386 lg:h-610 lg:w-964">
        <Image
          alt="알바메이트"
          className="absolute right-0 bottom-0 z-1 h-206 w-364 lg:h-515 lg:w-909"
          height={206}
          src="/images/landing/hero-file-bg.png"
          width={364}
        />
        <ul className="relative h-full w-full">
          {fileList.map((file, index) => (
            <motion.li
              key={file.src}
              animate={{
                y: 0,
                opacity: 1,
              }}
              className="absolute z-2 h-139 w-130 lg:h-342 lg:w-334"
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
                delay: index * 0.15 + 1,
                ease: 'easeInOut',
                type: 'spring',
                stiffness: 120,
                damping: 18,
              }}
            >
              <Image alt="알바메이트" height={139} src={file.src} width={130} />
            </motion.li>
          ))}
        </ul>
        <Image
          alt="알바메이트"
          className="absolute bottom-0 left-0 z-3 h-156 w-320 lg:h-390 lg:w-798"
          height={156}
          src="/images/landing/hero-file-fw.png"
          width={320}
        />
      </div>
    </LandingSection>
  );
};

export default HeroSection;
