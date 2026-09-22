"use client";

import React, { useEffect } from "react";

interface AdSlotProps {
  type: "leaderboard" | "in-article" | "sidebar" | "banner";
  client?: string;
  slot?: string;
  className?: string;
}

export function AdSlot({
  type,
  client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID,
  slot,
  className = "",
}: AdSlotProps) {
  useEffect(() => {
    // Only attempt to push ads if client ID is set and window.adsbygoogle is loaded
    if (client && typeof window !== "undefined") {
      try {
        const adsbygoogle = (window as unknown as { adsbygoogle: unknown[] }).adsbygoogle || [];
        adsbygoogle.push({});
      } catch (e) {
        console.error("AdSense initialization error:", e);
      }
    }
  }, [client]);

  // Size styling configurations based on Google AdSense standard dimensions
  const typeConfig = {
    leaderboard: {
      label: "Responsive Leaderboard Ad (728x90 / 320x50)",
      containerClass: "w-full max-w-[728px] h-[90px] mx-auto",
      format: "horizontal",
    },
    "in-article": {
      label: "In-Article Native Ad Slot",
      containerClass: "w-full min-h-[140px] my-8",
      format: "fluid",
    },
    sidebar: {
      label: "Sticky Display Ad (300x250 / 300x600)",
      containerClass: "w-[300px] min-h-[250px] mx-auto",
      format: "rectangle",
    },
    banner: {
      label: "Responsive Display Ad",
      containerClass: "w-full min-h-[100px]",
      format: "auto",
    },
  }[type];

  // If real client is provided, render the official AdSense script tag
  if (client && slot) {
    return (
      <div className={`my-6 text-center ${className}`}>
        <span className="block text-[10px] uppercase tracking-widest text-zinc-400 font-semibold mb-1">
          Advertisement
        </span>
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client={client}
          data-ad-slot={slot}
          data-ad-format={typeConfig.format}
          data-full-width-responsive="true"
        />
      </div>
    );
  }

  // Otherwise, render a high-quality demonstration placeholder that conforms to AdSense placement rules
  return (
    <aside
      aria-label="Advertisement"
      className={`my-6 mx-auto ${typeConfig.containerClass} ${className}`}
    >
      <div className="relative w-full h-full bg-zinc-900/80 border border-dashed border-white/15 rounded-xl p-3 flex flex-col items-center justify-center text-center overflow-hidden group hover:border-red-500/30 transition-colors">
        <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-400 mb-1">
          Advertisement
        </span>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span className="text-xs font-semibold text-zinc-400">
            {typeConfig.label}
          </span>
        </div>
        <p className="text-[11px] text-zinc-400 mt-1 max-w-xs">
          Google AdSense Ready • Automatic sizing for mobile & desktop
        </p>
      </div>
    </aside>
  );
}
