'use client';

import { cn } from '@/lib/utils';
import { type ButtonHTMLAttributes } from 'react';

interface ShinyButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export default function ShinyButton({ children, className, ...props }: ShinyButtonProps) {
  return (
    <button
      className={cn(
        'group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl border border-violet-200 bg-white px-6 py-3 text-sm font-semibold text-violet-700 transition-all hover:border-violet-300 hover:shadow-lg hover:shadow-violet-100 disabled:pointer-events-none disabled:opacity-50',
        className,
      )}
      {...props}
    >
      <span className="absolute inset-0 bg-gradient-to-r from-violet-50 to-cyan-50 opacity-0 transition-opacity group-hover:opacity-100" />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </button>
  );
}
