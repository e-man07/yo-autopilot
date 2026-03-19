'use client';

import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { VAULTS, VAULT_LIST } from '@/lib/constants';
import { useVaultData } from '@/hooks/useVaultData';

const howItWorks = [
  {
    num: '01',
    title: 'SET A SAVINGS GOAL',
    description: 'Name it, set a target amount and date. Pick your risk level — conservative, balanced, or growth.',
  },
  {
    num: '02',
    title: 'AI PICKS YOUR VAULT',
    description: 'Our AI advisor analyzes YO Protocol vaults — yoUSD, yoETH, yoBTC — and recommends the optimal one for your goal, explaining exactly why.',
  },
  {
    num: '03',
    title: 'DEPOSIT & EARN',
    description: 'Deposit USDC, ETH, or BTC into your YO vault. Your savings grow automatically through diversified DeFi lending — Aave, Morpho, Compound, and more.',
  },
  {
    num: '04',
    title: 'TRACK & WITHDRAW',
    description: 'Watch your balance grow in real-time. See exactly which protocols earn your yield. Withdraw anytime — your funds are never locked.',
  },
];

export default function LandingPage() {
  const { isConnected } = useAccount();
  const router = useRouter();
  const wasConnected = useRef(isConnected);
  const { totalTvl } = useVaultData();

  useEffect(() => {
    if (isConnected && !wasConnected.current) {
      router.push('/dashboard');
    }
    wasConnected.current = isConnected;
  }, [isConnected, router]);

  return (
    <div className="min-h-screen bg-[#090909]">
      {/* Nav */}
      <header className="border-b border-[#2A2A2A] bg-[#111111]">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Image src="/icons/yo-logo.png" alt="YO" width={28} height={28} />
            <span className="font-display text-xl font-bold text-[#3ECF8E]">YO</span>
            <span className="font-mono text-sm text-[#A1A1A1]">AUTOPILOT</span>
          </div>
          <ConnectButton accountStatus="avatar" chainStatus="none" showBalance={false} />
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-5xl px-4 pb-16 pt-16 md:pt-24">
        <div className="animate-fade-in">
          <div className="mb-8 flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 bg-[#3ECF8E]" />
            <span className="font-mono text-xs text-[#666666]">POWERED BY YO PROTOCOL · LIVE ON BASE</span>
          </div>

          <h1 className="font-display text-5xl font-bold uppercase tracking-tight text-[#EDEDED] md:text-7xl">
            SMART SAVINGS
          </h1>
          <h1 className="font-display text-5xl font-bold uppercase tracking-tight text-[#3ECF8E] md:text-7xl">
            ON AUTOPILOT
          </h1>

          <p className="mt-6 max-w-2xl font-mono text-base text-[#A1A1A1]">
            Goal-based savings powered by <span className="text-[#3ECF8E]">YO Protocol</span> yield vaults.
            Deposit USDC, ETH, or BTC — earn real DeFi yields through Aave, Morpho, and Compound.
            AI picks the best strategy. You stay in control.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <ConnectButton.Custom>
              {({ openConnectModal }) => (
                <button
                  onClick={openConnectModal}
                  className="inline-flex items-center gap-2 rounded-sm bg-[#3ECF8E] px-8 py-3.5 font-mono text-sm font-bold uppercase text-[#090909] transition-colors hover:bg-[#4AE8A0]"
                >
                  START SAVING →
                </button>
              )}
            </ConnectButton.Custom>
            {isConnected && (
              <button
                onClick={() => router.push('/dashboard')}
                className="font-mono text-xs text-[#3ECF8E] hover:text-[#4AE8A0]"
              >
                GO TO DASHBOARD →
              </button>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16 border-y border-[#2A2A2A] py-8">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            <div className="flex flex-col">
              <div className="font-mono text-2xl font-bold text-[#EDEDED] md:text-3xl">
                ~3-8%
              </div>
              <div className="mt-1 font-mono text-[10px] text-[#666666]">APY ON STABLECOINS</div>
            </div>
            <div className="flex flex-col">
              <div className="font-mono text-2xl font-bold text-[#EDEDED] md:text-3xl">{VAULT_LIST.length}</div>
              <div className="mt-1 font-mono text-[10px] text-[#666666]">YO VAULTS</div>
            </div>
            <div className="flex flex-col">
              <div className="font-mono text-2xl font-bold text-[#EDEDED] md:text-3xl">
                {totalTvl > 0 ? `$${(totalTvl / 1e6).toFixed(0)}M+` : '$50M+'}
              </div>
              <div className="mt-1 font-mono text-[10px] text-[#666666]">TOTAL VALUE LOCKED</div>
            </div>
            <div className="flex flex-col">
              <div className="font-mono text-2xl font-bold text-[#EDEDED] md:text-3xl">BASE</div>
              <div className="mt-1 font-mono text-[10px] text-[#666666]">L2 NETWORK</div>
            </div>
          </div>
        </div>
      </section>

      {/* YO Vaults */}
      <section className="border-t border-[#2A2A2A] bg-[#090909] py-16">
        <div className="mx-auto max-w-5xl px-4">
          <div className="mb-2 font-mono text-xs text-[#666666]">YO PROTOCOL VAULTS</div>
          <div className="mb-3 h-[2px] w-10 bg-[#3ECF8E]" />
          <p className="mb-10 max-w-2xl text-sm leading-relaxed text-[#666666]">
            YO vaults automatically allocate your deposits across battle-tested DeFi lending protocols
            on Base — maximizing yield while managing risk. Each vault targets a different asset class.
          </p>

          <div className="grid gap-4 md:grid-cols-3">
            {VAULT_LIST.map((vId) => {
              const v = VAULTS[vId];
              const apyRange = vId === 'yoUSD' ? '~3-8%' : vId === 'yoETH' ? '~2-6%' : '~1-5%';
              return (
                <div key={vId} className="border border-[#2A2A2A] bg-[#1A1A1A] p-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center font-mono text-sm font-bold text-[#090909]" style={{ backgroundColor: v.color }}>
                      {v.assetSymbol[0]}
                    </div>
                    <div>
                      <div className="font-mono text-sm font-bold text-[#EDEDED]">{vId}</div>
                      <div className="font-mono text-[10px] text-[#444444]">{v.assetSymbol} · {v.riskLevel.toUpperCase()}</div>
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-[#666666]">{v.description}</p>
                  <div className="mt-4 border-t border-[#2A2A2A] pt-3">
                    <div className="font-mono text-[10px] text-[#444444]">HISTORICAL YIELD</div>
                    <div className="font-mono text-lg font-bold" style={{ color: v.color }}>
                      {apyRange}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="border-t border-[#2A2A2A] bg-[#111111] py-16">
        <div className="mx-auto max-w-5xl px-4">
          <div className="mb-2 font-mono text-xs text-[#666666]">HOW IT WORKS</div>
          <div className="mb-10 h-[2px] w-10 bg-[#3ECF8E]" />

          <div className="divide-y divide-[#2A2A2A]">
            {howItWorks.map((f) => (
              <div key={f.num} className="animate-fade-in flex gap-6 py-8">
                <div className="font-mono text-2xl font-bold text-[#333333]">{f.num}</div>
                <div>
                  <h3 className="font-mono text-sm font-bold text-[#EDEDED]">{f.title}</h3>
                  <p className="mt-2 max-w-lg text-sm leading-relaxed text-[#666666]">{f.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Powers This */}
      <section className="border-t border-[#2A2A2A] bg-[#090909] py-16">
        <div className="mx-auto max-w-5xl px-4">
          <div className="mb-2 font-mono text-xs text-[#666666]">UNDER THE HOOD</div>
          <div className="mb-10 h-[2px] w-10 bg-[#3ECF8E]" />

          <div className="grid gap-6 md:grid-cols-2">
            <div className="border border-[#2A2A2A] bg-[#1A1A1A] p-5">
              <div className="flex">
                <div className="w-[3px] flex-shrink-0 bg-[#3ECF8E]" />
                <div className="flex-1 pl-4">
                  <h3 className="font-mono text-sm font-bold text-[#EDEDED]">YO PROTOCOL</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#666666]">
                    Yield-optimized vaults that automatically allocate across DeFi lending markets.
                    Audited smart contracts on Base. Deposits go directly on-chain — no custodians, no middlemen.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {['AAVE V3', 'MORPHO', 'COMPOUND', 'EULER'].map((p) => (
                      <span key={p} className="border border-[#2A2A2A] bg-[#090909] px-2 py-0.5 font-mono text-[10px] text-[#666666]">{p}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="border border-[#2A2A2A] bg-[#1A1A1A] p-5">
              <div className="flex">
                <div className="w-[3px] flex-shrink-0 bg-[#60A5FA]" />
                <div className="flex-1 pl-4">
                  <h3 className="font-mono text-sm font-bold text-[#EDEDED]">AI ADVISOR</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#666666]">
                    Analyzes real-time vault APYs, protocol allocations, and your risk profile
                    to recommend the best savings strategy. Explains yield sources in plain English
                    so you understand exactly where your returns come from.
                  </p>
                </div>
              </div>
            </div>

            <div className="border border-[#2A2A2A] bg-[#1A1A1A] p-5">
              <div className="flex">
                <div className="w-[3px] flex-shrink-0 bg-[#FBBF24]" />
                <div className="flex-1 pl-4">
                  <h3 className="font-mono text-sm font-bold text-[#EDEDED]">FULL TRANSPARENCY</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#666666]">
                    Real-time allocation charts show which protocols hold your funds and what percentage.
                    Historical yield charts track APY over time. On-chain data — nothing hidden.
                  </p>
                </div>
              </div>
            </div>

            <div className="border border-[#2A2A2A] bg-[#1A1A1A] p-5">
              <div className="flex">
                <div className="w-[3px] flex-shrink-0 bg-[#F87171]" />
                <div className="flex-1 pl-4">
                  <h3 className="font-mono text-sm font-bold text-[#EDEDED]">HONEST RISK</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#666666]">
                    Every recommendation includes risk factors and mitigations.
                    Conservative, balanced, or growth — you choose. No hidden leverage, no degen plays.
                    Past yields don&apos;t guarantee future returns and we say it upfront.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-[#2A2A2A] bg-[#111111] py-16 text-center">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="font-display text-3xl font-bold uppercase text-[#EDEDED] md:text-4xl">
            START EARNING WITH <span className="text-[#3ECF8E]">YO</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg font-mono text-sm text-[#666666]">
            Connect your wallet. Set a goal. Let YO Protocol and AI do the rest.
          </p>
          <div className="mt-8">
            <ConnectButton.Custom>
              {({ openConnectModal }) => (
                <button
                  onClick={isConnected ? () => router.push('/dashboard') : openConnectModal}
                  className="inline-flex items-center gap-2 rounded-sm bg-[#3ECF8E] px-10 py-4 font-mono text-sm font-bold uppercase text-[#090909] transition-colors hover:bg-[#4AE8A0]"
                >
                  {isConnected ? 'GO TO DASHBOARD →' : 'CONNECT WALLET →'}
                </button>
              )}
            </ConnectButton.Custom>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#2A2A2A] py-6">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 font-mono text-[10px] text-[#444444]">
          <span>BUILT ON YO PROTOCOL · BASE L2</span>
          <span>PAST YIELDS ≠ FUTURE RETURNS</span>
        </div>
      </footer>
    </div>
  );
}
