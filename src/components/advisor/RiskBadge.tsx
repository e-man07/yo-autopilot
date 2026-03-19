'use client';

import { Badge } from '@/components/ui/badge';

const RISK_STYLES: Record<string, { bg: string; text: string }> = {
  Low: { bg: 'bg-[#1A2F23]', text: 'text-[#3ECF8E]' },
  Medium: { bg: 'bg-[#2A2517]', text: 'text-[#FBBF24]' },
  High: { bg: 'bg-[#2A1717]', text: 'text-[#F87171]' },
};

export default function RiskBadge({ level }: { level: string }) {
  const style = RISK_STYLES[level] ?? RISK_STYLES['Medium'];
  return (
    <Badge variant="outline" className={`border-0 font-mono text-[10px] uppercase ${style.bg} ${style.text}`}>
      {level} Risk
    </Badge>
  );
}
