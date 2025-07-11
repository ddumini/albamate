'use client';

import ThemeToggle from '@/shared/components/ThemeToggle';

const TestPage = () => {
  return (
    <div className="bg-mint-100 text-md dark:bg-mint-400">
      <div className="bg-gray-200">Hello Mint</div>

      <p className="">layer</p>
      <div className="BG-mint">Mint</div>
      <ThemeToggle />
    </div>
  );
};

export default TestPage;
