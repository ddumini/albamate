'use client';

import { useState } from 'react';

interface TabItem {
  id: string;
  label: string;
}

interface TabProps {
  tabs: TabItem[];
  handleClick: (value: string) => void;
}

const Tab = ({ tabs, handleClick }: TabProps) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="flex w-fit max-w-327 gap-8 rounded-md bg-background-200 p-6 text-md md:max-w-422 md:text-lg dark:bg-blue-300/30">
      {tabs.map((item, idx) => (
        <button
          key={item.id}
          className={`cursor-pointer rounded-md px-23 py-4 font-medium md:px-35 md:py-8 ${activeTab === idx ? 'bg-white font-semibold text-black-400 dark:bg-blue-300/70 dark:text-gray-100' : 'text-gray-400'}`}
          type="button"
          onClick={() => {
            setActiveTab(idx);
            handleClick(item.id);
          }}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
};

export default Tab;
