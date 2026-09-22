import React from "react";
import { ThumbsUp, ThumbsDown, CheckCircle2, XCircle } from "lucide-react";

interface ProsConsBoxProps {
  pros: string[];
  cons: string[];
}

export function ProsConsBox({ pros, cons }: ProsConsBoxProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
      {/* What Works (Pros) */}
      <div className="rounded-2xl p-6 bg-gradient-to-b from-emerald-950/30 to-zinc-900/60 border border-emerald-500/20 shadow-xl">
        <div className="flex items-center gap-2.5 mb-4 text-emerald-400">
          <div className="p-2 rounded-lg bg-emerald-500/10">
            <ThumbsUp className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white tracking-tight">
            What Works (The Good)
          </h3>
        </div>
        <ul className="space-y-3">
          {pros.map((item, index) => (
            <li key={index} className="flex items-start gap-2.5 text-sm text-zinc-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span className="leading-snug">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* What Doesn't (Cons) */}
      <div className="rounded-2xl p-6 bg-gradient-to-b from-rose-950/30 to-zinc-900/60 border border-rose-500/20 shadow-xl">
        <div className="flex items-center gap-2.5 mb-4 text-rose-400">
          <div className="p-2 rounded-lg bg-rose-500/10">
            <ThumbsDown className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white tracking-tight">
            What Doesn't (The Bad)
          </h3>
        </div>
        <ul className="space-y-3">
          {cons.map((item, index) => (
            <li key={index} className="flex items-start gap-2.5 text-sm text-zinc-300">
              <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span className="leading-snug">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
