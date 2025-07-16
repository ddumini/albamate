'use client';

import RoundedButton from '@/shared/components/common/button/RoundedButton';

import LandingHeroText from './LandingHeroText';
import LandingSection from './LandingSection';

const FooterSection = () => {
  return (
    <LandingSection className="items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-80">
        <LandingHeroText />
        <RoundedButton
          buttonClassName="bg-blue-300 text-white w-300 h-80 text-2xl font-bold"
          label="알바메이트 시작하기"
          type="button"
        />
      </div>
    </LandingSection>
  );
};

export default FooterSection;
