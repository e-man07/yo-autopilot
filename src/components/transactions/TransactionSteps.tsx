'use client';

import { cn } from '@/lib/utils';
import { Check, Loader2 } from 'lucide-react';

interface Step {
  label: string;
  description: string;
}

interface TransactionStepsProps {
  steps: Step[];
  currentStepIndex: number;
  isComplete: boolean;
}

export default function TransactionSteps({ steps, currentStepIndex, isComplete }: TransactionStepsProps) {
  return (
    <div className="space-y-3">
      {steps.map((step, i) => {
        const isDone = isComplete || i < currentStepIndex;
        const isCurrent = !isComplete && i === currentStepIndex;
        return (
          <div key={step.label} className="flex items-center gap-3">
            <div
              className={cn(
                'flex h-7 w-7 flex-shrink-0 items-center justify-center font-mono text-xs transition-all',
                isDone && 'bg-[#3ECF8E] text-[#090909]',
                isCurrent && 'bg-[#EDEDED] text-[#090909]',
                !isDone && !isCurrent && 'bg-[#222222] text-[#666666]'
              )}
            >
              {isDone ? (
                <Check className="h-3.5 w-3.5" />
              ) : isCurrent ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                i + 1
              )}
            </div>
            <div>
              <div className={cn('font-mono text-xs font-bold uppercase', isCurrent ? 'text-[#EDEDED]' : isDone ? 'text-[#3ECF8E]' : 'text-[#666666]')}>
                {step.label}
              </div>
              <div className="font-mono text-[10px] text-[#444444]">{step.description}</div>
            </div>
            {/* Vertical connector */}
          </div>
        );
      })}
    </div>
  );
}
