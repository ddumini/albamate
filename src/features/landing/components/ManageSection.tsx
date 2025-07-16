'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { v4 as uuidv4 } from 'uuid';

import LandingContainer from './LandingContainer';
import LandingSection from './LandingSection';
import SubTitle from './SubTitle';

interface CardItem {
  bg: string;
  bar: string;
}

const ManageSection = () => {
  const subTitles = [
    '알바폼 관리 페이지에서',
    '지원 현황을 확인하고',
    '지원자별 상태를 관리할 수 있습니다.',
  ];

  const cardList: CardItem[] = [
    {
      bg: '#EE893F',
      bar: '#FCC369',
    },
    {
      bg: '#F9C675',
      bar: '#F6E2B3',
    },
    {
      bg: '#F7BFA0',
      bar: '#E6D6F7',
    },
  ];

  const CARD_HEIGHT = 154;
  const ANIMATION_STEPS = [0, -CARD_HEIGHT * 1, -CARD_HEIGHT * 2];

  return (
    <LandingSection>
      <LandingContainer>
        <div>
          <h2 className="mb-40 text-5xl font-bold text-[#EE893F]">
            한 곳에서 쉽게 관리하세요
          </h2>
          <SubTitle className="text-[#F9C675]" subTitles={subTitles} />
        </div>
        <div className="mt-100 h-470 w-449 bg-[url('/images/landing/manage-bg.png')] bg-cover bg-center px-35 pt-90">
          <div className="h-full w-full overflow-hidden">
            <motion.ul
              className="flex flex-col gap-40"
              initial={{ y: 0 }}
              transition={{
                delay: 1,
                duration: 2,
              }}
              viewport={{ once: true, amount: 0.1 }}
              whileInView={{
                y: ANIMATION_STEPS,
              }}
            >
              {cardList.map(({ bg, bar }, idx) => (
                <motion.li
                  key={bg}
                  className="flex items-center gap-25 rounded-2xl px-33 py-23 will-change-transform"
                  initial={{ opacity: 0.6, filter: 'grayscale(100%)' }}
                  style={{ backgroundColor: bg }}
                  transition={{ duration: 1, delay: idx }}
                  viewport={{ once: true, amount: 0.1 }}
                  whileInView={{
                    opacity: 1,
                    filter: 'grayscale(0%)',
                  }}
                >
                  <Image
                    alt={`manage-${idx + 1}`}
                    className="flex-shrink-0"
                    height={61}
                    src="/icons/user-profile.svg"
                    width={61}
                  />
                  <div className="w-full">
                    <div
                      className="mb-28 h-8 w-60 rounded-full"
                      style={{ backgroundColor: bar }}
                    />
                    <div
                      className="mb-16 h-8 w-full rounded-full"
                      style={{ backgroundColor: bar }}
                    />
                    <div
                      className="h-8 w-121 rounded-full"
                      style={{ backgroundColor: bar }}
                    />
                  </div>
                </motion.li>
              ))}
              {Array.from({ length: 3 }).map((_, idx) => (
                <li
                  key={uuidv4()}
                  className="filter-grayscale flex items-center gap-25 rounded-2xl bg-gray-100 px-33 py-23"
                >
                  <Image
                    alt={`manage-placeholder-${idx + 1}`}
                    className="flex-shrink-0"
                    height={61}
                    src="/icons/user-profile.svg"
                    width={61}
                  />
                  <div className="w-full">
                    <div className="mb-28 h-8 w-60 rounded-full bg-gray-200" />
                    <div className="mb-16 h-8 w-full rounded-full bg-gray-200" />
                    <div className="h-8 w-121 rounded-full bg-gray-200" />
                  </div>
                </li>
              ))}
            </motion.ul>
          </div>
        </div>
      </LandingContainer>
    </LandingSection>
  );
};

export default ManageSection;
