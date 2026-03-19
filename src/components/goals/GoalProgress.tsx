'use client';

import AnimatedCircularProgressBar from '@/components/ui/animated-circular-progress-bar';

interface GoalProgressProps {
  current: number;
  target: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
}

export default function GoalProgress({
  current,
  target,
  size = 80,
  strokeWidth = 6,
  className,
}: GoalProgressProps) {
  const percent = target > 0 ? Math.round(Math.min(current / target, 1) * 100) : 0;

  return (
    <AnimatedCircularProgressBar
      value={percent}
      max={100}
      size={size}
      strokeWidth={strokeWidth}
      className={className}
    />
  );
}
