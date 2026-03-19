'use client';

import { AdvisorResponse, VaultId } from '@/types';
import { VAULTS } from '@/lib/constants';
import RiskBadge from './RiskBadge';
import YieldExplainer from './YieldExplainer';
import { Skeleton } from '@/components/ui/skeleton';
import { motion } from 'framer-motion';
import { Sparkles, TrendingUp, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface AIAdvisorProps {
  recommendation: AdvisorResponse | null;
  isLoading: boolean;
  error: string | null;
  protocols?: string[];
}

export default function AIAdvisor({ recommendation, isLoading, error, protocols }: AIAdvisorProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2 font-mono text-xs text-[#666666]">
          <Sparkles className="h-4 w-4 animate-pulse text-[#3ECF8E]" />
          AI is analyzing the best strategy for your goal...
        </div>
        <Skeleton className="h-32 w-full bg-[#222222]" />
        <Skeleton className="h-24 w-full bg-[#222222]" />
        <Skeleton className="h-20 w-full bg-[#222222]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="border border-red-900 bg-red-950/50 p-4">
        <p className="font-mono text-xs text-red-400">{error}</p>
      </div>
    );
  }

  if (!recommendation) return null;

  const vault = VAULTS[recommendation.recommendation.vault as VaultId];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      {/* Recommendation */}
      <div className="border border-[#2A2A2A] bg-[#1A1A1A]">
        <div className="flex">
          <div className="w-[3px] flex-shrink-0 bg-[#3ECF8E]" />
          <div className="flex-1">
            <div className="bg-[#1A2F23] px-5 py-2.5">
              <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#3ECF8E]">
                <Sparkles className="h-3.5 w-3.5" />
                ✦ AI RECOMMENDATION
              </div>
            </div>
            <div className="p-5">
              <div className="mb-3 flex items-center gap-3">
                <div
                  className="flex h-10 w-10 items-center justify-center text-lg font-bold text-white"
                  style={{ backgroundColor: vault?.color ?? '#3ECF8E' }}
                >
                  {vault?.assetSymbol?.[0] ?? 'Y'}
                </div>
                <div>
                  <h3 className="font-mono text-sm font-bold text-[#EDEDED]">{vault?.displayName ?? recommendation.recommendation.vault}</h3>
                  <p className="font-mono text-[10px] text-[#666666]">{vault?.asset ?? ''} SAVINGS ACCOUNT</p>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-[#A1A1A1]">{recommendation.recommendation.reason}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Projected Earnings */}
      <div className="border border-[#2A2A2A] bg-[#1A1A1A] p-5">
        <div className="mb-3 flex items-center gap-2 font-mono text-xs font-bold text-[#EDEDED]">
          <TrendingUp className="h-4 w-4 text-[#3ECF8E]" />
          PROJECTED EARNINGS
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="font-mono text-2xl font-bold text-[#3ECF8E]">
              ${recommendation.projectedEarnings.monthly.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div className="font-mono text-[10px] text-[#666666]">PER MONTH</div>
          </div>
          <div>
            <div className="font-mono text-2xl font-bold text-[#EDEDED]">
              ${recommendation.projectedEarnings.byTarget.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div className="font-mono text-[10px] text-[#666666]">BY TARGET DATE</div>
          </div>
        </div>
        {recommendation.projectedEarnings.willMeetGoal ? (
          <div className="mt-3 flex items-center gap-2 bg-[#1A2F23] px-3 py-2 font-mono text-xs text-[#3ECF8E]">
            <CheckCircle2 className="h-4 w-4" />
            Yield earnings will meaningfully contribute to your goal
          </div>
        ) : (
          <div className="mt-3 bg-[#2A2517] px-3 py-2 font-mono text-xs text-[#FBBF24]">
            Yield alone won&apos;t fully fund your goal — regular deposits will get you there.
          </div>
        )}
      </div>

      {/* Yield Source */}
      <YieldExplainer
        explanation={recommendation.yieldExplanation}
        protocols={protocols}
      />

      {/* Risk Assessment */}
      <div className="border border-[#2A2A2A] bg-[#1A1A1A] p-5">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#EDEDED]">
            <AlertTriangle className="h-4 w-4 text-[#FBBF24]" />
            RISK ASSESSMENT
          </div>
          <RiskBadge level={recommendation.riskAssessment.level} />
        </div>
        <div className="space-y-3">
          <div>
            <h4 className="mb-1.5 font-mono text-[10px] text-[#444444]">RISK FACTORS</h4>
            <ul className="space-y-1">
              {recommendation.riskAssessment.factors.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-[#A1A1A1]">
                  <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 bg-[#FBBF24]" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-1.5 font-mono text-[10px] text-[#444444]">MITIGATIONS</h4>
            <ul className="space-y-1">
              {recommendation.riskAssessment.mitigations.map((m) => (
                <li key={m} className="flex items-start gap-2 text-sm text-[#A1A1A1]">
                  <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 bg-[#3ECF8E]" />
                  {m}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <p className="text-center font-mono text-[10px] text-[#444444]">
        PAST YIELDS ≠ FUTURE RETURNS. AI RECOMMENDATION IS FOR INFORMATIONAL PURPOSES ONLY.
      </p>
    </motion.div>
  );
}
