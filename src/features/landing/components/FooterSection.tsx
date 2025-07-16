import RoundedButton from '@/shared/components/common/button/RoundedButton';

import LandingContainer from './LandingContainer';
import LandingSection from './LandingSection';

const FooterSection = () => {
  return (
    <LandingSection>
      <LandingContainer>
        <p>한 곳에서 관리하는</p>
        <p>알바 구인 플랫폼</p>
        <RoundedButton
          buttonClassName="bg-blue-500 text-white px-4 py-2"
          iconClassName="w-4 h-4 mr-2"
          iconSrc="/icons/bell.svg"
          label="구독하기"
          type="button"
        />
      </LandingContainer>
    </LandingSection>
  );
};

export default FooterSection;
