'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { v4 as uuidv4 } from 'uuid';

import { FLOATING_ANIMATIONS } from '../constants/animations';
import { APPLY_SECTION_CONTENT } from '../constants/content';
import LandingContainer from './LandingContainer';
import LandingSection from './LandingSection';
import LandingSectionImage from './LandingSectionImage';
import SubTitle from './SubTitle';
import Title from './Title';

const ApplySection = () => {
  const { title, subTitles } = APPLY_SECTION_CONTENT;

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
          <Title className="text-[#FFF7EB]">{title}</Title>
          <SubTitle className="text-[#FFE1B2]" subTitles={subTitles} />
        </div>
        <LandingSectionImage className="mt-30 md:mt-40 lg:mt-126">
          <ul className="flex h-40 w-full justify-between px-30 md:h-75 md:px-50 lg:h-140">
            {FLOATING_ANIMATIONS.map((animation, idx) => (
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
                  className="h-28 w-28 md:h-35 md:w-35 lg:h-70 lg:w-70"
                  height={70}
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
              className="h-144 w-222 md:h-180 md:w-277 lg:h-360 lg:w-555"
              height={360}
              loading="lazy"
              src="/images/landing/apply-girl.png"
              width={555}
            />
          </motion.div>
        </LandingSectionImage>
      </LandingContainer>
    </LandingSection>
  );
};

export default ApplySection;
