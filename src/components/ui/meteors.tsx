'use client';

import { cn } from '@/lib/utils';

interface MeteorsProps {
  number?: number;
  className?: string;
}

export default function Meteors({ number = 20, className }: MeteorsProps) {
  const meteors = Array.from({ length: number }, (_, i) => i);

  return (
    <>
      {meteors.map((i) => (
        <span
          key={i}
          className={cn(
            'pointer-events-none absolute left-1/2 top-1/2 h-0.5 w-0.5 rotate-[215deg] animate-meteor rounded-[9999px] bg-violet-400 shadow-[0_0_0_1px_#c4b5fd]',
            'before:absolute before:top-1/2 before:h-[1px] before:w-[50px] before:-translate-y-[50%] before:transform before:bg-gradient-to-r before:from-violet-400 before:to-transparent before:content-[""]',
            className,
          )}
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${Math.floor(Math.random() * 8 + 4)}s`,
          }}
        />
      ))}
    </>
  );
}
