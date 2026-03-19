'use client';

import { VaultId } from '@/types';
import { VAULTS } from '@/lib/constants';
import { useVaultData } from '@/hooks/useVaultData';
import { Skeleton } from '@/components/ui/skeleton';
import NumberTicker from '@/components/ui/number-ticker';

interface VaultStatsBarProps {
  vaultId: VaultId;
}

export default function VaultStatsBar({ vaultId }: VaultStatsBarProps) {
  const vault = VAULTS[vaultId];
  const { getVaultApy, getVaultTvl, isLoading } = useVaultData();

  const apy = getVaultApy(vaultId);
  const tvl = getVaultTvl(vaultId);

  return (
    <div className="border border-[#2A2A2A] bg-[#1A1A1A]">
      <div className="flex">
        <div className="w-[3px] flex-shrink-0 bg-[#3ECF8E]" />
        <div className="flex-1 p-5">
          <div className="mb-4 flex items-center gap-3">
            <div
              className="flex h-10 w-10 items-center justify-center text-lg font-bold text-white"
              style={{ backgroundColor: vault.color }}
            >
              {vault.assetSymbol[0]}
            </div>
            <div>
              <h2 className="font-mono text-sm font-bold uppercase text-[#EDEDED]">{vault.displayName}</h2>
              <p className="font-mono text-[10px] text-[#666666]">{vault.description}</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <div className="font-mono text-[10px] text-[#444444]">YIELD</div>
              {isLoading ? (
                <Skeleton className="mt-1 h-6 w-16 bg-[#222222]" />
              ) : (
                <div className="font-mono text-lg font-bold text-[#3ECF8E]">
                  <NumberTicker value={apy} suffix="%" decimalPlaces={2} delay={200} />
                </div>
              )}
            </div>
            <div>
              <div className="font-mono text-[10px] text-[#444444]">TVL</div>
              {isLoading ? (
                <Skeleton className="mt-1 h-6 w-20 bg-[#222222]" />
              ) : (
                <div className="font-mono text-lg font-bold text-[#EDEDED]">
                  <NumberTicker value={tvl / 1e6} prefix="$" suffix="M" decimalPlaces={1} delay={300} />
                </div>
              )}
            </div>
            <div>
              <div className="font-mono text-[10px] text-[#444444]">ASSET</div>
              <div className="font-mono text-lg font-bold text-[#EDEDED]">{vault.assetSymbol}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
