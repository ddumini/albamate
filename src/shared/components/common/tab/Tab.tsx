import { useState } from 'react';

const Tab = () => {
  const tabs = ['내가 쓴 글', '내가 쓴 댓글', '스크랩'];
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="flex w-327 gap-8 rounded-md bg-gray-25 p-6 text-[14px] md:w-422 md:text-[16px]">
      {tabs.map((label, idx) => (
        <button
          key={label}
          className={`rounded-md px-23 py-4 md:px-35 md:py-8 ${activeTab === idx ? 'bg-white text-black' : 'bg-white text-gray-400'}`}
          onClick={() => setActiveTab(idx)}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default Tab;
