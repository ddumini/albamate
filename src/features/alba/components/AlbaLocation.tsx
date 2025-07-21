import CopyAddress from '@/shared/components/ui/CopyAddress';
import KakaoMap from '@/shared/components/ui/KakaoMap';

const AlbaLocation = () => {
  return (
    <div>
      <section className="mb-80">
        <p className="py-16 text-2lg font-bold lg:text-[26px]">근무 지역</p>
        <CopyAddress location="서울특별시 중구 세종대로 110" />
        <KakaoMap location="서울특별시 중구 세종대로 110" />{' '}
      </section>
    </div>
  );
};

export default AlbaLocation;
