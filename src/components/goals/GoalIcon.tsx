'use client';

import {
  Palmtree, Home, Car, GraduationCap, Gem, ShieldCheck,
  Plane, Smartphone, HeartPulse, Baby, Dog, Star,
} from 'lucide-react';

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  palmtree: Palmtree,
  home: Home,
  car: Car,
  'graduation-cap': GraduationCap,
  gem: Gem,
  'shield-check': ShieldCheck,
  plane: Plane,
  smartphone: Smartphone,
  'heart-pulse': HeartPulse,
  baby: Baby,
  dog: Dog,
  star: Star,
};

interface GoalIconProps {
  name: string;
  className?: string;
}

export default function GoalIcon({ name, className = 'h-5 w-5 text-[#3ECF8E]' }: GoalIconProps) {
  const Icon = ICON_MAP[name] ?? Star;
  return <Icon className={className} />;
}
