export type RiskLevel = 'conservative' | 'balanced' | 'growth';
export type VaultId = 'yoUSD' | 'yoETH' | 'yoBTC';

export interface Goal {
  id: string;
  name: string;
  icon: string;
  targetAmount: number;
  targetDate: string;
  riskLevel: RiskLevel;
  vault: VaultId;
  createdAt: string;
  aiRecommendation?: AdvisorResponse;
}

export interface AdvisorResponse {
  recommendation: {
    vault: VaultId;
    reason: string;
  };
  yieldExplanation: string;
  projectedEarnings: {
    monthly: number;
    byTarget: number;
    willMeetGoal: boolean;
  };
  riskAssessment: {
    level: string;
    factors: string[];
    mitigations: string[];
  };
}

export interface VaultInfo {
  id: VaultId;
  name: string;
  displayName: string;
  description: string;
  asset: string;
  assetSymbol: string;
  riskLevel: RiskLevel;
  color: string;
  icon: string;
}

export interface AdvisorRequest {
  goal: {
    name: string;
    targetAmount: number;
    targetDate: string;
    riskLevel: RiskLevel;
  };
  vaultData: {
    yoUSD: { apy: number; tvl: number; protocols: string[] };
    yoETH: { apy: number; tvl: number; protocols: string[] };
    yoBTC: { apy: number; tvl: number; protocols: string[] };
  };
  prices: {
    ETH: number;
    BTC: number;
  };
}
