import { RiskLevel } from '@/types';

export interface RiskProfile {
  level: RiskLevel;
  label: string;
  description: string;
  color: string;
  bgColor: string;
  borderColor: string;
  expectedApy: string;
  volatility: string;
  icon: 'shield' | 'scale' | 'rocket';
  features: string[];
}

export const RISK_PROFILES: Record<RiskLevel, RiskProfile> = {
  conservative: {
    level: 'conservative',
    label: 'Conservative',
    description: 'Stable returns with minimal price fluctuation. Best for short-term goals.',
    color: 'text-emerald-700',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
    expectedApy: '~8-15%',
    volatility: 'Very Low',
    icon: 'shield',
    features: [
      'USD-denominated — no price risk',
      'Steady, predictable earnings',
      'Best for goals under 1 year',
    ],
  },
  balanced: {
    level: 'balanced',
    label: 'Balanced',
    description: 'Moderate yield with ETH price exposure. Good for medium-term goals.',
    color: 'text-blue-700',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    expectedApy: '~6-12%',
    volatility: 'Moderate',
    icon: 'scale',
    features: [
      'ETH-denominated — grows with Ethereum',
      'Yield + potential price appreciation',
      'Best for 1-3 year goals',
    ],
  },
  growth: {
    level: 'growth',
    label: 'Growth',
    description: 'Higher potential returns with BTC price exposure. Ideal for long-term goals.',
    color: 'text-orange-700',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200',
    expectedApy: '~6-12%',
    volatility: 'Higher',
    icon: 'rocket',
    features: [
      'BTC-denominated — grows with Bitcoin',
      'Yield + significant price potential',
      'Best for 3+ year goals',
    ],
  },
};
