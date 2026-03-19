'use client';

import { useVaultAllocations } from '@yo-protocol/react';
import { Skeleton } from '@/components/ui/skeleton';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { VaultId } from '@/types';

const COLORS = ['#3ECF8E', '#60A5FA', '#FBBF24', '#F87171', '#A78BFA', '#34D399', '#FB923C', '#818CF8'];

interface VaultAllocationChartProps {
  vaultId: VaultId;
}

export default function VaultAllocationChart({ vaultId }: VaultAllocationChartProps) {
  const { allocations, isLoading } = useVaultAllocations(vaultId);

  if (isLoading) {
    return (
      <div className="border border-[#2A2A2A] bg-[#1A1A1A] p-5">
        <h3 className="mb-4 font-mono text-sm font-bold uppercase text-[#EDEDED]">Where is your money?</h3>
        <Skeleton className="mx-auto h-48 w-48 rounded-full bg-[#222222]" />
      </div>
    );
  }

  const latest = allocations?.[allocations.length - 1];
  if (!latest) {
    return (
      <div className="border border-[#2A2A2A] bg-[#1A1A1A] p-5">
        <h3 className="mb-3 font-mono text-sm font-bold uppercase text-[#EDEDED]">Where is your money?</h3>
        <p className="font-mono text-xs text-[#666666]">Allocation data not yet available.</p>
      </div>
    );
  }

  const data: { name: string; value: number }[] = Object.entries(latest.protocols)
    .map(([name, value]) => ({ name, value: parseFloat(value) }))
    .filter((d) => d.value > 0)
    .sort((a, b) => b.value - a.value);

  if (data.length === 0) {
    return (
      <div className="border border-[#2A2A2A] bg-[#1A1A1A] p-5">
        <h3 className="mb-3 font-mono text-sm font-bold uppercase text-[#EDEDED]">Where is your money?</h3>
        <p className="font-mono text-xs text-[#666666]">Allocation data not yet available.</p>
      </div>
    );
  }

  return (
    <div className="border border-[#2A2A2A] bg-[#1A1A1A] p-5">
      <h3 className="mb-4 font-mono text-sm font-bold uppercase text-[#EDEDED]">Where is your money?</h3>
      <div className="flex flex-col items-center gap-4 sm:flex-row">
        <div className="h-48 w-48">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => `${Number(value).toFixed(1)}%`}
                contentStyle={{ backgroundColor: '#1A1A1A', border: '1px solid #2A2A2A', borderRadius: '0', fontSize: '12px', fontFamily: 'monospace', color: '#EDEDED' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex-1 space-y-2">
          {data.map((d, i) => (
            <div key={d.name} className="flex items-center justify-between font-mono text-xs">
              <div className="flex items-center gap-2">
                <div className="h-2.5 w-2.5" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                <span className="text-[#A1A1A1]">{d.name}</span>
              </div>
              <span className="font-bold text-[#EDEDED]">{d.value.toFixed(1)}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
