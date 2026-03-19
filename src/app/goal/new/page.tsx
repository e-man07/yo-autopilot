'use client';

import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import AppShell from '@/components/layout/AppShell';
import GoalWizard from '@/components/goals/GoalWizard';
import { Wallet } from 'lucide-react';

export default function NewGoalPage() {
  const { isConnected } = useAccount();

  return (
    <AppShell>
      {!isConnected ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center bg-[#1A1A1A]">
            <Wallet className="h-8 w-8 text-[#666666]" />
          </div>
          <h2 className="mb-2 font-display text-xl font-bold uppercase text-[#EDEDED]">Connect to create a goal</h2>
          <p className="mb-6 max-w-sm font-mono text-xs text-[#666666]">
            You&apos;ll need a wallet to save and earn yield.
          </p>
          <ConnectButton />
        </div>
      ) : (
        <div className="animate-fade-in">
          <div className="mb-8 text-center">
            <h1 className="font-display text-2xl font-bold uppercase text-[#EDEDED]">Create a Savings Goal</h1>
            <p className="mt-1 font-mono text-xs text-[#666666]">
              Tell us what you&apos;re saving for, and our AI will find the best strategy.
            </p>
          </div>
          <GoalWizard />
        </div>
      )}
    </AppShell>
  );
}
