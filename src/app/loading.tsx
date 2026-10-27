import React from "react";

export default function Loading() {
  return (
    <div className="space-y-12 animate-pulse">
      {/* Hero Skeleton */}
      <div className="relative rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900 min-h-[460px] sm:min-h-[520px] flex items-end p-6 sm:p-10 lg:p-14">
        <div className="w-full max-w-3xl space-y-4">
          <div className="flex gap-2">
            <div className="h-6 w-28 bg-zinc-800 rounded-full" />
            <div className="h-6 w-20 bg-zinc-800 rounded-full" />
            <div className="h-6 w-24 bg-zinc-800 rounded-full" />
          </div>
          <div className="h-10 sm:h-12 w-3/4 bg-zinc-800 rounded-xl" />
          <div className="flex gap-4">
            <div className="h-6 w-32 bg-zinc-800 rounded-lg" />
            <div className="h-6 w-24 bg-zinc-800 rounded-lg" />
          </div>
          <div className="space-y-2 pt-2">
            <div className="h-4 w-full bg-zinc-800/80 rounded" />
            <div className="h-4 w-5/6 bg-zinc-800/80 rounded" />
          </div>
          <div className="flex gap-3 pt-3">
            <div className="h-12 w-36 bg-zinc-800 rounded-xl" />
            <div className="h-12 w-32 bg-zinc-800 rounded-xl" />
          </div>
        </div>
      </div>

      {/* Cards Grid Skeleton */}
      <div className="space-y-6">
        <div className="h-8 w-48 bg-zinc-800 rounded-lg" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div
              key={i}
              className="rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900 flex flex-col"
            >
              <div className="aspect-[16/10] bg-zinc-800" />
              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="h-3 w-24 bg-zinc-800 rounded" />
                  <div className="h-5 w-4/5 bg-zinc-800 rounded" />
                  <div className="h-3 w-full bg-zinc-800/70 rounded" />
                </div>
                <div className="pt-4 border-t border-zinc-800 flex justify-between">
                  <div className="h-3 w-20 bg-zinc-800 rounded" />
                  <div className="h-3 w-16 bg-zinc-800 rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
