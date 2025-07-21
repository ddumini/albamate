'use client';

import { usePathname, useRouter } from 'next/navigation';

import { cn } from '@/shared/lib/cn';

interface NavItem {
  href: string;
  label: string;
}

interface NavMenuProps {
  items?: NavItem[];
  isLandingStyle?: boolean;
}

const DEFAULT_NAV_ITEMS: NavItem[] = [
  { href: '/albalist', label: '알바 목록' },
  { href: '/albatalk', label: '알바토크' },
];

const NavMenu = ({ items = DEFAULT_NAV_ITEMS }: NavMenuProps) => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <nav className="flex gap-16 font-medium md:gap-24">
      {items.map(({ href, label }) => (
        <button
          key={href}
          className={cn(
            'text-xs whitespace-nowrap transition-colors xs:text-sm md:gap-24 md:text-base lg:text-xl',
            pathname === href && 'text-mint-100'
          )}
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
