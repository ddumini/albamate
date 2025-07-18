import Image from 'next/image';

import Dropdown from '@/shared/components/ui/Dropdown';
import { cn } from '@/shared/lib/cn';

interface MyPageDropdownValueProps {
  value: string;
  clickEvent: () => void;
}

interface MyPageDropdownProps {
  items: MyPageDropdownValueProps[];
  className?: string;
}

const MyPageDropDown = ({ items, className }: MyPageDropdownProps) => {
  return (
    <div className={cn('relative flex items-center justify-center', className)}>
      <Dropdown
        className="relative flex w-80 justify-end lg:w-96"
        trigger={isOpen => (
          <button
            className="relative h-24 w-24"
            type="button"
            onClick={() => isOpen}
          >
            <Image
              fill
              alt="메뉴 열기"
              sizes="24px"
              src="/icons/kebab-menu.svg"
            />
          </button>
        )}
      >
        <ul className="relative z-10 flex h-68 w-full flex-col items-center justify-between rounded-lg border border-solid border-line-100 p-4 [box-shadow:4px_4px_4px_rgba(228,228,228,0.1)]">
          {items.map(item => {
            return (
              <li
                key={item.value}
                className="inline-flex w-full items-center justify-center"
              >
                <button
                  className="w-90 rounded-lg py-4 text-xs text-gray-400 hover:bg-mint-50 hover:font-semibold hover:text-black"
                  type="button"
                  onClick={() => item.clickEvent()}
                >
                  {item.value}
                </button>
              </li>
            );
          })}
        </ul>
      </Dropdown>
    </div>
  );
};

export default MyPageDropDown;
