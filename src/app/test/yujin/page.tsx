'use client';

import MainGnb from '@components/common/gnb/MainGnb';

import AuthGnb from '@/shared/components/common/gnb/AuthGnb';
import Tab from '@/shared/components/common/tab/Tab';

const TestPage = () => {
  return (
    <div className="m-16 flex flex-col gap-24 text-md">
      <ul>
        <li className="mb-36">
          로그인 전 헤더
          <AuthGnb />
        </li>
        <li>
          메인 헤더
          <MainGnb />
        </li>
      </ul>

      <p className="bg-blue-500">layer</p>
      <div className="bg-gray-200">Hello Mint</div>
      <div className="BG-lightmint">Mint</div>

      <Tab />
    </div>
  );
};

export default TestPage;
