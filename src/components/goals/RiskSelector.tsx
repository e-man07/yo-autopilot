'use client';

import { cn } from '@/lib/utils';
import { RiskLevel } from '@/types';
import { RISK_PROFILES } from '@/lib/risk-profiles';
import { motion } from 'framer-motion';
import { Check, Shield, Scale, Rocket } from 'lucide-react';

const RISK_ICON_MAP = {
  shield: Shield,
  scale: Scale,
  rocket: Rocket,
} as const;

interface RiskSelectorProps {
  selected: RiskLevel | null;
  onSelect: (level: RiskLevel) => void;
}

const levels: RiskLevel[] = ['conservative', 'balanced', 'growth'];

export default function RiskSelector({ selected, onSelect }: RiskSelectorProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {levels.map((level, i) => {
        const profile = RISK_PROFILES[level];
        const isSelected = selected === level;
        return (
          <motion.button
            key={level}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            onClick={() => onSelect(level)}
            className={cn(
              'relative border p-5 text-left transition-all',
              isSelected
                ? 'border-[#3ECF8E] bg-[#1A2F23]'
                : 'border-[#2A2A2A] bg-[#1A1A1A] hover:border-[#333333]'
            )}
          >
            {isSelected && (
              <div className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center bg-[#3ECF8E]">
                <Check className="h-3 w-3 text-[#090909]" />
              </div>
            )}
            {(() => { const Icon = RISK_ICON_MAP[profile.icon]; return <Icon className={cn('mb-3 h-6 w-6', isSelected ? 'text-[#3ECF8E]' : 'text-[#A1A1A1]')} />; })()}
            <h3 className={cn('mb-1 font-mono text-sm font-bold uppercase', isSelected ? 'text-[#3ECF8E]' : 'text-[#EDEDED]')}>
              {profile.label}
            </h3>
            <p className="mb-3 text-sm text-[#A1A1A1]">{profile.description}</p>
            <div className="mb-3 flex items-center gap-3 font-mono text-xs">
              <span className="font-bold text-[#EDEDED]">{profile.expectedApy}</span>
              <span className="text-[#444444]">|</span>
              <span className="text-[#666666]">{profile.volatility} vol</span>
            </div>
            <ul className="space-y-1.5">
              {profile.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-xs text-[#666666]">
                  <Check className="mt-0.5 h-3 w-3 flex-shrink-0 text-[#3ECF8E]" />
                  {f}
                </li>
              ))}
            </ul>
          </motion.button>
        );
      })}
    </div>
  );
}
