'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { v4 as uuidv4 } from 'uuid';

import useViewport from '@/shared/hooks/useViewport';

import LandingContainer from './LandingContainer';
import LandingSection from './LandingSection';
import LandingSectionImage from './LandingSectionImage';
import SubTitle from './SubTitle';
import Title from './Title';

interface CardItem {
  bg: string;
  bar: string;
}

const ManageSection = () => {
  const { isDesktop, isTablet } = useViewport();

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

  // 사이즈별 카드 높이 상수
  const CARD_HEIGHT_MOBILE = 66;
  const CARD_HEIGHT_TABLET = 78;
  const CARD_HEIGHT_DESKTOP = 144;

  // 현재 사이즈에 따른 카드 높이 선택
  let CARD_HEIGHT = CARD_HEIGHT_MOBILE;
  if (isDesktop) {
    CARD_HEIGHT = CARD_HEIGHT_DESKTOP;
  } else if (isTablet) {
    CARD_HEIGHT = CARD_HEIGHT_TABLET;
  }

  const ANIMATION_STEPS = [0, -CARD_HEIGHT * 1, -CARD_HEIGHT * 2];

  return (
    <LandingSection>
      <LandingContainer>
        <div>
          <Title className="text-[#EE893F]">한 곳에서 쉽게 관리하세요</Title>
          <SubTitle className="text-[#F9C675]" subTitles={subTitles} />
        </div>
        <LandingSectionImage className="mt-30 md:mt-60 lg:mt-100">
          <div className="h-188 w-180 bg-[url('/images/landing/manage-bg.png')] bg-cover bg-center px-14 pt-36 md:h-235 md:w-225 md:px-17 md:pt-45 lg:h-470 lg:w-449 lg:px-35 lg:pt-90">
            <div className="h-full w-full overflow-hidden">
              <motion.ul
                className="flex flex-col gap-16 md:gap-20 lg:gap-40"
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
                    className="flex items-center gap-10 rounded-lg px-17 py-8 will-change-transform md:gap-12 md:px-22 md:py-12 lg:gap-25 lg:rounded-2xl lg:px-33 lg:py-23"
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
                      className="h-24 w-24 flex-shrink-0 md:h-30 md:w-30 lg:h-61 lg:w-61"
                      height={24}
                      src="/icons/user-profile.svg"
                      width={24}
                    />
                    <div className="w-full">
                      <div
                        className="mb-14 h-4 w-[30%] rounded-full lg:mb-28"
                        style={{ backgroundColor: bar }}
                      />
                      <div
                        className="mb-8 h-4 w-full rounded-full lg:mb-16 lg:h-8"
                        style={{ backgroundColor: bar }}
                      />
                      <div
                        className="h-4 w-[70%] rounded-full lg:h-8"
                        style={{ backgroundColor: bar }}
                      />
                    </div>
                  </motion.li>
                ))}
                {Array.from({ length: 3 }).map((_, idx) => (
                  <li
                    key={uuidv4()}
                    className="filter-grayscale flex items-center gap-10 rounded-lg bg-gray-50 px-17 py-8 will-change-transform md:gap-12 md:px-22 md:py-12 lg:gap-25 lg:rounded-2xl lg:px-33 lg:py-23"
                  >
                    <Image
                      alt={`manage-placeholder-${idx + 1}`}
                      className="h-24 w-24 flex-shrink-0 md:h-30 md:w-30 lg:h-61 lg:w-61"
                      height={24}
                      src="/icons/user-profile.svg"
                      width={24}
                    />
                    <div className="w-full">
                      <div className="mb-14 h-4 w-[30%] rounded-full bg-gray-200 lg:mb-28" />
                      <div className="mb-8 h-4 w-full rounded-full bg-gray-200 lg:mb-16 lg:h-8" />
                      <div className="h-4 w-[70%] rounded-full bg-gray-200 lg:h-8" />
                    </div>
                  </li>
                ))}
              </motion.ul>
            </div>
          </div>
        </LandingSectionImage>
      </LandingContainer>
    </LandingSection>
  );
};

export default ManageSection;
