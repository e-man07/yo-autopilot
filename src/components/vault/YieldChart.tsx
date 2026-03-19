'use client';

import { useVaultHistory } from '@yo-protocol/react';
import { Skeleton } from '@/components/ui/skeleton';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from 'recharts';
import { VaultId } from '@/types';

interface YieldChartProps {
  vaultId: VaultId;
}

export default function YieldChart({ vaultId }: YieldChartProps) {
  const { yieldHistory, isLoading } = useVaultHistory(vaultId);

  if (isLoading) {
    return (
      <div className="border border-[#2A2A2A] bg-[#1A1A1A] p-5">
        <h3 className="mb-4 font-mono text-sm font-bold uppercase text-[#EDEDED]">Earnings Rate History</h3>
        <Skeleton className="h-48 w-full bg-[#222222]" />
      </div>
    );
  }

  type HistPoint = { timestamp?: string | number; value?: number; date?: string };
  const data = ((yieldHistory ?? []) as HistPoint[]).map((p: HistPoint) => ({
    date: p.timestamp
      ? new Date(typeof p.timestamp === 'number' ? p.timestamp * 1000 : p.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      : p.date ?? '',
    apy: Number(p.value ?? 0),
  }));

  if (data.length === 0) {
    return (
      <div className="border border-[#2A2A2A] bg-[#1A1A1A] p-5">
        <h3 className="mb-3 font-mono text-sm font-bold uppercase text-[#EDEDED]">Earnings Rate History</h3>
        <p className="font-mono text-xs text-[#666666]">Historical data not yet available.</p>
      </div>
    );
  }

  return (
    <div className="border border-[#2A2A2A] bg-[#1A1A1A] p-5">
      <h3 className="mb-4 font-mono text-sm font-bold uppercase text-[#EDEDED]">Earnings Rate History</h3>
      <p className="mb-4 font-mono text-[10px] text-[#444444]">YIELD FLUCTUATES BASED ON MARKET DEMAND — THIS IS NORMAL.</p>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" />
            <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#666666', fontFamily: 'monospace' }} stroke="#2A2A2A" />
            <YAxis tick={{ fontSize: 10, fill: '#666666', fontFamily: 'monospace' }} stroke="#2A2A2A" tickFormatter={(v) => `${v}%`} />
            <Tooltip
              formatter={(value) => [`${Number(value).toFixed(2)}%`, 'APY']}
              contentStyle={{ backgroundColor: '#1A1A1A', border: '1px solid #2A2A2A', borderRadius: '0', fontSize: '12px', fontFamily: 'monospace', color: '#EDEDED' }}
            />
            <Line
              type="monotone"
              dataKey="apy"
              stroke="#3ECF8E"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
