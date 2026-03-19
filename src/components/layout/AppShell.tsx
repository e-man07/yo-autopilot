'use client';

import NavBar from './NavBar';
import MobileNav from './MobileNav';
import { ReactNode } from 'react';

export default function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#090909]">
      <NavBar />
      <main className="mx-auto max-w-5xl px-4 pb-24 pt-6 md:pb-8">
        {children}
      </main>
      <MobileNav />
    </div>
  );
}
