'use client';

import Link from 'next/link';
import { Goal, VaultId } from '@/types';
import { VAULTS } from '@/lib/constants';
import { ArrowRight } from 'lucide-react';
import GoalIcon from './GoalIcon';

interface GoalCardProps {
  goal: Goal;
  currentAmount: number;
}

export default function GoalCard({ goal, currentAmount }: GoalCardProps) {
  const vault = VAULTS[goal.vault as VaultId];
  const daysLeft = Math.max(
    0,
    Math.ceil((new Date(goal.targetDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
  );
  const progress = goal.targetAmount > 0 ? Math.min(currentAmount / goal.targetAmount, 1) : 0;

  return (
    <Link href={`/goal/${goal.id}`}>
      <div className="group cursor-pointer border border-[#2A2A2A] bg-[#1A1A1A] p-5 transition-colors hover:border-[#333333]">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <GoalIcon name={goal.icon} className="h-5 w-5 text-[#3ECF8E]" />
              <h3 className="font-mono text-sm font-bold uppercase text-[#EDEDED]">{goal.name}</h3>
            </div>
            <div className="mt-1 flex items-center gap-2 font-mono text-xs">
              <span className="text-[#3ECF8E]">{vault?.displayName}</span>
              <span className="text-[#444444]">·</span>
              <span className="text-[#666666]">{daysLeft}d left</span>
            </div>
          </div>
          <span className="font-mono text-sm font-bold text-[#3ECF8E]">{Math.round(progress * 100)}%</span>
        </div>

        {/* Progress bar */}
        <div className="mt-4 h-1 w-full bg-[#2A2A2A]">
          <div
            className="h-full bg-[#3ECF8E] transition-all duration-1000"
            style={{ width: `${progress * 100}%` }}
          />
        </div>

        <div className="mt-4 flex items-end justify-between">
          <div>
            <div className="font-mono text-xl font-bold tabular-nums text-[#EDEDED]">
              ${currentAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div className="font-mono text-[10px] text-[#666666]">
              of ${goal.targetAmount.toLocaleString()} goal
            </div>
          </div>
          <div className="flex items-center gap-1 font-mono text-xs text-[#444444] transition-colors group-hover:text-[#3ECF8E]">
            DETAILS <ArrowRight className="h-3 w-3" />
          </div>
        </div>
      </div>
    </Link>
  );
}
