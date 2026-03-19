'use client';

import { useUserPosition, usePrices, useUserPerformance } from '@yo-protocol/react';
import { useAccount } from 'wagmi';
import { VAULT_LIST } from '@/lib/constants';
import type { VaultId } from '@/types';

export function usePortfolio() {
  const { address } = useAccount();

  const yoUSDPosition = useUserPosition('yoUSD', address);
  const yoETHPosition = useUserPosition('yoETH', address);
  const yoBTCPosition = useUserPosition('yoBTC', address);

  const yoUSDPerf = useUserPerformance('yoUSD', address);
  const yoETHPerf = useUserPerformance('yoETH', address);
  const yoBTCPerf = useUserPerformance('yoBTC', address);

  const { prices } = usePrices();

  const positions: Record<VaultId, ReturnType<typeof useUserPosition>> = {
    yoUSD: yoUSDPosition,
    yoETH: yoETHPosition,
    yoBTC: yoBTCPosition,
  };

  const performances: Record<VaultId, ReturnType<typeof useUserPerformance>> = {
    yoUSD: yoUSDPerf,
    yoETH: yoETHPerf,
    yoBTC: yoBTCPerf,
  };

  const getPositionUsd = (vaultId: VaultId): number => {
    const pos = positions[vaultId]?.position;
    if (!pos) return 0;
    const assets = Number(pos.assets);
    const priceMap = prices as Record<string, number> | undefined;
    if (vaultId === 'yoUSD') return assets / 1e6;
    if (vaultId === 'yoETH') return (assets / 1e18) * (priceMap?.['ETH'] ?? 0);
    if (vaultId === 'yoBTC') return (assets / 1e8) * (priceMap?.['BTC'] ?? 0);
    return 0;
  };

  const totalBalanceUsd = VAULT_LIST.reduce((sum, v) => sum + getPositionUsd(v), 0);

  const isLoading = VAULT_LIST.some((v) => positions[v].isLoading);

  return {
    positions,
    performances,
    prices: prices as Record<string, number> | undefined,
    getPositionUsd,
    totalBalanceUsd,
    isLoading,
    isConnected: !!address,
  };
}
