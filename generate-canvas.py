#!/usr/bin/env python3
"""
YO Autopilot — Supabase Brutalist UI Mockups
Dark theme + #3ECF8E green + raw typography + sharp structure
"""

from PIL import Image, ImageDraw, ImageFont, ImageFilter

FONT_DIR = '/Users/e-man/myprojects/yo-loop/.agents/skills/canvas-design/canvas-fonts'

def f(name, size):
    try:
        return ImageFont.truetype(f'{FONT_DIR}/{name}', size)
    except:
        return ImageFont.load_default()

# ── Fonts ──
# Brutalist display: BigShoulders — condensed, industrial, raw
big_80 = f('BigShoulders-Bold.ttf', 80)
big_56 = f('BigShoulders-Bold.ttf', 56)
big_44 = f('BigShoulders-Bold.ttf', 44)
big_36 = f('BigShoulders-Bold.ttf', 36)
big_28 = f('BigShoulders-Bold.ttf', 28)
big_24 = f('BigShoulders-Bold.ttf', 24)
big_20 = f('BigShoulders-Bold.ttf', 20)
big_r36 = f('BigShoulders-Regular.ttf', 36)
big_r28 = f('BigShoulders-Regular.ttf', 28)

# Mono — the DeFi brutalist workhorse
geo_b56 = f('GeistMono-Bold.ttf', 56)
geo_b44 = f('GeistMono-Bold.ttf', 44)
geo_b36 = f('GeistMono-Bold.ttf', 36)
geo_b28 = f('GeistMono-Bold.ttf', 28)
geo_b24 = f('GeistMono-Bold.ttf', 24)
geo_b20 = f('GeistMono-Bold.ttf', 20)
geo_b16 = f('GeistMono-Bold.ttf', 16)
geo_b14 = f('GeistMono-Bold.ttf', 14)
geo_20 = f('GeistMono-Regular.ttf', 20)
geo_16 = f('GeistMono-Regular.ttf', 16)
geo_14 = f('GeistMono-Regular.ttf', 14)
geo_b12 = f('GeistMono-Bold.ttf', 12)
geo_12 = f('GeistMono-Regular.ttf', 12)
geo_11 = f('GeistMono-Regular.ttf', 11)
geo_10 = f('GeistMono-Regular.ttf', 10)

# Body — Instrument Sans for readability
ins_18 = f('InstrumentSans-Regular.ttf', 18)
ins_16 = f('InstrumentSans-Regular.ttf', 16)
ins_14 = f('InstrumentSans-Regular.ttf', 14)
ins_13 = f('InstrumentSans-Regular.ttf', 13)
ins_12 = f('InstrumentSans-Regular.ttf', 12)
ins_b16 = f('InstrumentSans-Bold.ttf', 16)
ins_b14 = f('InstrumentSans-Bold.ttf', 14)
ins_b12 = f('InstrumentSans-Bold.ttf', 12)

# ── Supabase Dark Palette ──
BG =     '#090909'    # deepest black
BG1 =    '#111111'    # surface 1
BG2 =    '#1A1A1A'    # surface 2 (cards)
BG3 =    '#222222'    # surface 3 (elevated)
BORDER = '#2A2A2A'    # subtle border
BORD2 =  '#333333'    # stronger border
GREEN =  '#3ECF8E'    # supabase brand
GREEN_D = '#24B47E'   # darker green
GREEN_L = '#4AE8A0'   # lighter green for emphasis
GREEN_BG = '#1A2F23'  # green tinted bg
TXT =    '#EDEDED'    # primary text
TXT2 =   '#A1A1A1'    # secondary
TXT3 =   '#666666'    # muted
TXT4 =   '#444444'    # very muted
RED =    '#F87171'
AMBER =  '#FBBF24'
BLUE =   '#60A5FA'

def tw(d, text, font):
    bb = d.textbbox((0,0), text, font=font)
    return bb[2] - bb[0]

def rr(d, xy, fill, r=2, outline=None, ow=1):
    d.rounded_rectangle(xy, radius=r, fill=fill, outline=outline, width=ow)

def draw_ring(d, cx, cy, r, progress, stroke=3, track=BORDER, fill_c=GREEN):
    d.arc([cx-r, cy-r, cx+r, cy+r], 0, 360, fill=track, width=stroke)
    if progress > 0:
        d.arc([cx-r, cy-r, cx+r, cy+r], -90, -90 + int(360*progress), fill=fill_c, width=stroke)


W, H = 1440, 1024

# ════════════════════════════════════════════════════
# PAGE 1: LANDING
# ════════════════════════════════════════════════════

landing = Image.new('RGB', (W, H), BG)
d = ImageDraw.Draw(landing)

CL = 200  # content left (centered 1040px)
CR = W - 200

# ── Nav ──
d.rectangle([0, 0, W, 56], fill=BG1)
d.rectangle([0, 56, W, 57], fill=BORDER)

# Logo — raw, brutalist
d.text((CL, 14), 'YO', fill=GREEN, font=big_28)
d.text((CL + 40, 18), 'AUTOPILOT', fill=TXT2, font=geo_14)

# Nav links — mono, understated
d.text((CL + 200, 20), 'DOCS', fill=TXT3, font=geo_12)
d.text((CL + 270, 20), 'VAULTS', fill=TXT3, font=geo_12)

# Connect button — outlined, raw
btn_t = 'CONNECT WALLET'
bw = tw(d, btn_t, geo_12) + 24
rr(d, [CR - bw, 16, CR, 42], fill=BG, r=2, outline=BORD2)
d.text((CR - bw + 12, 20), btn_t, fill=TXT, font=geo_12)

# ── Hero ──
hero_y = 160

# Status pill — raw
d.rectangle([CL, hero_y, CL + 6, hero_y + 6], fill=GREEN)  # square dot, not round
d.text((CL + 14, hero_y - 4), 'LIVE ON BASE', fill=TXT3, font=geo_11)

# Giant heading — brutalist condensed
d.text((CL, hero_y + 30), 'SMART SAVINGS', fill=TXT, font=big_80)
d.text((CL, hero_y + 112), 'ON AUTOPILOT', fill=GREEN, font=big_80)

# Sub — mono, raw
d.text((CL, hero_y + 210), 'Set a goal. Pick your risk. AI finds the best yield.', fill=TXT2, font=geo_16)
d.text((CL, hero_y + 234), 'No sign-up. Connect wallet. Start earning.', fill=TXT3, font=geo_14)

# CTA — solid green, sharp corners
cta_y = hero_y + 284
cta_t = 'START SAVING →'
cta_w = tw(d, cta_t, geo_b16) + 40
rr(d, [CL, cta_y, CL + cta_w, cta_y + 48], fill=GREEN, r=3)
d.text((CL + 20, cta_y + 14), cta_t, fill=BG, font=geo_b16)

# ── Stats — horizontal, raw data display ──
stats_y = hero_y + 380
d.rectangle([CL, stats_y, CR, stats_y + 1], fill=BORDER)

stats = [
    ('~12%', 'APY STABLECOINS'),
    ('6', 'VAULTS'),
    ('BASE', 'L2 NETWORK'),
    ('24/7', 'AUTOMATED'),
]

zone = (CR - CL) // len(stats)
for i, (val, label) in enumerate(stats):
    sx = CL + i * zone
    d.text((sx, stats_y + 18), val, fill=TXT, font=geo_b28)
    d.text((sx, stats_y + 52), label, fill=TXT3, font=geo_10)
    if i < len(stats) - 1:
        d.rectangle([sx + zone - 1, stats_y + 14, sx + zone, stats_y + 66], fill=BORDER)

d.rectangle([CL, stats_y + 82, CR, stats_y + 83], fill=BORDER)

# ── Features — stacked, brutalist ──
feat_y = stats_y + 120

d.text((CL, feat_y), 'HOW IT WORKS', fill=TXT3, font=geo_12)
d.rectangle([CL, feat_y + 20, CL + 40, feat_y + 21], fill=GREEN)

features = [
    ('01', 'AI-POWERED ADVICE', 'Our advisor analyzes DeFi protocols and recommends the optimal yield strategy for your specific goal and risk tolerance.'),
    ('02', 'REAL DEFI YIELDS', 'Earn 8-15% on stablecoins through battle-tested lending protocols. No gimmicks, no ponzinomics.'),
    ('03', 'TRANSPARENT & HONEST', 'See exactly where your money goes, which protocols earn your yield, and what the real risks are. Always.'),
]

for i, (num, title, desc) in enumerate(features):
    fy = feat_y + 50 + i * 92

    # Number — large, muted
    d.text((CL, fy), num, fill=TXT4, font=geo_b28)

    # Title
    d.text((CL + 52, fy + 2), title, fill=TXT, font=geo_b16)

    # Description — wrapped
    words = desc.split()
    line = ''
    ly = fy + 24
    for w in words:
        test = line + (' ' if line else '') + w
        if tw(d, test, ins_14) > 540:
            d.text((CL + 52, ly), line, fill=TXT3, font=ins_14)
            ly += 18
            line = w
        else:
            line = test
    if line:
        d.text((CL + 52, ly), line, fill=TXT3, font=ins_14)

    if i < 2:
        d.rectangle([CL, fy + 80, CL + 620, fy + 81], fill=BORDER)

# ── Right side decoration — data visualization feel ──
# Vertical data stripe
rx = CR - 160
d.rectangle([rx, hero_y + 30, rx + 1, hero_y + 200], fill=BORDER)
d.rectangle([rx + 20, hero_y + 30, rx + 21, hero_y + 200], fill=BORDER)

# Dots pattern (brutalist grid)
for row in range(12):
    for col in range(6):
        dx = rx + 40 + col * 18
        dy = hero_y + 40 + row * 14
        alpha = 1 if (row + col) % 3 == 0 else 0
        if alpha:
            d.rectangle([dx, dy, dx + 2, dy + 2], fill=GREEN)
        else:
            d.rectangle([dx, dy, dx + 2, dy + 2], fill=BORDER)

# Protocol names as raw data
d.text((rx, hero_y + 220), 'PROTOCOLS', fill=TXT4, font=geo_10)
protos = ['AAVE_V3', 'MORPHO', 'COMPOUND', 'EULER', 'MOONWELL']
for i, p in enumerate(protos):
    col = GREEN if i < 2 else TXT4
    d.text((rx, hero_y + 238 + i * 16), p, fill=col, font=geo_10)

# ── Footer ──
d.rectangle([0, H - 48, W, H - 47], fill=BORDER)
d.text((CL, H - 34), 'BUILT ON YO PROTOCOL', fill=TXT4, font=geo_10)
d.text((CR - tw(d, 'PAST YIELDS ≠ FUTURE RETURNS', geo_10), H - 34), 'PAST YIELDS ≠ FUTURE RETURNS', fill=TXT4, font=geo_10)


# ════════════════════════════════════════════════════
# PAGE 2: DASHBOARD
# ════════════════════════════════════════════════════

dash = Image.new('RGB', (W, H), BG)
dd = ImageDraw.Draw(dash)

# ── Nav ──
dd.rectangle([0, 0, W, 56], fill=BG1)
dd.rectangle([0, 56, W, 57], fill=BORDER)

dd.text((CL, 14), 'YO', fill=GREEN, font=big_28)
dd.text((CL + 40, 18), 'AUTOPILOT', fill=TXT2, font=geo_14)

# Active nav
dd.rectangle([CL + 200, 42, CL + 270, 44], fill=GREEN)  # underline, not pill
dd.text((CL + 200, 20), 'DASHBOARD', fill=TXT, font=geo_12)
dd.text((CL + 300, 20), 'NEW GOAL', fill=TXT3, font=geo_12)

# Wallet
rr(dd, [CR - 150, 16, CR, 42], fill=BG2, r=2, outline=BORDER)
dd.text((CR - 138, 20), '0xa1b2...f3e4', fill=TXT2, font=geo_12)

# ── Header ──
dd.text((CL, 84), 'DASHBOARD', fill=TXT, font=big_44)

# New Goal button
ng = '+ NEW GOAL'
ngw = tw(dd, ng, geo_b14) + 28
rr(dd, [CR - ngw, 88, CR, 118], fill=GREEN, r=2)
dd.text((CR - ngw + 14, 94), ng, fill=BG, font=geo_b14)

# ── Hero Stat Card — full width, the BIG number ──
hc_y = 140
hc_h = 148

dd.rectangle([CL, hc_y, CR, hc_y + hc_h], fill=BG2, outline=BORDER)

# Green left accent — 3px
dd.rectangle([CL, hc_y, CL + 3, hc_y + hc_h], fill=GREEN)

dd.text((CL + 20, hc_y + 14), 'YOUR SAVINGS', fill=TXT3, font=geo_12)
dd.text((CL + 20, hc_y + 36), '$12,450.00', fill=TXT, font=geo_b56)
dd.text((CL + 20, hc_y + 100), 'ACROSS ALL GOALS', fill=TXT4, font=geo_10)

# Divider
dd.rectangle([CL + 20, hc_y + 118, CR - 20, hc_y + 119], fill=BORDER)

# Inline stats
dd.text((CL + 20, hc_y + 126), 'YIELD', fill=TXT4, font=geo_10)
dd.text((CL + 60, hc_y + 124), '~8-15%', fill=GREEN, font=geo_b14)
dd.text((CL + 170, hc_y + 126), 'TVL', fill=TXT4, font=geo_10)
dd.text((CL + 200, hc_y + 124), '$24.1M', fill=TXT, font=geo_b14)
dd.text((CL + 310, hc_y + 126), 'VAULTS', fill=TXT4, font=geo_10)
dd.text((CL + 360, hc_y + 124), '6', fill=TXT, font=geo_b14)

# ── Goals ──
gy = hc_y + hc_h + 28
dd.text((CL, gy), 'YOUR GOALS', fill=TXT3, font=geo_12)
dd.rectangle([CL, gy + 18, CL + 30, gy + 19], fill=GREEN)

gc_y = gy + 32
gc_gap = 16
gc_w = (CR - CL - gc_gap) // 2
gc_h = 160

# Goal 1
dd.rectangle([CL, gc_y, CL + gc_w, gc_y + gc_h], fill=BG2, outline=BORDER)

dd.text((CL + 16, gc_y + 14), '🏖️', font=ins_16)
dd.text((CL + 40, gc_y + 14), 'VACATION FUND', fill=TXT, font=geo_b14)
dd.text((CL + 16, gc_y + 38), 'yoUSD', fill=GREEN, font=geo_12)
dd.text((CL + 80, gc_y + 38), '· 142d left', fill=TXT4, font=geo_12)

# Big number
dd.text((CL + 16, gc_y + 68), '$3,200.00', fill=TXT, font=geo_b28)
dd.text((CL + 16, gc_y + 104), 'of $5,000 goal', fill=TXT3, font=geo_12)

# Progress bar instead of ring — more brutalist
bar_y = gc_y + gc_h - 20
dd.rectangle([CL + 16, bar_y, CL + gc_w - 16, bar_y + 4], fill=BORDER)
bar_fill = int((gc_w - 32) * 0.64)
dd.rectangle([CL + 16, bar_y, CL + 16 + bar_fill, bar_y + 4], fill=GREEN)

# Percentage
dd.text((CL + gc_w - 50, gc_y + 104), '64%', fill=GREEN, font=geo_b16)

# Goal 2
g2x = CL + gc_w + gc_gap
dd.rectangle([g2x, gc_y, g2x + gc_w, gc_y + gc_h], fill=BG2, outline=BORDER)

dd.text((g2x + 16, gc_y + 14), '🚗', font=ins_16)
dd.text((g2x + 40, gc_y + 14), 'NEW CAR', fill=TXT, font=geo_b14)
dd.text((g2x + 16, gc_y + 38), 'yoETH', fill=BLUE, font=geo_12)
dd.text((g2x + 72, gc_y + 38), '· 340d left', fill=TXT4, font=geo_12)

dd.text((g2x + 16, gc_y + 68), '$8,720.50', fill=TXT, font=geo_b28)
dd.text((g2x + 16, gc_y + 104), 'of $25,000 goal', fill=TXT3, font=geo_12)

bar_fill2 = int((gc_w - 32) * 0.35)
dd.rectangle([g2x + 16, bar_y, g2x + gc_w - 16, bar_y + 4], fill=BORDER)
dd.rectangle([g2x + 16, bar_y, g2x + 16 + bar_fill2, bar_y + 4], fill=BLUE)

dd.text((g2x + gc_w - 50, gc_y + 104), '35%', fill=BLUE, font=geo_b16)

# ── Recent Activity ──
act_y = gc_y + gc_h + 28
dd.text((CL, act_y), 'RECENT ACTIVITY', fill=TXT3, font=geo_12)
dd.rectangle([CL, act_y + 18, CL + 30, act_y + 19], fill=GREEN)

ac_y = act_y + 32
dd.rectangle([CL, ac_y, CR, ac_y + 300], fill=BG2, outline=BORDER)

# Table header
dd.text((CL + 16, ac_y + 12), 'ACTION', fill=TXT4, font=geo_10)
dd.text((CL + 200, ac_y + 12), 'DETAIL', fill=TXT4, font=geo_10)
dd.text((CR - 120, ac_y + 12), 'TIME', fill=TXT4, font=geo_10)
dd.rectangle([CL + 16, ac_y + 30, CR - 16, ac_y + 31], fill=BORDER)

activities = [
    ('DEPOSIT', '$500.00 USDC → Vacation Fund', '2h ago', GREEN),
    ('CREATE', 'New Car — $25,000 target', '1d ago', BLUE),
    ('YIELD', '+$12.34 earned on yoUSD', '3d ago', GREEN),
    ('DEPOSIT', '$2,700 USDC → Vacation Fund', '5d ago', GREEN),
    ('CREATE', 'Vacation Fund — $5,000 target', '1w ago', BLUE),
]

for i, (action, detail, time, color) in enumerate(activities):
    ay = ac_y + 40 + i * 48

    # Action with color indicator
    dd.rectangle([CL + 16, ay + 4, CL + 20, ay + 14], fill=color)
    dd.text((CL + 28, ay), action, fill=color, font=geo_b12)

    dd.text((CL + 200, ay), detail, fill=TXT2, font=ins_14)
    dd.text((CR - 120, ay + 2), time, fill=TXT4, font=geo_12)

    if i < len(activities) - 1:
        dd.rectangle([CL + 16, ay + 38, CR - 16, ay + 39], fill=BORDER)


# ════════════════════════════════════════════════════
# PAGE 3: GOAL DETAIL
# ════════════════════════════════════════════════════

detail = Image.new('RGB', (W, H), BG)
dg = ImageDraw.Draw(detail)

# ── Nav ──
dg.rectangle([0, 0, W, 56], fill=BG1)
dg.rectangle([0, 56, W, 57], fill=BORDER)
dg.text((CL, 14), 'YO', fill=GREEN, font=big_28)
dg.text((CL + 40, 18), 'AUTOPILOT', fill=TXT2, font=geo_14)
dg.text((CL + 200, 20), 'DASHBOARD', fill=TXT3, font=geo_12)
rr(dg, [CR - 150, 16, CR, 42], fill=BG2, r=2, outline=BORDER)
dg.text((CR - 138, 20), '0xa1b2...f3e4', fill=TXT2, font=geo_12)

# ── Back ──
dg.text((CL, 76), '← DASHBOARD', fill=TXT3, font=geo_12)

# ── Goal Header ──
dg.text((CL, 108), '🏖️', font=ins_18)
dg.text((CL + 30, 102), 'VACATION FUND', fill=TXT, font=big_44)
dg.text((CL + 30, 146), 'yoUSD', fill=GREEN, font=geo_14)
dg.text((CL + 90, 146), '· USDC SAVINGS · 142 DAYS LEFT', fill=TXT4, font=geo_12)

# Progress — horizontal bar, brutalist
prog_y = 176
dg.rectangle([CL, prog_y, CR, prog_y + 8], fill=BORDER)
pf = int((CR - CL) * 0.64)
dg.rectangle([CL, prog_y, CL + pf, prog_y + 8], fill=GREEN)
dg.text((CL + pf + 8, prog_y - 4), '64%', fill=GREEN, font=geo_b14)

# ── Stats Grid ──
sg_y = prog_y + 36

stats_detail = [
    ('CURRENT', '$3,200.00'),
    ('TARGET', '$5,000.00'),
    ('REMAINING', '$1,800.00'),
    ('RISK', 'CONSERVATIVE'),
]

szone = (CR - CL) // 4
for i, (label, val) in enumerate(stats_detail):
    sx = CL + i * szone
    dg.rectangle([sx, sg_y, sx + szone - 8, sg_y + 72], fill=BG2, outline=BORDER)
    dg.text((sx + 12, sg_y + 10), label, fill=TXT4, font=geo_10)
    dg.text((sx + 12, sg_y + 30), val, fill=TXT, font=geo_b16)

# ── Deposit / Withdraw ──
tab_y = sg_y + 96

# Tabs — brutalist underline, not pills
dg.text((CL, tab_y), 'ADD SAVINGS', fill=GREEN, font=geo_b14)
dg.rectangle([CL, tab_y + 20, CL + tw(dg, 'ADD SAVINGS', geo_b14), tab_y + 22], fill=GREEN)
dg.text((CL + 140, tab_y), 'WITHDRAW', fill=TXT4, font=geo_14)

# Form
form_y = tab_y + 44
dg.rectangle([CL, form_y, CR, form_y + 200], fill=BG2, outline=BORDER)

dg.text((CL + 20, form_y + 16), 'AMOUNT', fill=TXT4, font=geo_10)

# Balance — right aligned
bal_t = 'BAL: 4,200.00 USDC'
dg.text((CR - 20 - tw(dg, bal_t, geo_12), form_y + 16), bal_t, fill=TXT4, font=geo_12)

# Input
inp_y = form_y + 38
dg.rectangle([CL + 20, inp_y, CR - 20, inp_y + 52], fill=BG, outline=BORDER)
dg.text((CL + 32, inp_y + 14), '$', fill=TXT4, font=geo_20)
dg.text((CL + 52, inp_y + 14), '500.00', fill=TXT, font=geo_20)
dg.text((CR - 80, inp_y + 16), 'USDC', fill=TXT3, font=geo_b14)

# Preview
dg.text((CL + 20, inp_y + 66), "YOU'LL RECEIVE SHARES REPRESENTING YOUR POSITION.", fill=TXT4, font=geo_11)
dg.text((CL + 20, inp_y + 82), 'YOUR SAVINGS GROW AUTOMATICALLY.', fill=TXT4, font=geo_11)

# Submit
btn_y = inp_y + 108
rr(dg, [CL + 20, btn_y, CR - 20, btn_y + 48], fill=GREEN, r=2)
st = 'SAVE 500 USDC'
dg.text(((CL + CR)//2 - tw(dg, st, geo_b16)//2, btn_y + 14), st, fill=BG, font=geo_b16)

# ── Vault Info ──
vi_y = form_y + 220
dg.rectangle([CL, vi_y, CR, vi_y + 80], fill=BG2, outline=BORDER)

# Green left accent
dg.rectangle([CL, vi_y, CL + 3, vi_y + 80], fill=GREEN)

dg.text((CL + 20, vi_y + 12), 'USDC SAVINGS ACCOUNT', fill=TXT, font=geo_b14)
dg.text((CL + 20, vi_y + 34), 'Diversified lending across Aave, Morpho, Compound', fill=TXT3, font=ins_13)

dg.text((CR - 280, vi_y + 14), 'YIELD', fill=TXT4, font=geo_10)
dg.text((CR - 280, vi_y + 30), '12.4%', fill=GREEN, font=geo_b20)

dg.text((CR - 160, vi_y + 14), 'TVL', fill=TXT4, font=geo_10)
dg.text((CR - 160, vi_y + 30), '$24.1M', fill=TXT, font=geo_b20)

# Protocol tags
pt_y = vi_y + 58
protos = ['AAVE_V3', 'MORPHO', 'COMPOUND']
px = CL + 20
for p in protos:
    pw = tw(dg, p, geo_10) + 12
    dg.rectangle([px, pt_y, px + pw, pt_y + 18], fill=BG, outline=BORDER)
    dg.text((px + 6, pt_y + 2), p, fill=TXT3, font=geo_10)
    px += pw + 6

# ── AI Card ──
ai_y = vi_y + 100
dg.rectangle([CL, ai_y, CR, ai_y + 100], fill=BG2, outline=BORDER)

# Green left accent for AI
dg.rectangle([CL, ai_y, CL + 3, ai_y + 100], fill=GREEN)

# Header
dg.rectangle([CL + 3, ai_y, CR, ai_y + 32], fill=GREEN_BG)
dg.text((CL + 20, ai_y + 8), '✦ AI RECOMMENDATION', fill=GREEN, font=geo_b12)

dg.text((CL + 20, ai_y + 46), 'USDC Savings is optimal for your conservative goal.', fill=TXT2, font=ins_14)
dg.text((CL + 20, ai_y + 66), 'Stablecoin yields provide ~12% APY with minimal price risk.', fill=TXT3, font=ins_13)

# ── Bottom actions ──
bot_y = ai_y + 118
dg.rectangle([CL, bot_y, CR, bot_y + 1], fill=BORDER)
dg.text((CL, bot_y + 12), 'VIEW VAULT DETAILS →', fill=GREEN, font=geo_12)
dt = 'DELETE GOAL'
dg.text((CR - tw(dg, dt, geo_12), bot_y + 12), dt, fill=RED, font=geo_12)


# ════════════════════════════════════════════════════
# COMBINE
# ════════════════════════════════════════════════════

pad = 60
label_h = 36
total_h = (H + pad + label_h) * 3 + pad
final = Image.new('RGB', (W + 120, total_h), '#050505')
fd = ImageDraw.Draw(final)

pages = [
    (landing, '01 — LANDING'),
    (dash, '02 — DASHBOARD'),
    (detail, '03 — GOAL DETAIL'),
]

for i, (page, label) in enumerate(pages):
    yo = pad + i * (H + pad + label_h)

    fd.text((60, yo), label, fill=TXT4, font=geo_12)
    dims = f'{W}×{H}'
    fd.text((60 + tw(fd, label, geo_12) + 16, yo + 2), dims, fill=TXT4, font=geo_10)

    # Paste
    final.paste(page, (60, yo + label_h))

    # Border frame
    fd.rectangle([59, yo + label_h - 1, 60 + W, yo + label_h + H], outline=BORDER)

out = '/Users/e-man/myprojects/yo-loop/yo-autopilot-mockups.png'
final.save(out, 'PNG', quality=100)
print(f'Saved: {out} ({final.size[0]}x{final.size[1]})')
