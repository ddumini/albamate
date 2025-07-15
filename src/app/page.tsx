import AlbaformSection from '@/features/landing/components/AlbaformSection';
import AnywhereSection from '@/features/landing/components/AnywhereSection';
import HeroSection from '@/features/landing/components/HeroSection';
import LandingBg from '@/features/landing/components/LandingBg';
import ManageSection from '@/features/landing/components/ManageSection';

const Home = () => {
  return (
    <main>
      <LandingBg />
      <HeroSection />
      <AnywhereSection />
      <AlbaformSection />
      <ManageSection />
    </main>
  );
};

export default Home;
