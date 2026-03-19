'use client';

import { cn } from '@/lib/utils';

interface AnimatedCircularProgressBarProps {
  max?: number;
  value: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
  showPercent?: boolean;
}

export default function AnimatedCircularProgressBar({
  max = 100,
  value,
  size = 80,
  strokeWidth = 6,
  className,
  showPercent = true,
}: AnimatedCircularProgressBarProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = max > 0 ? Math.min(value / max, 1) : 0;
  const offset = circumference - progress * circumference;
  const percent = Math.round(progress * 100);

  return (
    <div className={cn('relative inline-flex items-center justify-center', className)}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#2A2A2A"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#3ECF8E"
          strokeWidth={strokeWidth}
          strokeLinecap="square"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      {showPercent && (
        <span className="absolute font-mono text-xs font-bold text-[#EDEDED]">{percent}%</span>
      )}
    </div>
  );
}
