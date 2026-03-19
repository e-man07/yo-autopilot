'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { cn } from '@/lib/utils';

const NAV_ITEMS = [
  { href: '/dashboard', label: 'DASHBOARD' },
  { href: '/goal/new', label: 'NEW GOAL' },
];

export default function NavBar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-[#2A2A2A] bg-[#111111]">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/icons/yo-logo.png" alt="YO" width={28} height={28} />
            <span className="font-display text-xl font-bold text-[#3ECF8E]">YO</span>
            <span className="font-mono text-sm text-[#A1A1A1]">AUTOPILOT</span>
          </Link>
          <nav className="hidden items-center gap-1 md:flex">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href || (item.href === '/dashboard' && pathname.startsWith('/goal/') && pathname !== '/goal/new');
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'relative px-3 py-2 font-mono text-xs transition-colors',
                    isActive
                      ? 'text-[#EDEDED]'
                      : 'text-[#666666] hover:text-[#A1A1A1]'
                  )}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#3ECF8E]" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
        <ConnectButton
          accountStatus="avatar"
          chainStatus="icon"
          showBalance={false}
        />
      </div>
    </header>
  );
}
