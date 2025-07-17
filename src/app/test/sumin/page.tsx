'use client';

import MainGnb from '@components/common/gnb/MainGnb';

import DatePicker from '@/shared/components/common/date-picker';
import InputDropdown from '@/shared/components/common/input-dropdown';
import TimePicker from '@/shared/components/common/time-picker';
import WeekPicker from '@/shared/components/common/week-picker';
import InnerContainer from '@/shared/components/container/InnerContainer';
import CopyAddress from '@/shared/components/ui/CopyAddress';
import KakaoMap from '@/shared/components/ui/KakaoMap';
import LoadingSpinner from '@/shared/components/ui/LoadingSpinner';

const Sumin = () => {
  const inputOptions = [{ value: '전체' }, { value: '없음' }];

  return (
    <>
      <MainGnb /> {/* dark mode 테스트용 헤더 */}
      <InnerContainer className="mb-80 bg-amber-50" size="sm">
        <div>
          <p className="mb-24 text-xl">
            <strong className="text-2xl">InnerContainer</strong> sm - 640px
          </p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          quos.
          <br />
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          quos.
          <br />
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          quos.
          <br />
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          quos. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Nesciunt voluptatum aut qui corrupti eaque asperiores, eum harum ab,
          blanditiis obcaecati aliquid vero deleniti velit molestiae magnam
          accusamus quisquam vel inventore. Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Eum delectus doloribus numquam magnam
          ipsam cupiditate sequi commodi fuga eaque, non beatae architecto,
          mollitia vero aut, harum vel voluptatibus impedit quis.
          <br />
        </div>
      </InnerContainer>
      <InnerContainer className="mb-80 bg-blue-50" size="md">
        <div>
          <p className="mb-24 text-xl">
            <strong className="text-2xl">InnerContainer</strong> md - 1480px
          </p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          quos.
          <br />
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          quos.
          <br />
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          quos.
          <br />
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          quos. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Nesciunt voluptatum aut qui corrupti eaque asperiores, eum harum ab,
          blanditiis obcaecati aliquid vero deleniti velit molestiae magnam
          accusamus quisquam vel inventore. Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Eum delectus doloribus numquam magnam
          ipsam cupiditate sequi commodi fuga eaque, non beatae architecto,
          mollitia vero aut, harum vel voluptatibus impedit quis.
          <br />
        </div>
      </InnerContainer>
      <InnerContainer isFlex className="mb-80 gap-150 bg-pink-50" size="lg">
        <div>
          <p className="mb-24 text-xl">
            <strong className="text-2xl">InnerContainer</strong> lg - 1560px
            (상세쪽 레이아웃)
          </p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          quos.
          <br />
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          quos.
          <br />
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          quos.
          <br />
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          quos. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Nesciunt voluptatum aut qui corrupti eaque asperiores, eum harum ab,
          blanditiis obcaecati aliquid vero deleniti velit molestiae magnam
          accusamus quisquam vel inventore. Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Eum delectus doloribus numquam magnam
          ipsam cupiditate sequi commodi fuga eaque, non beatae architecto,
          mollitia vero aut, harum vel voluptatibus impedit quis.
          <br />
        </div>
        <div className="w-auto flex-none bg-gray-50 p-24 lg:w-452">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          quos.
          <br />
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          quos.
          <br />
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          quos.
          <br />
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          quos. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Nesciunt voluptatum aut qui corrupti eaque asperiores, eum harum ab,
          blanditiis obcaecati aliquid vero deleniti velit molestiae magnam
          accusamus quisquam vel inventore. Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Eum delectus doloribus numquam magnam
          ipsam cupiditate sequi commodi fuga eaque, non beatae architecto,
          mollitia vero aut, harum vel voluptatibus impedit quis.
          <br />
        </div>
      </InnerContainer>
      <InnerContainer isFlex className="gap-40 bg-green-50" size="xl">
        <div className="w-auto flex-none bg-gray-50 p-24 lg:w-452">
          <p className="mb-24 text-xl">
            <strong className="text-2xl">InnerContainer</strong> <br />
            xl - 1624px (알바폼 만들기쪽 레이아웃)
          </p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          quos.
          <br />
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          quos.
          <br />
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          quos.
          <br />
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          quos. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Nesciunt voluptatum aut qui corrupti eaque asperiores, eum harum ab,
          blanditiis obcaecati aliquid vero deleniti velit molestiae magnam
          accusamus quisquam vel inventore. Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Eum delectus doloribus numquam magnam
          ipsam cupiditate sequi commodi fuga eaque, non beatae architecto,
          mollitia vero aut, harum vel voluptatibus impedit quis.
          <br />
        </div>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          quos.
          <br />
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          quos.
          <br />
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          quos.
          <br />
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          quos. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Nesciunt voluptatum aut qui corrupti eaque asperiores, eum harum ab,
          blanditiis obcaecati aliquid vero deleniti velit molestiae magnam
          accusamus quisquam vel inventore. Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Eum delectus doloribus numquam magnam
          ipsam cupiditate sequi commodi fuga eaque, non beatae architecto,
          mollitia vero aut, harum vel voluptatibus impedit quis.
          <br />
        </div>
      </InnerContainer>
      <div className="mx-auto max-w-640 px-24 py-200">
        <LoadingSpinner size="sm" />
        <LoadingSpinner size="lg" />
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
