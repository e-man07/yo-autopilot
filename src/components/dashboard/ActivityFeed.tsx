'use client';

import { useUserHistory } from '@yo-protocol/react';
import { useAccount } from 'wagmi';
import { Skeleton } from '@/components/ui/skeleton';
import { VaultId } from '@/types';
import { VAULTS } from '@/lib/constants';
import { ArrowDownLeft, ArrowUpRight, ExternalLink } from 'lucide-react';

export default function ActivityFeed() {
  const { address } = useAccount();
  const { history: usdHistory, isLoading: l1 } = useUserHistory('yoUSD', address, { limit: 5 });
  const { history: ethHistory, isLoading: l2 } = useUserHistory('yoETH', address, { limit: 5 });
  const { history: btcHistory, isLoading: l3 } = useUserHistory('yoBTC', address, { limit: 5 });

  const isLoading = l1 || l2 || l3;

  type HistoryItem = {
    type?: string;
    timestamp?: string | number;
    assets?: string | number;
    vault?: string;
    hash?: string;
  };

  const allHistory: HistoryItem[] = [
    ...(usdHistory ?? []).map((h: unknown) => ({ ...(h as HistoryItem), vault: 'yoUSD' })),
    ...(ethHistory ?? []).map((h: unknown) => ({ ...(h as HistoryItem), vault: 'yoETH' })),
    ...(btcHistory ?? []).map((h: unknown) => ({ ...(h as HistoryItem), vault: 'yoBTC' })),
  ]
    .sort((a, b) => {
      const ta = new Date(a.timestamp ?? 0).getTime();
      const tb = new Date(b.timestamp ?? 0).getTime();
      return tb - ta;
    })
    .slice(0, 10);

  if (isLoading) {
    return (
      <div className="border border-[#2A2A2A] bg-[#1A1A1A] p-5">
        <h3 className="mb-4 font-mono text-sm font-bold uppercase text-[#EDEDED]">Recent Activity</h3>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-12 w-full bg-[#222222]" />
          ))}
        </div>
      </div>
    );
  }

  if (allHistory.length === 0) {
    return (
      <div className="border border-[#2A2A2A] bg-[#1A1A1A] p-5">
        <h3 className="mb-3 font-mono text-sm font-bold uppercase text-[#EDEDED]">Recent Activity</h3>
        <p className="font-mono text-xs text-[#666666]">No transactions yet. Create a goal and start saving!</p>
      </div>
    );
  }

  return (
    <div className="border border-[#2A2A2A] bg-[#1A1A1A] p-5">
      <h3 className="mb-4 font-mono text-sm font-bold uppercase text-[#EDEDED]">Recent Activity</h3>
      <div className="space-y-3">
        {allHistory.map((item, i) => {
          const isDeposit = item.type === 'deposit';
          const vault = VAULTS[item.vault as VaultId];
          return (
            <div key={i} className="flex items-center justify-between border-b border-[#2A2A2A] pb-3 last:border-0 last:pb-0">
              <div className="flex items-center gap-3">
                <div className={`flex h-8 w-8 items-center justify-center ${isDeposit ? 'bg-[#1A2F23]' : 'bg-[#222222]'}`}>
                  {isDeposit ? (
                    <ArrowDownLeft className="h-4 w-4 text-[#3ECF8E]" />
                  ) : (
                    <ArrowUpRight className="h-4 w-4 text-[#A1A1A1]" />
                  )}
                </div>
                <div>
                  <div className="font-mono text-xs font-bold text-[#EDEDED]">
                    {isDeposit ? 'Saved' : 'Withdrew'} {vault?.assetSymbol}
                  </div>
                  <div className="font-mono text-[10px] text-[#666666]">
                    {vault?.displayName} · {item.timestamp ? new Date(item.timestamp).toLocaleDateString() : ''}
                  </div>
                </div>
              </div>
              {item.hash && (
                <a
                  href={`https://basescan.org/tx/${item.hash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 font-mono text-[10px] text-[#444444] hover:text-[#3ECF8E]"
                >
                  VIEW <ExternalLink className="h-3 w-3" />
                </a>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
