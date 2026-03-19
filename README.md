# YO Autopilot

**Goal-based DeFi savings powered by YO Protocol yield vaults and AI recommendations.**

Built for the YO Protocol Hackathon. Live on Base L2.

## What It Does

YO Autopilot turns DeFi yield vaults into a goal-based savings experience. Users set savings goals (vacation, home, emergency fund), and an AI advisor analyzes real-time vault data to recommend the optimal strategy. Deposits go directly on-chain into YO Protocol vaults that automatically allocate across battle-tested lending protocols — Aave, Morpho, Compound, Euler, and more.

**The problem:** DeFi yield is powerful but intimidating. Users face dozens of protocols, complex risk tradeoffs, and no guidance on which vault fits their goals.

**The solution:** Set a goal, get an AI recommendation, deposit, and watch your savings grow — all in a clean interface that explains exactly where your yield comes from.

## Features

- **Goal-Based Savings** — Create named savings goals with target amounts, deadlines, and risk preferences (conservative / balanced / growth)
- **AI Vault Advisor** — Gemini 2.5 Flash analyzes live vault APYs, protocol allocations, and your risk profile to recommend the best vault with detailed explanations
- **Live Vault Data** — Real-time TVL, APY, and allocation breakdowns pulled from YO Protocol SDK (not hardcoded)
- **Deposit & Withdraw** — Multi-step transaction flows with approval, execution, and confirmation tracking
- **Portfolio Dashboard** — Total savings across all vaults, activity feed, goal progress tracking
- **Full Transparency** — Allocation charts show which protocols hold your funds and at what percentage. Historical yield charts track APY over time
- **Honest Risk** — Every recommendation includes risk factors, mitigations, and the disclaimer that past yields don't guarantee future returns

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) + TypeScript |
| Styling | Tailwind CSS v3 + shadcn/ui v4 |
| Web3 | wagmi v2 + viem v2 + RainbowKit |
| Protocol | @yo-protocol/react v1.0.6 + @yo-protocol/core v1.0.9 |
| Data | TanStack React Query v5 |
| Charts | Recharts v3 |
| AI | Google Gemini 2.5 Flash (with thinking mode) |
| Animation | Framer Motion + tailwindcss-animate |
| Chain | Base (Chain ID 8453) |

## Architecture

```
src/
├── app/
│   ├── api/advisor/route.ts        # AI advisor API (Gemini 2.5 Flash)
│   ├── page.tsx                     # Landing page
│   ├── dashboard/                   # Portfolio dashboard
│   ├── goal/                        # Goal creation & detail pages
│   └── vault/                       # Vault detail pages
├── components/
│   ├── advisor/                     # AIAdvisor, RiskBadge, YieldExplainer
│   ├── dashboard/                   # PortfolioSummary, ActivityFeed
│   ├── goals/                       # GoalWizard, GoalCard, RiskSelector, GoalProgress
│   ├── vault/                       # VaultStatsBar, YieldChart, AllocationChart
│   ├── transactions/                # DepositFlow, WithdrawFlow, TransactionSteps
│   ├── layout/                      # Navigation
│   ├── providers/                   # Web3Provider (wagmi + RainbowKit + QueryClient)
│   └── ui/                          # shadcn/ui components + custom animations
├── hooks/
│   └── useVaultData.ts              # Aggregated vault data from YO SDK
├── lib/
│   ├── constants.ts                 # Vault configs, goal categories, chain config
│   ├── goals.ts                     # Goal CRUD (localStorage)
│   ├── risk-profiles.ts             # Risk level definitions
│   ├── advisor-prompt.ts            # AI system prompt
│   └── wagmi.ts                     # Wagmi + RainbowKit config
└── types/
    └── index.ts                     # Goal, VaultId, shared types
```

## YO Protocol SDK Usage

The app uses 13+ hooks from `@yo-protocol/react`:

| Hook | Purpose |
|------|---------|
| `useVaults` | All vault stats (TVL, APY, allocations) |
| `useVaultAllocations` | Protocol allocation breakdown per vault |
| `useVaultHistory` | Historical yield data for charts |
| `useUserPosition` | User's position in a specific vault |
| `useUserHistory` | Transaction history per vault |
| `useDeposit` | Multi-step deposit flow (approve → deposit → confirm) |
| `useRedeem` | Multi-step withdrawal flow (approve → redeem → confirm) |
| `useShareBalance` | User's share token balance |
| `useTokenBalance` | Underlying token balance |
| `usePreviewDeposit` | Preview shares received for deposit amount |
| `usePreviewRedeem` | Preview assets received for share amount |
| `usePrices` | Live asset prices (ETH, BTC, USDC) |
| `usePerformanceBenchmark` | Vault performance vs benchmarks |

## Getting Started

### Prerequisites

- Node.js 18+
- A WalletConnect Project ID
- A Google Gemini API key

### Setup

```bash
# Clone and install
git clone <repo-url>
cd yo-loop
npm install

# Configure environment
cp .env.local.example .env.local
# Edit .env.local with your keys:
#   NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id
#   GEMINI_API_KEY=your_gemini_api_key

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — connect your wallet (Base network) to access the dashboard.

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` | Yes | WalletConnect Cloud project ID |
| `GEMINI_API_KEY` | Yes | Google Gemini API key for AI advisor |

## Design System

Brutalist-inspired dark theme influenced by Supabase's design language:

- **Background:** `#090909` (deep black)
- **Cards:** `#1A1A1A` with `#2A2A2A` borders
- **Accent:** `#3ECF8E` (YO green)
- **Typography:** Big Shoulders Display (headings) + JetBrains Mono (body)
- **Style:** Sharp corners, monospace uppercase labels, minimal color palette
- **Icons:** Lucide React (no emojis — all icons are labeled for clarity)

## How It Works

1. **Set a Goal** — Name your goal, pick a category (vacation, home, emergency, etc.), set a target amount and date, choose your risk level
2. **Get AI Recommendation** — The advisor analyzes live vault APYs and protocol allocations against your risk profile, then recommends the optimal vault with a detailed explanation
3. **Deposit** — Send USDC, ETH, or BTC into the recommended YO vault. Multi-step flow handles token approval and deposit in sequence
4. **Track Progress** — Dashboard shows total savings, goal progress bars, recent activity, and real-time yield data
5. **Withdraw Anytime** — Funds are never locked. Withdraw instantly or via queued redemption depending on vault liquidity

## Supported Vaults

| Vault | Asset | Risk | Underlying Protocols |
|-------|-------|------|---------------------|
| yoUSD | USDC | Conservative | Morpho, Aave, Compound, Euler |
| yoETH | ETH | Balanced | Morpho, Pendle, Euler, Fluid |
| yoBTC | BTC | Growth | Morpho, Silo, Moonwell |

## Competitive Differentiation

Unlike other hackathon entries:

- **vs. YOLO** — We focus on goal-based savings (not generic vault browsing). AI explains *why* a vault is recommended, not just what's available
- **vs. YO Goals** — Full transaction flows (deposit/withdraw), live allocation charts, and an AI advisor that uses real-time data — not just goal tracking
- **vs. VaultQuest** — No gamification gimmicks. Transparent yield sourcing, honest risk labels, and a clean UX that builds trust for real money

## Scripts

```bash
npm run dev      # Development server (localhost:3000)
npm run build    # Production build
npm run start    # Production server
npm run lint     # ESLint
```

## License

MIT
