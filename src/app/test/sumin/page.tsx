'use client';

import MainGnb from '@components/common/gnb/MainGnb';

import DatePicker from '@/shared/components/common/date-picker';
import InputDropdown from '@/shared/components/common/input-dropdown';
import TimePicker from '@/shared/components/common/time-picker';
import WeekPicker from '@/shared/components/common/week-picker';
import CopyAddress from '@/shared/components/ui/CopyAddress';
import KakaoMap from '@/shared/components/ui/KakaoMap';

const Sumin = () => {
  const inputOptions = [{ value: '전체' }, { value: '없음' }];

  return (
    <>
      <MainGnb /> {/* dark mode 테스트용 헤더 */}
      <div className="mx-auto max-w-640 px-24 py-200">
        <section className="mb-80 max-w-327 lg:max-w-none">
          <p className="mb-24 text-2xl font-bold">Dropdown - input</p>
          <InputDropdown options={inputOptions} />
        </section>

        <section className="mb-80">
          <p className="mb-24 text-2xl font-bold">DatePicker</p>
          <DatePicker />
        </section>

        <section className="mb-80">
          <p className="mb-24 text-2xl font-bold">TimePicker</p>
          <TimePicker />
        </section>

        <section className="mb-80">
          <p className="mb-24 text-2xl font-bold">WeekPicker</p>
          <WeekPicker />
        </section>

        <section className="mb-80">
          <p className="mb-24 text-2xl font-bold">Map</p>
          <CopyAddress location="서울특별시 중구 세종대로 110" />
          <KakaoMap location="서울특별시 중구 세종대로 110" />
        </section>
      </div>
    </>
  );
};

export default Sumin;
