'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { v4 as uuidv4 } from 'uuid';

import LandingContainer from './LandingContainer';
import LandingSection from './LandingSection';
import SubTitle from './SubTitle';

const ApplySection = () => {
  const subTitles = ['간단한 정보만 입력해도', '알바 지원이 가능합니다'];

  const floatingAnimations = [
    {
      y: [-10, -20, -10],
      x: [-5, 10, -5],
      scale: [1, 1.05, 1],
      rotate: [-2, 3, -2],
      duration: 3,
      delay: 0,
    },
    {
      y: [-15, -25, -15],
      x: [8, -12, 8],
      scale: [1, 1.08, 1],
      rotate: [3, -4, 3],
      duration: 2.5,
      delay: 0.5,
    },
    {
      y: [-8, -18, -8],
      x: [-12, 15, -12],
      scale: [1, 1.03, 1],
      rotate: [-1, 2, -1],
      duration: 3.5,
      delay: 1,
    },
    {
      y: [-12, -22, -12],
      x: [15, -8, 15],
      scale: [1, 1.06, 1],
      rotate: [2, -3, 2],
      duration: 2.8,
      delay: 1.5,
    },
  ];
  return (
    <LandingSection>
      <motion.div
        className="absolute right-5 bottom-5 -z-10 h-[100vh] w-[100vh] rounded-full bg-[#F89A05]"
        initial={{ scale: 0 }}
        transition={{ duration: 2, ease: 'easeOut', delay: 0.3 }}
        viewport={{ once: true, margin: '-10px' }}
        whileInView={{ scale: 4.3 }}
      />
      <LandingContainer>
        <div className="flex flex-col gap-2">
          <motion.h2
            className="mb-40 text-5xl font-bold text-[#FFF7EB]"
            initial={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            viewport={{ once: true, amount: 0.7 }}
            whileInView={{ opacity: 1 }}
          >
            쉽고 빠르게 알바 지원
          </motion.h2>
          <SubTitle className="text-[#FFE1B2]" subTitles={subTitles} />
        </div>
        <div className="relative mt-126 flex flex-col gap-2">
          <ul className="flex h-140 w-full justify-between px-50">
            {floatingAnimations.map((animation, idx) => (
              <motion.li
                key={uuidv4()}
                animate={{
                  y: animation.y,
                  x: animation.x,
                  scale: animation.scale,
                  rotate: animation.rotate,
                }}
                initial={{
                  y: animation.y[0],
                  x: animation.x[0],
                  scale: animation.scale[0],
                  rotate: animation.rotate[0],
                }}
                transition={{
                  duration: animation.duration,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  ease: 'easeInOut',
                  delay: animation.delay,
                }}
              >
                <Image
                  alt={`apply-${idx + 1}`}
                  height={70}
                  loading="lazy"
                  quality={90}
                  sizes="70px"
                  src={`/images/landing/apply-icon0${idx + 1}.png`}
                  width={70}
                />
              </motion.li>
            ))}
          </ul>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            viewport={{ once: true, amount: 0.3 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <Image
              alt="여성 지원자 캐릭터"
              height={360}
              loading="lazy"
              src="/images/landing/apply-girl.png"
              style={{ width: '100%', height: 'auto' }}
              width={555}
            />
          </motion.div>
        </div>
      </LandingContainer>
    </LandingSection>
  );
};

export default ApplySection;
