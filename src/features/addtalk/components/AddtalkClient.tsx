'use client';

import AddtalkButtons from './AddtalkButtons';
import AddtalkForm from './AddtalkForm';

const AddtalkClient = () => {
  return (
    <div className="flex flex-col gap-16 px-24 py-16 md:px-72 md:py-24 lg:gap-24 lg:px-220 lg:py-40">
      <header className="flex items-center justify-between border-b border-line-200 py-16 md:px-24 lg:py-34">
        <h1 className="text-2lg font-semibold text-black-400 md:text-xl lg:text-3xl">
          글쓰기
        </h1>
        {/* 데스크탑용 버튼 */}
        <AddtalkButtons className="hidden md:flex" />
      </header>
      <AddtalkForm />
      {/* 모바일용 버튼 */}
      <AddtalkButtons className="md:hidden" />
    </div>
  );
};
export default AddtalkClient;
