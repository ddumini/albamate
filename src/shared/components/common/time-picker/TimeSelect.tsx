'use client';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';

import Dropdown from '@/shared/components/ui/Dropdown';

const generateTimes = () => {
  const times = [];
  for (let h = 0; h < 24; h++) {
    for (let m = 0; m < 60; m += 30) {
      times.push(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`);
    }
  }
  return times;
};

const timeOptions = generateTimes();

interface TimeSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

const TimeSelect = ({ label, value, onChange }: TimeSelectProps) => {
  return (
    <Dropdown
      isRight
      trigger={isOpen => (
        <button
          aria-label={label}
          className={twMerge(
            'flex h-54 w-150 items-center gap-8 rounded-lg border-1 border-transparent bg-background-200 px-14 text-lg text-black transition-colors lg:h-64 lg:w-210 lg:gap-16 lg:text-xl',
            isOpen ? 'border-gray-200' : ''
          )}
        >
          <Image alt="clock" height={24} src="/icons/clock.svg" width={24} />
          <div className="flex w-full items-center justify-between gap-2">
            <span>{value}</span>
            <Image
              alt="arrow-down"
              className="lg:h-36 lg:w-36"
              height={24}
              src="/icons/drop-menu-down.svg"
              width={24}
            />
          </div>
        </button>
      )}
    >
      <ul className="max-h-102 w-80 overflow-y-auto lg:max-h-156 lg:w-126">
        {timeOptions.map(t => (
          <li
            key={t}
            className="flex h-34 w-full items-center px-10 text-xs text-black-100 not-only:cursor-pointer hover:bg-gray-100 lg:h-52 lg:text-2lg"
            onClick={() => onChange(t)}
          >
            {t}
          </li>
        ))}
      </ul>
    </Dropdown>
  );
};

export default TimeSelect;
