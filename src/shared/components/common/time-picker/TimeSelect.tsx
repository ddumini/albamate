'use client';
import { ChevronDown, Clock } from 'lucide-react';

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
    <div className="relative w-40">
      <label className="mb-2 block text-sm text-gray-300">{label}</label>
      <Dropdown
        trigger={
          <button
            className="flex w-full items-center justify-between rounded-lg bg-white px-4 py-3 text-black shadow"
            type="button"
          >
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-gray-500" />
              <span>{value}</span>
            </div>
            <ChevronDown className="h-4 w-4 text-gray-500" />
          </button>
        }
      >
        <ul className="max-h-48 overflow-y-auto py-1">
          {timeOptions.map(t => (
            <li
              key={t}
              className="cursor-pointer px-4 py-2 text-sm hover:bg-gray-100"
              onClick={() => onChange(t)}
            >
              {t}
            </li>
          ))}
        </ul>
      </Dropdown>
    </div>
  );
};

export default TimeSelect;
