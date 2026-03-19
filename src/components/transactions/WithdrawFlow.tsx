'use client';

import { useState, useMemo } from 'react';
import { useRedeem, useUserPosition } from '@yo-protocol/react';
import { VAULTS as YO_VAULTS } from '@yo-protocol/core';
import { useAccount } from 'wagmi';
import { parseUnits, formatUnits } from 'viem';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import TransactionSteps from './TransactionSteps';
import { VaultId } from '@/types';
import { VAULTS } from '@/lib/constants';
import { CheckCircle2, Clock } from 'lucide-react';

const REDEEM_STEPS = [
  { label: 'Authorize', description: 'Approve share transfer' },
  { label: 'Withdraw', description: 'Initiate withdrawal from savings account' },
  { label: 'Confirming', description: 'Waiting for network confirmation' },
];

interface WithdrawFlowProps {
  vaultId: VaultId;
  onSuccess?: () => void;
}

export default function WithdrawFlow({ vaultId, onSuccess }: WithdrawFlowProps) {
  const { address } = useAccount();
  const vaultConfig = YO_VAULTS[vaultId];
  const vaultInfo = VAULTS[vaultId];
  const assetDecimals = vaultConfig.underlying.decimals;

  const [amount, setAmount] = useState('');

  // Get user's position in asset terms (not shares)
  const { position } = useUserPosition(vaultId, address);
  const assetBalance = position?.assets ?? BigInt(0);
  const shareBalance = position?.shares ?? BigInt(0);
  const formattedAssetBalance = formatUnits(assetBalance, assetDecimals);

  // Parse user input as asset amount
  const parsedAssetAmount = useMemo(() => {
    try {
      return amount ? parseUnits(amount, assetDecimals) : undefined;
    } catch {
      return undefined;
    }
  }, [amount, assetDecimals]);

  // Convert asset amount to shares proportionally: shares = (assetAmount / totalAssets) * totalShares
  const sharesToRedeem = useMemo(() => {
    if (!parsedAssetAmount || assetBalance === BigInt(0) || shareBalance === BigInt(0)) return undefined;
    // Cap at max assets
    const cappedAmount = parsedAssetAmount > assetBalance ? assetBalance : parsedAssetAmount;
    // shares = cappedAmount * shareBalance / assetBalance
    return (cappedAmount * shareBalance) / assetBalance;
  }, [parsedAssetAmount, assetBalance, shareBalance]);

  const { redeem, step, isLoading, isSuccess, hash, instant, assetsOrRequestId, reset } = useRedeem({
    vault: vaultId,
    onConfirmed: () => onSuccess?.(),
  });

  const stepIndex = step === 'approving' ? 0 : step === 'redeeming' ? 1 : step === 'waiting' ? 2 : -1;

  const handleRedeem = async () => {
    if (!sharesToRedeem) return;
    try {
      await redeem(sharesToRedeem);
    } catch (err) {
      console.error('Redeem failed:', err);
    }
  };

  const handleMax = () => {
    if (assetBalance > BigInt(0)) {
      setAmount(formatUnits(assetBalance, assetDecimals));
    }
  };

  if (isSuccess) {
    return (
      <div className="border border-[#3ECF8E] bg-[#1A2F23] p-6 text-center">
        <CheckCircle2 className="mx-auto mb-3 h-12 w-12 text-[#3ECF8E]" />
        <h3 className="mb-2 font-mono text-sm font-bold uppercase text-[#3ECF8E]">
          {instant ? 'Withdrawal complete!' : 'Withdrawal queued!'}
        </h3>
        <p className="mb-4 text-sm text-[#A1A1A1]">
          {instant
            ? `Your ${vaultInfo.assetSymbol} has been returned to your wallet.`
            : 'Your withdrawal request has been queued and will be processed soon.'}
        </p>
        {!instant && assetsOrRequestId && (
          <div className="mb-3 flex items-center justify-center gap-2 font-mono text-xs text-[#FBBF24]">
            <Clock className="h-4 w-4" />
            Request ID: {assetsOrRequestId.toString()}
          </div>
        )}
        {hash && (
          <a
            href={`https://basescan.org/tx/${hash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-[#3ECF8E] underline"
          >
            View on Basescan
          </a>
        )}
        <Button
          onClick={() => { reset(); setAmount(''); }}
          variant="outline"
          className="mt-4 w-full border-[#2A2A2A] bg-transparent font-mono text-xs uppercase text-[#A1A1A1] hover:bg-[#1A1A1A]"
        >
          Done
        </Button>
      </div>
    );
  }

  return (
    <div className="border border-[#2A2A2A] bg-[#1A1A1A] p-5">
      <h3 className="mb-4 font-mono text-sm font-bold uppercase text-[#EDEDED]">Withdraw</h3>

      {isLoading ? (
        <TransactionSteps steps={REDEEM_STEPS} currentStepIndex={stepIndex} isComplete={false} />
      ) : (
        <div className="space-y-4">
          <div>
            <div className="mb-1 flex items-center justify-between">
              <span className="font-mono text-[10px] text-[#666666]">AMOUNT TO WITHDRAW</span>
              <button onClick={handleMax} className="font-mono text-[10px] text-[#444444] hover:text-[#A1A1A1]">
                BAL: {Number(formattedAssetBalance).toLocaleString(undefined, { maximumFractionDigits: 6 })} {vaultInfo.assetSymbol}
              </button>
            </div>
            <div className="relative">
              <Input
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="h-12 border-[#2A2A2A] bg-[#090909] pr-20 font-mono text-lg text-[#EDEDED] placeholder:text-[#444444]"
                min="0"
                step="any"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 font-mono text-xs font-bold text-[#666666]">
                {vaultInfo.assetSymbol}
              </span>
            </div>
          </div>

          <Button
            onClick={handleRedeem}
            disabled={!sharesToRedeem || !address}
            variant="outline"
            className="w-full border-[#2A2A2A] bg-transparent font-mono text-sm uppercase text-[#EDEDED] hover:bg-[#222222]"
            size="lg"
          >
            {!address ? 'CONNECT WALLET' : !parsedAssetAmount ? 'ENTER AMOUNT' : `WITHDRAW ${amount} ${vaultInfo.assetSymbol}`}
          </Button>
        </div>
      )}
    </div>
  );
}
