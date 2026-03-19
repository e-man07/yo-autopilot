'use client';

import { useVaults, useVaultAllocations, usePrices } from '@yo-protocol/react';
import { VAULT_LIST } from '@/lib/constants';
import type { VaultId } from '@/types';
import type { VaultStatsItem, DailyAllocationSnapshot } from '@yo-protocol/core';

export function useVaultData() {
  const { vaults, isLoading: vaultsLoading } = useVaults();
  const { prices, isLoading: pricesLoading } = usePrices();

  const yoUSDAlloc = useVaultAllocations('yoUSD');
  const yoETHAlloc = useVaultAllocations('yoETH');
  const yoBTCAlloc = useVaultAllocations('yoBTC');

  const allocations: Record<VaultId, { allocations: DailyAllocationSnapshot[]; isLoading: boolean }> = {
    yoUSD: yoUSDAlloc,
    yoETH: yoETHAlloc,
    yoBTC: yoBTCAlloc,
  };

  const findVault = (vaultId: VaultId): VaultStatsItem | undefined => {
    if (!vaults) return undefined;
    return vaults.find(
      (v) => v.id === vaultId || v.name?.includes(vaultId) || v.shareAsset?.symbol === vaultId
    );
  };

  const getVaultApy = (vaultId: VaultId): number => {
    const v = findVault(vaultId);
    if (!v) return 0;
    // yield is { '1d', '7d', '30d' } as string | null
    const raw = v.yield?.['7d'] ?? v.yield?.['30d'] ?? v.yield?.['1d'] ?? '0';
    return parseFloat(raw);
  };

  const getVaultTvl = (vaultId: VaultId): number => {
    const v = findVault(vaultId);
    if (!v) return 0;
    // Use formatted value (already in USD) rather than raw (which may be in token base units)
    const formatted = v.tvl?.formatted;
    if (formatted) return parseFloat(formatted.replace(/[^0-9.]/g, ''));
    return Number(v.tvl?.raw ?? 0);
  };

  const totalTvl = VAULT_LIST.reduce((sum, v) => sum + getVaultTvl(v), 0);

  const getProtocols = (vaultId: VaultId): string[] => {
    const alloc = allocations[vaultId]?.allocations;
    if (!alloc || alloc.length === 0) return [];
    const latest = alloc[alloc.length - 1];
    if (latest?.protocols) {
      return Object.keys(latest.protocols);
    }
    return [];
  };

  return {
    vaults,
    prices: prices as Record<string, number> | undefined,
    allocations,
    isLoading: vaultsLoading || pricesLoading,
    getVaultApy,
    getVaultTvl,
    getProtocols,
    totalTvl,
    findVault,
  };
}
