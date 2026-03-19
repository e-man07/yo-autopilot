'use client';

import { Info } from 'lucide-react';

interface YieldExplainerProps {
  explanation: string;
  protocols?: string[];
}

export default function YieldExplainer({ explanation, protocols }: YieldExplainerProps) {
  return (
    <div className="border border-[#2A2A2A] bg-[#1A1A1A] p-4">
      <div className="mb-2 flex items-center gap-2 font-mono text-xs font-bold text-[#EDEDED]">
        <Info className="h-4 w-4 text-[#3ECF8E]" />
        WHERE YOUR EARNINGS COME FROM
      </div>
      <p className="text-sm leading-relaxed text-[#A1A1A1]">{explanation}</p>
      {protocols && protocols.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {protocols.map((p) => (
            <span
              key={p}
              className="border border-[#2A2A2A] bg-[#090909] px-2.5 py-0.5 font-mono text-[10px] text-[#A1A1A1]"
            >
              {p.toUpperCase()}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
