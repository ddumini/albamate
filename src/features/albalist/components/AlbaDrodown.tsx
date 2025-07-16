'use client';

import { cn } from '@/shared/lib/cn';

import { AlbaItem } from '../mock/mockData';

interface Props {
  item: AlbaItem;
}

const AlbaDropdown = ({ item }: Props) => {
  const options = [
    { label: '지원하기', onClick: () => alert(`지원 - ${item.title}`) },
    { label: '스크랩', onClick: () => alert(`스크랩 - ${item.title}`) },
  ];

  return (
    <div className="absolute top-full right-0 z-10 mt-4 w-120 rounded-md border border-gray-200 bg-white py-8 shadow-md">
      {options.map(({ label, onClick }) => (
        <button
          key={label}
          className={cn(
            'relative z-10 inline-block w-full py-8 text-center text-sm transition-all duration-150',
            'hover:scale-[0.98] hover:rounded-md hover:bg-mint-50 hover:font-medium'
          )}
          type="button"
          onClick={e => {
            e.stopPropagation();
            onClick();
          }}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default AlbaDropdown;
