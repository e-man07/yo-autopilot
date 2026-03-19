'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Home, Target, PlusCircle } from 'lucide-react';

const MOBILE_ITEMS = [
  { href: '/dashboard', label: 'Home', icon: Home },
  { href: '/goal/new', label: 'New Goal', icon: PlusCircle },
  { href: '/dashboard', label: 'Goals', icon: Target },
];

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-[#2A2A2A] bg-[#111111] md:hidden">
      <div className="flex items-center justify-around py-2">
        {MOBILE_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                'flex flex-col items-center gap-1 px-3 py-1 font-mono text-[10px] transition-colors',
                isActive ? 'text-[#3ECF8E]' : 'text-[#666666]'
              )}
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
