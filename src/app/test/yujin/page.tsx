'use client';

import AuthGnb from '@/shared/components/common/gnb/AuthGnb';
import MainGnb from '@/shared/components/common/gnb/MainGnb';
import ThemeToggle from '@/shared/components/ThemeToggle';

const TestPage = () => {
  return (
    <div className="text-md m-16">
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

      <p className="">layer</p>
      <div className="bg-gray-200">Hello Mint</div>
      <div className="bg-mint-100 dark:bg-mint-400">Mint</div>
      <ThemeToggle />
    </div>
  );
};

export default TestPage;
