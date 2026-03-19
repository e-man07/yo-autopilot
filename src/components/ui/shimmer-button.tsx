'use client';

import { cn } from '@/lib/utils';
import { type ButtonHTMLAttributes } from 'react';

interface ShimmerButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export default function ShimmerButton({
  className,
  children,
  ...props
}: ShimmerButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center whitespace-nowrap rounded-sm bg-[#3ECF8E] px-6 py-3 font-mono text-sm font-bold uppercase text-[#090909] transition-colors hover:bg-[#4AE8A0] disabled:pointer-events-none disabled:opacity-50',
        className,
      )}
      {...props}
    >
      <span className="flex items-center gap-2">{children}</span>
    </button>
  );
}
