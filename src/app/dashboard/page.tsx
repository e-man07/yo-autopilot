'use client';

import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import AppShell from '@/components/layout/AppShell';
import PortfolioSummary from '@/components/dashboard/PortfolioSummary';
import ActivityFeed from '@/components/dashboard/ActivityFeed';
import GoalCard from '@/components/goals/GoalCard';
import { useGoals } from '@/hooks/useGoals';
import { usePortfolio } from '@/hooks/usePortfolio';
import { PlusCircle, Target } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ShimmerButton from '@/components/ui/shimmer-button';

export default function DashboardPage() {
  const { isConnected } = useAccount();
  const { goals, mounted } = useGoals();
  const { totalBalanceUsd, getPositionUsd, isLoading } = usePortfolio();

  if (!isConnected) {
    return (
      <AppShell>
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center bg-[#1A1A1A]">
            <Target className="h-8 w-8 text-[#666666]" />
          </div>
          <h2 className="font-display mb-2 text-xl font-bold uppercase text-[#EDEDED]">Connect your wallet</h2>
          <p className="mb-6 max-w-sm font-mono text-xs text-[#666666]">
            Connect your wallet to view your savings goals and portfolio.
          </p>
          <ConnectButton />
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="font-display text-3xl font-bold uppercase text-[#EDEDED]">Dashboard</h1>
          <Link href="/goal/new">
            <ShimmerButton className="gap-2 px-5 py-2.5 text-xs">
              <PlusCircle className="h-4 w-4" /> NEW GOAL
            </ShimmerButton>
          </Link>
        </div>

        {/* Portfolio Summary */}
        <PortfolioSummary
          totalBalance={totalBalanceUsd}
          isLoading={isLoading}
          isConnected={isConnected}
        />

        {/* Goals */}
        {mounted && goals.length > 0 ? (
          <div>
            <div className="mb-1 font-mono text-xs text-[#666666]">YOUR GOALS</div>
            <div className="mb-4 h-[2px] w-8 bg-[#3ECF8E]" />
            <div className="grid gap-4 sm:grid-cols-2">
              {goals.map((goal, i) => (
                <motion.div
                  key={goal.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <GoalCard
                    goal={goal}
                    currentAmount={getPositionUsd(goal.vault)}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        ) : mounted ? (
          <div className="border-2 border-dashed border-[#2A2A2A] p-10 text-center">
            <Target className="mx-auto mb-3 h-8 w-8 text-[#666666]" />
            <h3 className="font-display mb-1 text-lg font-bold uppercase text-[#EDEDED]">No goals yet</h3>
            <p className="mb-4 font-mono text-xs text-[#666666]">
              Create your first savings goal and let AI find the best strategy.
            </p>
            <Link href="/goal/new">
              <ShimmerButton className="gap-2 px-6 py-3 text-xs">
                <PlusCircle className="h-4 w-4" /> CREATE YOUR FIRST GOAL
              </ShimmerButton>
            </Link>
          </div>
        ) : null}

        {/* Activity */}
        <ActivityFeed />
      </div>
    </AppShell>
  );
}
