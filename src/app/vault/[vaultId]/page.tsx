'use client';

import { useParams } from 'next/navigation';
import AppShell from '@/components/layout/AppShell';
import VaultStatsBar from '@/components/vault/VaultStatsBar';
import VaultAllocationChart from '@/components/vault/VaultAllocationChart';
import YieldChart from '@/components/vault/YieldChart';
import { VAULTS } from '@/lib/constants';
import { VaultId } from '@/types';
import { useVaultPerformance, usePerformanceBenchmark } from '@yo-protocol/react';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function VaultDetailPage() {
  const params = useParams();
  const vaultId = params.vaultId as VaultId;
  const vault = VAULTS[vaultId];

  const { performance, isLoading: perfLoading } = useVaultPerformance(vaultId);
  const { benchmark, isLoading: benchLoading } = usePerformanceBenchmark(vaultId);

  if (!vault) {
    return (
      <AppShell>
        <div className="py-20 text-center">
          <h2 className="font-display text-xl font-bold uppercase text-[#EDEDED]">Vault not found</h2>
          <Link href="/dashboard" className="mt-4 font-mono text-xs text-[#3ECF8E] underline">Back to Dashboard</Link>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
        <Link href="/dashboard" className="inline-flex items-center gap-1 font-mono text-xs text-[#666666] hover:text-[#3ECF8E]">
          <ArrowLeft className="h-4 w-4" /> DASHBOARD
        </Link>

        <VaultStatsBar vaultId={vaultId} />
        <YieldChart vaultId={vaultId} />
        <VaultAllocationChart vaultId={vaultId} />

        {/* Performance */}
        <div className="border border-[#2A2A2A] bg-[#1A1A1A] p-5">
          <h3 className="mb-4 font-mono text-sm font-bold uppercase text-[#EDEDED]">Performance</h3>
          {perfLoading ? (
            <div className="space-y-2">
              <Skeleton className="h-6 w-40 bg-[#222222]" />
              <Skeleton className="h-6 w-32 bg-[#222222]" />
            </div>
          ) : performance ? (
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(performance as unknown as Record<string, unknown>)
                .filter(([key]) => typeof key === 'string' && !key.startsWith('_'))
                .slice(0, 6)
                .map(([key, val]) => (
                  <div key={key}>
                    <div className="font-mono text-[10px] text-[#444444]">{key.replace(/([A-Z])/g, ' $1').trim().toUpperCase()}</div>
                    <div className="font-mono text-sm font-bold text-[#EDEDED]">
                      {typeof val === 'number' ? val.toFixed(4) : String(val ?? '-')}
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <p className="font-mono text-xs text-[#666666]">Performance data not yet available.</p>
          )}
        </div>

        {/* Benchmark */}
        <div className="border border-[#2A2A2A] bg-[#1A1A1A] p-5">
          <h3 className="mb-4 font-mono text-sm font-bold uppercase text-[#EDEDED]">Benchmark Comparison</h3>
          {benchLoading ? (
            <Skeleton className="h-20 w-full bg-[#222222]" />
          ) : benchmark ? (
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(benchmark as unknown as Record<string, unknown>)
                .filter(([key, val]) => typeof key === 'string' && !key.startsWith('_') && (typeof val === 'string' || typeof val === 'number'))
                .slice(0, 6)
                .map(([key, val]) => (
                  <div key={key}>
                    <div className="font-mono text-[10px] text-[#444444]">{key.replace(/([A-Z])/g, ' $1').trim().toUpperCase()}</div>
                    <div className="font-mono text-sm font-bold text-[#EDEDED]">
                      {typeof val === 'number' ? val.toFixed(4) : String(val ?? '-')}
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <p className="font-mono text-xs text-[#666666]">Benchmark data not yet available.</p>
          )}
        </div>

        {/* Basescan link */}
        <div className="text-center">
          <a
            href={`https://basescan.org/address/${(vault as unknown as Record<string, unknown>).address ?? ''}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-[#3ECF8E] hover:text-[#4AE8A0]"
          >
            VIEW ON BASESCAN →
          </a>
        </div>

        <p className="text-center font-mono text-[10px] text-[#444444]">
          PAST YIELDS ≠ FUTURE RETURNS. ALL DATA SOURCED FROM ON-CHAIN CONTRACTS.
        </p>
      </motion.div>
    </AppShell>
  );
}
