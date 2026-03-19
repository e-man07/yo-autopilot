'use client';

import { cn } from '@/lib/utils';

interface AnimatedGradientTextProps {
  children: React.ReactNode;
  className?: string;
}

export default function AnimatedGradientText({ children, className }: AnimatedGradientTextProps) {
  return (
    <div
      className={cn(
        'group relative inline-flex items-center rounded-full bg-white/80 px-4 py-1.5 text-sm font-medium shadow-sm backdrop-blur-sm transition-shadow hover:shadow-md',
        'border border-violet-200/50',
        className,
      )}
    >
      <span
        className="animate-shiny-text inline-flex bg-gradient-to-r from-violet-600 via-cyan-400 to-violet-600 bg-[length:var(--shiny-width)_100%] bg-clip-text text-transparent [--shiny-width:200px]"
      >
        {children}
      </span>
    </div>
  );
}
