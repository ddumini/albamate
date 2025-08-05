import CopyAddress from '@/shared/components/ui/CopyAddress';
import KakaoMap from '@/shared/components/ui/KakaoMap';

interface LocationProps {
  location: string;
}

const AlbaLocation = ({ location }: LocationProps) => {
  return (
    <div>
      <section>
        <p className="py-16 text-2lg font-bold lg:text-[26px]">근무 지역</p>
        <CopyAddress location={location} />
        <KakaoMap location={location} />{' '}
      </section>
    </div>
  );
};

export default AlbaLocation;
