'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import AppShell from '@/components/layout/AppShell';
import GoalProgress from '@/components/goals/GoalProgress';
import DepositFlow from '@/components/transactions/DepositFlow';
import WithdrawFlow from '@/components/transactions/WithdrawFlow';
import AIAdvisor from '@/components/advisor/AIAdvisor';
import VaultAllocationChart from '@/components/vault/VaultAllocationChart';
import VaultStatsBar from '@/components/vault/VaultStatsBar';
import { useGoals } from '@/hooks/useGoals';
import { usePortfolio } from '@/hooks/usePortfolio';
import { useVaultData } from '@/hooks/useVaultData';
import { VAULTS } from '@/lib/constants';
import { Goal, VaultId } from '@/types';
import { Button } from '@/components/ui/button';
import GoalIcon from '@/components/goals/GoalIcon';
import { ArrowLeft, Trash2, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function GoalDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { isConnected } = useAccount();
  const { goals, deleteGoal, mounted } = useGoals();
  const { getPositionUsd } = usePortfolio();
  const { getProtocols } = useVaultData();
  const [goal, setGoal] = useState<Goal | null>(null);
  const [activeTab, setActiveTab] = useState<'deposit' | 'withdraw'>('deposit');

  useEffect(() => {
    if (mounted && params.id) {
      const found = goals.find((g) => g.id === params.id);
      setGoal(found ?? null);
    }
  }, [mounted, goals, params.id]);

  if (!mounted) return <AppShell><div /></AppShell>;

  if (!goal) {
    return (
      <AppShell>
        <div className="py-20 text-center">
          <h2 className="font-display mb-2 text-xl font-bold uppercase text-[#EDEDED]">Goal not found</h2>
          <p className="mb-4 font-mono text-xs text-[#666666]">This goal may have been deleted.</p>
          <Link href="/dashboard">
            <Button variant="outline" className="border-[#2A2A2A] bg-transparent font-mono text-xs uppercase text-[#A1A1A1]">Back to Dashboard</Button>
          </Link>
        </div>
      </AppShell>
    );
  }

  const vault = VAULTS[goal.vault as VaultId];
  const currentAmount = getPositionUsd(goal.vault);
  const daysLeft = Math.max(
    0,
    Math.ceil((new Date(goal.targetDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
  );
  const progress = goal.targetAmount > 0 ? Math.min(currentAmount / goal.targetAmount, 1) : 0;

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this goal? Your savings will remain in the vault.')) {
      deleteGoal(goal.id);
      router.push('/dashboard');
    }
  };

  return (
    <AppShell>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
        {/* Back link */}
        <Link href="/dashboard" className="inline-flex items-center gap-1 font-mono text-xs text-[#666666] hover:text-[#3ECF8E]">
          <ArrowLeft className="h-4 w-4" /> DASHBOARD
        </Link>

        {/* Goal Header */}
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3">
              <GoalIcon name={goal.icon} className="h-8 w-8 text-[#3ECF8E]" />
              <h1 className="font-display text-3xl font-bold uppercase text-[#EDEDED]">{goal.name}</h1>
            </div>
            <div className="mt-1 font-mono text-xs">
              <span className="text-[#3ECF8E]">{vault.displayName}</span>
              <span className="text-[#444444]"> · </span>
              <span className="text-[#666666]">{daysLeft} DAYS LEFT</span>
            </div>
          </div>
          <GoalProgress current={currentAmount} target={goal.targetAmount} size={72} strokeWidth={5} />
        </div>

        {/* Progress bar */}
        <div className="h-2 w-full bg-[#2A2A2A]">
          <div
            className="h-full bg-[#3ECF8E] transition-all duration-1000"
            style={{ width: `${progress * 100}%` }}
          />
        </div>

        {/* Balance Stats */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { label: 'CURRENT', value: `$${currentAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` },
            { label: 'TARGET', value: `$${goal.targetAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` },
            { label: 'REMAINING', value: `$${Math.max(0, goal.targetAmount - currentAmount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` },
            { label: 'RISK', value: vault.riskLevel.toUpperCase() },
          ].map((stat) => (
            <div key={stat.label} className="border border-[#2A2A2A] bg-[#1A1A1A] p-3">
              <div className="font-mono text-[10px] text-[#444444]">{stat.label}</div>
              <div className="mt-1 font-mono text-sm font-bold text-[#EDEDED]">{stat.value}</div>
            </div>
          ))}
        </div>

        {/* Deposit / Withdraw Tabs */}
        {isConnected && (
          <div>
            <div className="mb-4 flex gap-4 border-b border-[#2A2A2A]">
              <button
                onClick={() => setActiveTab('deposit')}
                className={`relative pb-2 font-mono text-xs font-bold uppercase ${activeTab === 'deposit' ? 'text-[#3ECF8E]' : 'text-[#666666]'}`}
              >
                ADD SAVINGS
                {activeTab === 'deposit' && <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#3ECF8E]" />}
              </button>
              <button
                onClick={() => setActiveTab('withdraw')}
                className={`relative pb-2 font-mono text-xs font-bold uppercase ${activeTab === 'withdraw' ? 'text-[#3ECF8E]' : 'text-[#666666]'}`}
              >
                WITHDRAW
                {activeTab === 'withdraw' && <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#3ECF8E]" />}
              </button>
            </div>
            {activeTab === 'deposit' ? (
              <DepositFlow vaultId={goal.vault} />
            ) : (
              <WithdrawFlow vaultId={goal.vault} />
            )}
          </div>
        )}

        {/* Vault Info */}
        <VaultStatsBar vaultId={goal.vault} />
        <VaultAllocationChart vaultId={goal.vault} />

        {/* AI Recommendation */}
        {goal.aiRecommendation && (
          <div>
            <div className="mb-1 font-mono text-xs text-[#666666]">AI STRATEGY</div>
            <div className="mb-3 h-[2px] w-8 bg-[#3ECF8E]" />
            <AIAdvisor
              recommendation={goal.aiRecommendation}
              isLoading={false}
              error={null}
              protocols={getProtocols(goal.vault)}
            />
          </div>
        )}

        {/* Links and Actions */}
        <div className="flex items-center justify-between border-t border-[#2A2A2A] pt-4">
          <Link
            href={`/vault/${goal.vault}`}
            className="inline-flex items-center gap-1 font-mono text-xs text-[#3ECF8E] hover:text-[#4AE8A0]"
          >
            VIEW VAULT DETAILS <ExternalLink className="h-3 w-3" />
          </Link>
          <button onClick={handleDelete} className="inline-flex items-center gap-1 font-mono text-xs text-[#F87171] hover:text-[#FCA5A5]">
            <Trash2 className="h-3.5 w-3.5" /> DELETE GOAL
          </button>
        </div>

        <p className="text-center font-mono text-[10px] text-[#444444]">
          PAST YIELDS ≠ FUTURE RETURNS. SAVINGS INTERACT WITH AUDITED SMART CONTRACTS ON BASE.
        </p>
      </motion.div>
    </AppShell>
  );
}
