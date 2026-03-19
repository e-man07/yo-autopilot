import { VaultId, VaultInfo } from '@/types';

export const VAULTS: Record<VaultId, VaultInfo> = {
  yoUSD: {
    id: 'yoUSD',
    name: 'yoUSD',
    displayName: 'Stable Savings',
    description: 'Earn yield on USD stablecoins with minimal price risk',
    asset: 'USDC',
    assetSymbol: 'USDC',
    riskLevel: 'conservative',
    color: '#2775CA',
    icon: '/icons/usdc.svg',
  },
  yoETH: {
    id: 'yoETH',
    name: 'yoETH',
    displayName: 'ETH Growth',
    description: 'Earn yield on Ethereum with moderate price exposure',
    asset: 'WETH',
    assetSymbol: 'ETH',
    riskLevel: 'balanced',
    color: '#627EEA',
    icon: '/icons/eth.svg',
  },
  yoBTC: {
    id: 'yoBTC',
    name: 'yoBTC',
    displayName: 'BTC Growth',
    description: 'Earn yield on Bitcoin with higher price exposure',
    asset: 'cbBTC',
    assetSymbol: 'BTC',
    riskLevel: 'growth',
    color: '#F7931A',
    icon: '/icons/btc.svg',
  },
};

export const RISK_TO_VAULT: Record<string, VaultId> = {
  conservative: 'yoUSD',
  balanced: 'yoETH',
  growth: 'yoBTC',
};

export const VAULT_LIST: VaultId[] = ['yoUSD', 'yoETH', 'yoBTC'];

export const CHAIN_ID = 8453; // Base

export const GOAL_CATEGORIES = [
  { id: 'palmtree', label: 'Vacation', icon: 'palmtree' },
  { id: 'home', label: 'Home', icon: 'home' },
  { id: 'car', label: 'Car', icon: 'car' },
  { id: 'graduation-cap', label: 'Education', icon: 'graduation-cap' },
  { id: 'gem', label: 'Wedding', icon: 'gem' },
  { id: 'shield-check', label: 'Emergency', icon: 'shield-check' },
  { id: 'plane', label: 'Travel', icon: 'plane' },
  { id: 'smartphone', label: 'Tech', icon: 'smartphone' },
  { id: 'baby', label: 'Baby', icon: 'baby' },
  { id: 'dog', label: 'Pet', icon: 'dog' },
  { id: 'heart-pulse', label: 'Health', icon: 'heart-pulse' },
  { id: 'star', label: 'Other', icon: 'star' },
] as const;
