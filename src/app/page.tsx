import AnywhereSection from '@/features/landing/components/AnywhereSection';
import HeroSection from '@/features/landing/components/HeroSection';
import LandingBg from '@/features/landing/components/LandingBg';

const Home = () => {
  return (
    <main>
      <LandingBg />
      <HeroSection />
      <AnywhereSection />
    </main>
  );
};

export default Home;
