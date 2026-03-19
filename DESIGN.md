# Design System: YO Autopilot

## 1. Visual Theme & Atmosphere

**Mood:** Institutional DeFi — the kind of interface that makes you trust it with real money. Think Stripe's clarity meets Uniswap's crypto-native confidence. Clean, precise, and quietly authoritative. Every element earns its place.

**Density:** Generous and breathable. Information is stacked vertically in clear sections, never crammed. Financial numbers are given room to be the hero. Cards are the primary containers, but vary in size and emphasis — no repetitive uniform grids.

**Aesthetic Philosophy:** "Solid confidence." Zero gradients. Every color is a flat, deliberate choice. The interface communicates trust through restraint — Midnight Ink (`#0F172A`) for authority, a single Electric Violet (`#7C3AED`) accent for brand moments, and Money Green (`#10B981`) reserved exclusively for positive financial outcomes. Animations are subtle and purposeful: numbers count up, cards fade in, but nothing bounces, shimmers, or orbits.

**DeFi/Finance Touch:** Tabular-lining numbers. Monospaced currency displays. Thin left-border accents on status cards. Protocol badges as discrete pills. Yield percentages always in green. The UI whispers "this is a financial instrument" without screaming it.

---

## 2. Color Palette & Roles

### Core Identity

| Name | Hex | HSL | Role |
|------|-----|-----|------|
| **Midnight Ink** | `#0F172A` | `222 47% 11%` | Primary buttons, hero headings, logo badge, nav text. The color of authority and trust. |
| **Electric Violet** | `#7C3AED` | `263 70% 58%` | Brand accent — active nav states, selected items, interactive links, wizard progress, AI sparkle icon. Used sparingly as a single point of differentiation. |
| **Soft Violet** | `#EDE9FE` | `263 86% 96%` | Subtle highlight backgrounds — selected emoji ring, active nav pill, AI header band. Never as text, only as surface. |

### Financial Semantics

| Name | Hex | Role |
|------|-----|------|
| **Money Green** | `#10B981` | Yields, APY rates, positive earnings, "will meet goal" badges, completed transaction checks. The only color that means "money is growing." |
| **Pale Green** | `#D1FAE5` | Background wash behind positive financial callouts (`bg-emerald-100`). |
| **Caution Amber** | `#F59E0B` | Risk warnings, moderate alerts, pending states. |
| **Signal Red** | `#EF4444` | Errors, destructive actions (delete goal), failed states. |

### Neutral System

| Name | Hex | Role |
|------|-----|------|
| **Snow** | `#F8FAFC` | Page background — barely-there warmth that lets white cards lift. |
| **White** | `#FFFFFF` | Card surfaces, modal backgrounds, nav bar (at 80% opacity + blur). |
| **Ash** | `#F1F5F9` | Inactive backgrounds, chart gridlines, divider lines, skeleton loaders. |
| **Iron** | `#CBD5E1` | Borders, input strokes, disabled text. |
| **Graphite** | `#64748B` | Secondary labels, helper text, timestamps, icon default state. |
| **Charcoal** | `#334155` | Body text, descriptions. Slightly softer than Midnight for readability. |
| **Midnight Ink** | `#0F172A` | Headings, stat values, primary text. Maximum contrast. |

### Chart Palette (Allocation Donut)

Seven distinct solid hues for data visualization. No two adjacent segments share a hue family:
```
#0F172A  #10B981  #3B82F6  #F59E0B  #EC4899  #8B5CF6  #14B8A6
```
Midnight leads as the dominant segment color, keeping charts on-brand.

---

## 3. Typography Rules

### Display Font — Space Grotesk (`font-display`)

A geometric sans-serif with a technical, DeFi-native feel. Loaded via `next/font/google`, exposed as CSS variable `--font-display`.

| Usage | Size | Weight | Tracking |
|-------|------|--------|----------|
| Landing hero | 48-60px | Bold (700) | Tight (`tracking-tight`) |
| Page titles | 24px | Bold (700) | Normal |
| Section headings | 20px | Bold (700) | Normal |
| Card subtitles | 16px | Semibold (600) | Normal |

Space Grotesk is **only** for headings. Never in body, labels, or buttons. The contrast between display and body type creates a clear hierarchy.

### Body Font — Inter (`font-sans`)

The system workhorse. Clean, neutral, ultra-readable.

| Usage | Size | Weight | Notes |
|-------|------|--------|-------|
| Body text | 14px | Regular (400) | `leading-relaxed` for descriptions |
| Stat values | 20-24px | Bold (700) | `tabular-nums` for stable alignment |
| Labels | 12px | Medium (500) | Uppercase + wider tracking for section subheads |
| Buttons | 14px | Semibold (600) | Standard buttons |
| Microcopy | 12px | Regular (400) | Slate-400 for disclaimers |

### Financial Number Treatment

- All currency values: `tabular-nums`, `$` prefix, exactly 2 decimal places
- APY/yields: always in Money Green (`#10B981`), suffix `%`
- TVL: abbreviated with `M` suffix (e.g., `$24.1M`)
- NumberTicker: animated count-up over 1.5s with ease-out cubic, triggered once on mount

---

## 4. Component Stylings

### Buttons

**Primary (Midnight Ink)**
Flat `#0F172A` background, white text, 14px semibold. Rounded corners (8px). Hover: slightly lighter (`#1E293B`). Active: 1px downward press. No glow, no shimmer — just solid, clickable confidence. Used for "Choose Risk Level," "Save," utility actions.

**Accent (Electric Violet)**
Flat `#7C3AED` background, white text. Same dimensions as Primary. Used **only** for the highest-importance CTA on a page: "Start Saving" (landing), "Get AI Recommendation" (wizard), "Create Goal" (wizard final step). One violet button per screen, max.

**Outline**
White background, 1px `#CBD5E1` border, `#334155` text. Hover: `#F8FAFC` background. Used for "Back" navigation, secondary actions.

**Ghost**
No background, no border. Text-only in the contextual color. Hover: faint muted background. Used for "Delete Goal" (red text) and tertiary actions.

### Cards

White surface (`#FFFFFF`). Thin ring border (`ring-1 ring-foreground/10`). Rounded corners at 12px (`rounded-xl`). Internal padding: 20px. Cards stack with 16px vertical gaps.

**Status accent:** Important cards (portfolio balance, AI recommendation) get a 3px left border in the relevant color — violet for AI, green for positive balance, amber for warnings. This replaces the BorderBeam effect with something quieter and more finance-appropriate.

**Hover:** Interactive cards (goal cards) lift 1px on hover with a subtle shadow deepening. No dramatic transforms.

### Inputs & Forms

48px height for comfortable touch targets. White background, 1px `#CBD5E1` border, `rounded-lg` (8px). Focus state: violet ring (`ring-2 ring-violet-500`). Currency input: fixed `$` prefix in Graphite.

Emoji picker: 40x40px targets. Selected: `#EDE9FE` background + 2px `#7C3AED` ring. Unselected: transparent, `#F8FAFC` on hover.

### Progress Indicators

**Circular Progress (Goal Ring)**
SVG ring with a solid `#7C3AED` stroke (no gradient). Track: `#F1F5F9`. Rounded endcaps. Animates from 0 over 1 second. Center: percentage in bold Midnight Ink. Two sizes: 56px (card) and 80px (detail page).

**Wizard Steps**
Horizontal circles (32px) connected by 1px lines. Active/completed: solid `#0F172A` fill, white icon. Future: `#F1F5F9` fill, `#94A3B8` text. Connecting line fills to `#0F172A` as steps complete.

**Transaction Steps**
Vertical list. Current: `#0F172A` circle with spinning loader. Completed: `#10B981` circle with check. Pending: `#F1F5F9`. Labels: Midnight for active, Green for done, Graphite for pending.

### Badges & Tags

**Protocol badge:** Pill shape, `#F1F5F9` background, `#334155` text. No color tint — protocols are neutral data, not brand elements.

**Risk badge:** Low = `#D1FAE5` bg + `#065F46` text. Medium = `#FEF3C7` bg + `#92400E` text. High = `#FEE2E2` bg + `#991B1B` text.

**Status badge (landing):** Simple pill with `#F1F5F9` background and `#0F172A` text. A tiny green dot prefix pulses to indicate "live on Base."

### Skeleton Loaders

Pulsing `#F1F5F9` rectangles matching the shape of their target content. Heights match: 32px for stats, 128px for card bodies, 192px for charts.

---

## 5. Layout Principles

### Content Width

All content constrained to `max-w-5xl` (1024px), centered. 16px horizontal padding on all breakpoints. The wizard uses `max-w-2xl` (672px) for focused, form-like flow.

### Vertical Rhythm

Primary gap between sections: 24px (`space-y-6`). Within cards: 12-16px between elements. This consistent pulse creates a calm, predictable reading experience.

### Dashboard Layout (Breaking the Grid)

The dashboard avoids repetitive 3-column grids. Instead:

```
┌──────────────────────────────────────────────┐
│  "Dashboard" title          [+ New Goal btn] │
├──────────────────────────────────────────────┤
│                                              │
│  ┌─────────── Hero Stat Card ──────────────┐ │
│  │  Your Savings   $12,450.00              │ │
│  │  Across all goals                       │ │
│  │                                         │ │
│  │  Earnings Rate: ~8-15%   TVL: $24.1M    │ │
│  └─────────────────────────────────────────┘ │
│                                              │
│  Your Goals                                  │
│  ┌──────────────┐  ┌──────────────┐          │
│  │  Goal Card   │  │  Goal Card   │          │
│  └──────────────┘  └──────────────┘          │
│                                              │
│  Recent Activity                             │
│  ┌─────────────────────────────────────────┐ │
│  │  Activity Feed                          │ │
│  └─────────────────────────────────────────┘ │
└──────────────────────────────────────────────┘
```

The savings stat is a **single hero card** with secondary stats (yield rate, TVL) as inline items below the primary number, rather than three identical cards in a row. This creates visual hierarchy: one big number dominates.

### Landing Page Layout

```
┌──────────────────────────────────────────────┐
│  [YO] Autopilot              [Connect btn]   │
├──────────────────────────────────────────────┤
│                                              │
│  ● Live on Base                              │
│                                              │
│  Smart Savings                               │
│  on Autopilot     (Space Grotesk, violet)    │
│                                              │
│  Description paragraph...                    │
│                                              │
│  [Start Saving →]  (violet solid button)     │
│  No sign-up required.                        │
│                                              │
│  ─────────────────────────────────────────── │
│  ~12%            3              Base          │
│  APY Stablecoins Strategies    Low-Cost      │
│                                              │
├──────────────────────────────────────────────┤
│                                              │
│  Savings should be simple                    │
│                                              │
│  ┌──────────────────────────────────────┐    │
│  │ 🧠  AI-Powered Advice               │    │
│  │     Description text here...          │    │
│  ├──────────────────────────────────────┤    │
│  │ 📈  Real DeFi Yields                │    │
│  │     Description text here...          │    │
│  ├──────────────────────────────────────┤    │
│  │ 🛡  Transparent & Honest            │    │
│  │     Description text here...          │    │
│  └──────────────────────────────────────┘    │
│                                              │
│  (Features as stacked list, not 3-col grid)  │
└──────────────────────────────────────────────┘
```

Features are displayed as a **stacked list** with horizontal dividers rather than a 3-column grid. Each feature gets full width for readability, with the icon + title on one line and description below.

### Responsive Behavior

- Dashboard hero stat: always full-width, single card
- Goal cards: 2-column on `sm+`, stacking on mobile
- Risk selector: remains 3-column on `md+` (this is a selection interface, not content)
- Features (landing): stacked list on all breakpoints
- Charts: full-width within card, legend below on mobile

### Navigation

**Desktop:** Sticky top bar, white/80 + backdrop blur. Logo badge (solid Midnight Ink, not gradient) + Space Grotesk wordmark left. Nav links center-left with violet-50 pill on active. Wallet button right.

**Mobile:** Fixed bottom tab bar. Active icon/label in `#7C3AED`, inactive in `#94A3B8`.

---

## 6. Motion Language

### What Animates

- **NumberTicker:** Financial values count up from 0 over 1.5s (cubic ease-out). One-shot on mount.
- **Fade-in-up:** Page sections enter with 400ms fade + 8px upward slide.
- **Card stagger:** Sequential cards delay by 100ms each.
- **Progress ring:** SVG stroke animates from 0 to target over 1s.
- **Wizard transitions:** Step content slides 20px horizontally with 300ms crossfade.

### What Does NOT Animate

- No shimmer effects on buttons — solid hover state changes only
- No orbiting border beams — replaced by static left-border accents
- No meteors or particle effects — clean backgrounds only
- No animated gradient text — static badges with solid colors
- No continuous/looping animations (except loading spinners)
- Colors don't transition — immediate swap for snappy interaction feel

### Philosophy

Animation serves one purpose: communicating that data is live and interactive. A number counting up says "this is real." A card fading in says "this just loaded." Everything else is static. In finance, stillness communicates stability.

---

## 7. Iconography

All icons from **Lucide React** — 24px grid, 1.5px stroke weight.

| Context | Size | Color |
|---------|------|-------|
| Feature list icon | 20px in 40px `#F1F5F9` rounded square | `#0F172A` |
| Section heading | 16px inline | Context-specific (green for yield, amber for risk) |
| Button inline | 16px | Inherits button text color |
| Nav/breadcrumb | 16px | `#64748B`, `#7C3AED` on hover |
| Stat card | 14px | `#64748B` |

---

## 8. Data Visualization

### Line Charts

- Single line: `#0F172A` (Midnight Ink), 2px stroke, no dots
- Grid: dashed `#F1F5F9` lines
- Axes: 11px `#64748B` labels
- Tooltip: white card, 12px, rounded-lg, subtle shadow

### Donut Charts

- Inner 50px / outer 80px, 2px padding
- 7-color solid palette (Midnight-led)
- Legend: colored dots + protocol names in `#334155`

### Stat Displays

Numbers are **always** the visual hero. Largest type in their context, bold weight, `tabular-nums`. Currency with `$` prefix. Green for yields. The NumberTicker animation makes values feel alive without being distracting.
