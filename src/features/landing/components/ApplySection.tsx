'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

import LandingContainer from './LandingContainer';
import SubTitle from './SubTitle';

const subTitles = ['간단한 정보만 입력해도', '알바 지원이 가능합니다'];

const ApplySection = () => {
  return (
    <section className="relative z-10 flex h-screen flex-col justify-center overflow-hidden bg-transparent">
      <motion.div
        className="absolute right-5 bottom-5 -z-10 h-[100vh] w-[100vh] rounded-full bg-[#F89A05]"
        initial={{ scale: 0 }}
        transition={{ duration: 2.5, ease: 'easeOut', delay: 0.3 }}
        viewport={{ once: false, margin: '-10px' }}
        whileInView={{ scale: 4 }}
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
          <ul className="h-140 w-full">
            {Array.from({ length: 4 }, (_, idx) => (
              <li key={idx}>
                <Image
                  alt={`apply-${idx + 1}`}
                  height={70}
                  loading="lazy"
                  quality={90}
                  sizes="70px"
                  src={`/images/landing/apply-icon0${idx + 1}.png`}
                  style={{ width: '70px', height: '70px' }}
                  width={70}
                />
              </li>
            ))}
          </ul>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            viewport={{ once: true, amount: 0.3 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <Image
              alt="anywhere-1"
              height={360}
              loading="lazy"
              src="/images/landing/apply-girl.png"
              style={{ width: '100%', height: 'auto' }}
              width={555}
            />
          </motion.div>
        </div>
      </LandingContainer>
    </section>
  );
};

export default ApplySection;
