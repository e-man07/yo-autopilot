'use client';

import { useState, useMemo } from 'react';
import { useDeposit, useTokenBalance, usePreviewDeposit } from '@yo-protocol/react';
import { VAULTS as YO_VAULTS } from '@yo-protocol/core';
import { useAccount } from 'wagmi';
import { parseUnits, formatUnits, type Address } from 'viem';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import TransactionSteps from './TransactionSteps';
import { VaultId } from '@/types';
import { VAULTS, CHAIN_ID } from '@/lib/constants';
import { CheckCircle2 } from 'lucide-react';

const DEPOSIT_STEPS = [
  { label: 'Authorize', description: 'Allow the savings account to receive your tokens' },
  { label: 'Save', description: 'Deposit your tokens into the savings account' },
  { label: 'Confirming', description: 'Waiting for network confirmation' },
];

interface DepositFlowProps {
  vaultId: VaultId;
  onSuccess?: () => void;
}

export default function DepositFlow({ vaultId, onSuccess }: DepositFlowProps) {
  const { address } = useAccount();
  const vaultConfig = YO_VAULTS[vaultId];
  const vaultInfo = VAULTS[vaultId];
  const decimals = vaultConfig.underlying.decimals;
  const tokenAddress = vaultConfig.underlying.address[CHAIN_ID] as Address;

  const [amount, setAmount] = useState('');
  const parsedAmount = useMemo(() => {
    try {
      return amount ? parseUnits(amount, decimals) : undefined;
    } catch {
      return undefined;
    }
  }, [amount, decimals]);

  const { balance } = useTokenBalance(tokenAddress, address);
  const { shares: previewShares } = usePreviewDeposit(vaultId, parsedAmount, { enabled: !!parsedAmount });

  const { deposit, step, isLoading, isSuccess, hash, reset } = useDeposit({
    vault: vaultId,
    slippageBps: 50,
    onConfirmed: () => onSuccess?.(),
  });

  const balanceRaw = balance ? (balance as { balance: bigint }).balance : BigInt(0);
  const formattedBalance = formatUnits(balanceRaw, decimals);

  const stepIndex = step === 'approving' ? 0 : step === 'depositing' ? 1 : step === 'waiting' ? 2 : -1;

  const handleDeposit = async () => {
    if (!parsedAmount) return;
    try {
      await deposit({ token: tokenAddress, amount: parsedAmount, chainId: CHAIN_ID });
    } catch (err) {
      console.error('Deposit failed:', err);
    }
  };

  const handleMax = () => {
    setAmount(formatUnits(balanceRaw, decimals));
  };

  if (isSuccess) {
    return (
      <div className="border border-[#3ECF8E] bg-[#1A2F23] p-6 text-center">
        <CheckCircle2 className="mx-auto mb-3 h-12 w-12 text-[#3ECF8E]" />
        <h3 className="mb-2 font-mono text-sm font-bold uppercase text-[#3ECF8E]">Savings deposited!</h3>
        <p className="mb-4 text-sm text-[#A1A1A1]">
          Your {vaultInfo.assetSymbol} is now earning yield in your {vaultInfo.displayName} account.
        </p>
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
          Deposit More
        </Button>
      </div>
    );
  }

  return (
    <div className="border border-[#2A2A2A] bg-[#1A1A1A] p-5">
      <h3 className="mb-4 font-mono text-sm font-bold uppercase text-[#EDEDED]">Add Savings</h3>

      {isLoading ? (
        <TransactionSteps steps={DEPOSIT_STEPS} currentStepIndex={stepIndex} isComplete={false} />
      ) : (
        <div className="space-y-4">
          <div>
            <div className="mb-1 flex items-center justify-between">
              <span className="font-mono text-[10px] text-[#666666]">AMOUNT</span>
              <button onClick={handleMax} className="font-mono text-[10px] text-[#444444] hover:text-[#A1A1A1]">
                BAL: {Number(formattedBalance).toLocaleString(undefined, { maximumFractionDigits: 6 })} {vaultInfo.assetSymbol}
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

          {previewShares && parsedAmount && (
            <div className="bg-[#090909] p-3 font-mono text-[10px] text-[#444444]">
              YOU&apos;LL RECEIVE SHARES REPRESENTING YOUR POSITION. YOUR SAVINGS GROW AUTOMATICALLY.
            </div>
          )}

          <Button
            onClick={handleDeposit}
            disabled={!parsedAmount || !address}
            className="w-full bg-[#3ECF8E] font-mono text-sm font-bold uppercase text-[#090909] hover:bg-[#4AE8A0]"
            size="lg"
          >
            {!address ? 'CONNECT WALLET' : !parsedAmount ? 'ENTER AMOUNT' : `SAVE ${amount} ${vaultInfo.assetSymbol}`}
          </Button>
        </div>
      )}
    </div>
  );
}
