'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { useVaultData } from '@/hooks/useVaultData';
import { VAULT_LIST } from '@/lib/constants';
import { motion } from 'framer-motion';
import NumberTicker from '@/components/ui/number-ticker';

interface PortfolioSummaryProps {
  totalBalance: number;
  isLoading: boolean;
  isConnected: boolean;
}

export default function PortfolioSummary({ totalBalance, isLoading, isConnected }: PortfolioSummaryProps) {
  const { totalTvl, getVaultApy } = useVaultData();
  const avgYield = VAULT_LIST.reduce((sum, v) => sum + getVaultApy(v), 0) / VAULT_LIST.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="border border-[#2A2A2A] bg-[#1A1A1A]">
        {/* Green left accent */}
        <div className="flex">
          <div className="w-[3px] flex-shrink-0 bg-[#3ECF8E]" />
          <div className="flex-1 p-5">
            <div className="font-mono text-xs text-[#666666]">YOUR SAVINGS</div>
            {isLoading ? (
              <Skeleton className="mt-2 h-12 w-48" />
            ) : (
              <div className="mt-2 font-mono text-4xl font-bold tabular-nums text-[#EDEDED]">
                {isConnected ? (
                  <NumberTicker value={totalBalance} prefix="$" decimalPlaces={2} delay={200} />
                ) : (
                  '$0.00'
                )}
              </div>
            )}
            <div className="mt-1 font-mono text-[10px] text-[#444444]">ACROSS ALL GOALS</div>

            <div className="mt-4 flex items-center gap-6 border-t border-[#2A2A2A] pt-3">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] text-[#444444]">YIELD</span>
                <span className="font-mono text-sm font-bold text-[#3ECF8E]">
                  {avgYield > 0 ? `${avgYield.toFixed(1)}%` : '—'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] text-[#444444]">TVL</span>
                {totalTvl > 0 ? (
                  <span className="font-mono text-sm font-bold text-[#EDEDED]">
                    <NumberTicker value={totalTvl / 1e6} prefix="$" suffix="M" decimalPlaces={1} delay={400} />
                  </span>
                ) : (
                  <Skeleton className="h-4 w-16" />
                )}
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] text-[#444444]">VAULTS</span>
                <span className="font-mono text-sm font-bold text-[#EDEDED]">{VAULT_LIST.length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
