'use client';

import LandingButton from './LandingButton';
import LandingHeroText from './LandingHeroText';
import LandingSection from './LandingSection';

const FooterSection = () => {
  return (
    <LandingSection className="items-center justify-center">
      <div
        aria-label="서비스 시작 섹션"
        className="flex flex-col items-center justify-center gap-56 lg:gap-80"
        role="contentinfo"
      >
        <LandingHeroText />
        <LandingButton content="알바메이트 시작하기" />
      </div>
    </LandingSection>
  );
};

export default FooterSection;
