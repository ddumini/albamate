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

const NavMenu = ({
  items = DEFAULT_NAV_ITEMS,
  isLandingStyle = false,
}: NavMenuProps) => {
  const router = useRouter();
  const pathname = usePathname(); // ✅ 클라이언트에서 가져오기
  const isLanding = pathname === '/';

  const navTextColor =
    isLandingStyle && isLanding ? 'text-white' : 'Text-black';

  return (
    <nav className={cn('flex gap-16 font-medium md:gap-24', navTextColor)}>
      {items.map(({ href, label }) => (
        <button
          key={href}
          className={cn(
            'text-sm transition-colors md:gap-24 md:text-base lg:text-xl',
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
