'use client';

import { useState, useMemo } from 'react';
import { useRedeem, useShareBalance, usePreviewRedeem } from '@yo-protocol/react';
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
  const decimals = 18; // YO vault shares are always 18 decimals

  const [amount, setAmount] = useState('');
  const parsedShares = useMemo(() => {
    try {
      return amount ? parseUnits(amount, decimals) : undefined;
    } catch {
      return undefined;
    }
  }, [amount, decimals]);

  const { shares: shareBalance } = useShareBalance(vaultId, address);
  const { assets: previewAssets } = usePreviewRedeem(vaultId, parsedShares, { enabled: !!parsedShares });

  const { redeem, step, isLoading, isSuccess, hash, instant, assetsOrRequestId, reset } = useRedeem({
    vault: vaultId,
    onConfirmed: () => onSuccess?.(),
  });

  const formattedShares = shareBalance ? formatUnits(shareBalance, decimals) : '0';
  const formattedPreview = previewAssets
    ? formatUnits(previewAssets, vaultConfig.underlying.decimals)
    : null;

  const stepIndex = step === 'approving' ? 0 : step === 'redeeming' ? 1 : step === 'waiting' ? 2 : -1;

  const handleRedeem = async () => {
    if (!parsedShares) return;
    try {
      await redeem(parsedShares);
    } catch (err) {
      console.error('Redeem failed:', err);
    }
  };

  const handleMax = () => {
    if (shareBalance) {
      setAmount(formatUnits(shareBalance, decimals));
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
              <span className="font-mono text-[10px] text-[#666666]">SHARES TO WITHDRAW</span>
              <button onClick={handleMax} className="font-mono text-[10px] text-[#444444] hover:text-[#A1A1A1]">
                BAL: {Number(formattedShares).toLocaleString(undefined, { maximumFractionDigits: 6 })}
              </button>
            </div>
            <Input
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="h-12 border-[#2A2A2A] bg-[#090909] font-mono text-lg text-[#EDEDED] placeholder:text-[#444444]"
              min="0"
              step="any"
            />
          </div>

          {formattedPreview && (
            <div className="bg-[#090909] p-3 font-mono text-xs text-[#A1A1A1]">
              You&apos;ll receive approximately{' '}
              <span className="font-bold text-[#EDEDED]">
                {Number(formattedPreview).toLocaleString(undefined, { maximumFractionDigits: 6 })} {vaultInfo.assetSymbol}
              </span>
            </div>
          )}

          <Button
            onClick={handleRedeem}
            disabled={!parsedShares || !address}
            variant="outline"
            className="w-full border-[#2A2A2A] bg-transparent font-mono text-sm uppercase text-[#EDEDED] hover:bg-[#222222]"
            size="lg"
          >
            {!address ? 'CONNECT WALLET' : !parsedShares ? 'ENTER AMOUNT' : 'WITHDRAW'}
          </Button>
        </div>
      )}
    </div>
  );
}
