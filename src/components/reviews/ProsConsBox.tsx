import React from "react";
import { Plus, Minus } from "lucide-react";

interface ProsConsBoxProps {
  pros: string[];
  cons: string[];
}

export function ProsConsBox({ pros, cons }: ProsConsBoxProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
      {/* What Works (Pros) */}
      <div className="rounded-xl p-6 bg-zinc-900 border border-zinc-800">
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-zinc-800">
          <span className="flex items-center justify-center w-6 h-6 rounded bg-emerald-500/10 text-emerald-400 font-bold text-sm">
            +
          </span>
          <h3 className="text-base font-bold text-white tracking-wide uppercase">
            The Strengths
          </h3>
        </div>
        <ul className="space-y-3">
          {pros.map((item, index) => (
            <li key={index} className="flex items-start gap-3 text-sm text-zinc-300">
              <span className="text-emerald-400 font-mono font-bold select-none shrink-0 mt-0.5">+</span>
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* What Doesn't (Cons) */}
      <div className="rounded-xl p-6 bg-zinc-900 border border-zinc-800">
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-zinc-800">
          <span className="flex items-center justify-center w-6 h-6 rounded bg-rose-500/10 text-rose-400 font-bold text-sm">
            –
          </span>
          <h3 className="text-base font-bold text-white tracking-wide uppercase">
            The Shortcomings
          </h3>
        </div>
        <ul className="space-y-3">
          {cons.map((item, index) => (
            <li key={index} className="flex items-start gap-3 text-sm text-zinc-300">
              <span className="text-rose-400 font-mono font-bold select-none shrink-0 mt-0.5">–</span>
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
