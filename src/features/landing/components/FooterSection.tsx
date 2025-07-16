'use client';

import LandingButton from './LandingButton';
import LandingHeroText from './LandingHeroText';
import LandingSection from './LandingSection';

const FooterSection = () => {
  return (
    <LandingSection className="items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-80">
        <LandingHeroText />
        <LandingButton content="알바메이트 시작하기" />
      </div>
    </LandingSection>
  );
};

export default FooterSection;
