'use client';

import { useRouter } from 'next/navigation';

interface NavMenuProps {
  pathname: string;
}

const NAV_ITEMS = [
  { href: '/albalist', label: '알바 목록' },
  { href: '/albatalk', label: '알바토크' },
  { href: '/myalbaform', label: '내 알바폼' },
];

const NavMenu = ({ pathname }: NavMenuProps) => {
  const router = useRouter();

  return (
    <nav className="Text-black flex gap-16 font-medium md:gap-24">
      {NAV_ITEMS.map(({ href, label }) => (
        <button
          key={href}
          className={`text-sm transition-colors md:gap-24 md:text-base lg:text-xl ${
            pathname === href && 'text-mint-100'
          }`}
          type="button"
          onClick={() => router.push(href)}
        >
          {label}
        </button>
      ))}
    </nav>
  );
};

export default NavMenu;
