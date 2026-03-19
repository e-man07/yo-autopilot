'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import RiskSelector from './RiskSelector';
import AIAdvisor from '@/components/advisor/AIAdvisor';
import ShimmerButton from '@/components/ui/shimmer-button';
import { useGoals } from '@/hooks/useGoals';
import { useAIAdvisor } from '@/hooks/useAIAdvisor';
import { useVaultData } from '@/hooks/useVaultData';
import { GOAL_CATEGORIES } from '@/lib/constants';
import GoalIcon from './GoalIcon';
import { RiskLevel, VaultId } from '@/types';
import { ArrowLeft, ArrowRight, Check, Sparkles } from 'lucide-react';

const STEPS = ['Goal Details', 'Risk Level', 'AI Recommendation'];

export default function GoalWizard() {
  const router = useRouter();
  const { addGoal } = useGoals();
  const { recommendation, isLoading: aiLoading, error: aiError, getRecommendation } = useAIAdvisor();
  const { getVaultApy, getVaultTvl, getProtocols, prices } = useVaultData();

  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [icon, setIcon] = useState('palmtree');
  const [targetAmount, setTargetAmount] = useState('');
  const [targetDate, setTargetDate] = useState('');
  const [riskLevel, setRiskLevel] = useState<RiskLevel | null>(null);

  const canProceedStep0 = name.trim() && targetAmount && Number(targetAmount) > 0 && targetDate;
  const canProceedStep1 = riskLevel !== null;

  const handleGoToStep2 = async () => {
    if (!riskLevel) return;
    setStep(2);

    const buildVaultEntry = (v: VaultId) => ({
      apy: getVaultApy(v),
      tvl: getVaultTvl(v),
      protocols: getProtocols(v),
    });

    await getRecommendation({
      goal: {
        name,
        targetAmount: Number(targetAmount),
        targetDate,
        riskLevel,
      },
      vaultData: {
        yoUSD: buildVaultEntry('yoUSD'),
        yoETH: buildVaultEntry('yoETH'),
        yoBTC: buildVaultEntry('yoBTC'),
      },
      prices: {
        ETH: prices?.['ETH'] ?? 0,
        BTC: prices?.['BTC'] ?? 0,
      },
    });
  };

  const handleConfirm = () => {
    if (!recommendation) return;
    const vault = recommendation.recommendation.vault as VaultId;
    const newGoal = addGoal({
      name,
      icon,
      targetAmount: Number(targetAmount),
      targetDate,
      riskLevel: riskLevel!,
      vault,
      aiRecommendation: recommendation,
    });
    router.push(`/goal/${newGoal.id}`);
  };

  return (
    <div className="mx-auto max-w-2xl">
      {/* Step Indicator — brutalist underline style */}
      <div className="mb-8 flex items-center justify-center gap-2">
        {STEPS.map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <div
              className={`flex h-7 w-7 items-center justify-center font-mono text-xs ${
                i <= step
                  ? 'bg-[#EDEDED] text-[#090909]'
                  : 'bg-[#222222] text-[#666666]'
              }`}
            >
              {i < step ? <Check className="h-3.5 w-3.5" /> : i + 1}
            </div>
            <span className={`hidden font-mono text-xs sm:inline ${i <= step ? 'text-[#EDEDED]' : 'text-[#666666]'}`}>
              {s}
            </span>
            {i < STEPS.length - 1 && (
              <div className={`mx-2 h-px w-8 ${i < step ? 'bg-[#EDEDED]' : 'bg-[#2A2A2A]'}`} />
            )}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* Step 1: Goal Details */}
        {step === 0 && (
          <motion.div
            key="step0"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="border border-[#2A2A2A] bg-[#1A1A1A] p-6">
              <h2 className="font-display mb-6 text-xl font-bold uppercase text-[#EDEDED]">What are you saving for?</h2>

              <div className="space-y-5">
                {/* Category Picker */}
                <div>
                  <Label className="mb-2 font-mono text-xs text-[#666666]">SAVING FOR</Label>
                  <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                    {GOAL_CATEGORIES.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setIcon(cat.id)}
                        className={`flex flex-col items-center gap-1.5 px-2 py-3 transition-all ${
                          icon === cat.id
                            ? 'bg-[#1A2F23] ring-1 ring-[#3ECF8E]'
                            : 'bg-[#111111] hover:bg-[#1A1A1A]'
                        }`}
                      >
                        <GoalIcon name={cat.icon} className={`h-5 w-5 ${icon === cat.id ? 'text-[#3ECF8E]' : 'text-[#666666]'}`} />
                        <span className={`font-mono text-[10px] uppercase ${icon === cat.id ? 'text-[#3ECF8E]' : 'text-[#666666]'}`}>
                          {cat.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name */}
                <div>
                  <Label htmlFor="name" className="mb-2 font-mono text-xs text-[#666666]">GOAL NAME</Label>
                  <Input
                    id="name"
                    placeholder="e.g., Vacation Fund, Emergency Savings"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="h-12 border-[#2A2A2A] bg-[#090909] font-mono text-[#EDEDED] placeholder:text-[#444444]"
                  />
                </div>

                {/* Amount */}
                <div>
                  <Label htmlFor="amount" className="mb-2 font-mono text-xs text-[#666666]">TARGET AMOUNT (USD)</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 font-mono text-lg text-[#666666]">$</span>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="5,000"
                      value={targetAmount}
                      onChange={(e) => setTargetAmount(e.target.value)}
                      className="h-12 border-[#2A2A2A] bg-[#090909] pl-8 font-mono text-lg text-[#EDEDED] placeholder:text-[#444444]"
                      min="1"
                    />
                  </div>
                </div>

                {/* Date */}
                <div>
                  <Label htmlFor="date" className="mb-2 font-mono text-xs text-[#666666]">TARGET DATE</Label>
                  <Input
                    id="date"
                    type="date"
                    value={targetDate}
                    onChange={(e) => setTargetDate(e.target.value)}
                    className="h-12 border-[#2A2A2A] bg-[#090909] font-mono text-[#EDEDED]"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
              </div>

              <Button
                onClick={() => setStep(1)}
                disabled={!canProceedStep0}
                className="mt-6 w-full gap-2 bg-[#EDEDED] font-mono text-sm uppercase text-[#090909] hover:bg-[#FFFFFF]"
                size="lg"
              >
                Choose Risk Level <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        )}

        {/* Step 2: Risk Level */}
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="font-display mb-2 text-xl font-bold uppercase text-[#EDEDED]">How much risk?</h2>
            <p className="mb-6 font-mono text-xs text-[#666666]">
              This determines which savings strategy our AI will optimize for.
            </p>

            <RiskSelector selected={riskLevel} onSelect={setRiskLevel} />

            <div className="mt-6 flex gap-3">
              <Button variant="outline" onClick={() => setStep(0)} className="gap-2 border-[#2A2A2A] bg-transparent font-mono text-xs uppercase text-[#A1A1A1] hover:bg-[#1A1A1A]">
                <ArrowLeft className="h-4 w-4" /> Back
              </Button>
              <div className="flex-1">
                <ShimmerButton
                  onClick={handleGoToStep2}
                  disabled={!canProceedStep1}
                  className="w-full gap-2 py-3 text-xs"
                >
                  <Sparkles className="h-4 w-4" /> GET AI RECOMMENDATION
                </ShimmerButton>
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 3: AI Recommendation */}
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="font-display mb-6 text-xl font-bold uppercase text-[#EDEDED]">Your personalized strategy</h2>

            <AIAdvisor
              recommendation={recommendation}
              isLoading={aiLoading}
              error={aiError}
              protocols={recommendation ? getProtocols(recommendation.recommendation.vault as VaultId) : []}
            />

            <div className="mt-6 flex gap-3">
              <Button variant="outline" onClick={() => setStep(1)} className="gap-2 border-[#2A2A2A] bg-transparent font-mono text-xs uppercase text-[#A1A1A1] hover:bg-[#1A1A1A]">
                <ArrowLeft className="h-4 w-4" /> Back
              </Button>
              <div className="flex-1">
                <ShimmerButton
                  onClick={handleConfirm}
                  disabled={!recommendation || aiLoading}
                  className="w-full gap-2 py-3 text-xs"
                >
                  <Check className="h-4 w-4" /> CREATE GOAL &amp; START SAVING
                </ShimmerButton>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
