"use client";

import React, { useEffect } from "react";

interface AdSlotProps {
  type: "leaderboard" | "in-article" | "sidebar" | "banner";
  client?: string;
  slot?: string;
  className?: string;
}

// Ads toggle: Set to true when Google AdSense account is approved and live
const ENABLE_ADS = false;

export function AdSlot({
  type,
  client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID,
  slot,
  className = "",
}: AdSlotProps) {
  useEffect(() => {
    // Only initialize if ads are enabled, client is defined, and running in browser
    if (!ENABLE_ADS || !client || typeof window === "undefined") return;
    const globalSet = (window as any).__initializedAdSlots || new Set();
    const slotId = `${client}-${type}-${slot || "auto"}`;
    if (!globalSet.has(slotId)) {
      globalSet.add(slotId);
      (window as any).__initializedAdSlots = globalSet;
      try {
        const adsbygoogle = (window as unknown as { adsbygoogle: unknown[] }).adsbygoogle || [];
        adsbygoogle.push({});
      } catch (e) {
        console.error("AdSense initialization error:", e);
      }
    }
  }, [client, type, slot]);

  // If ads are disabled/commented out, hide completely without leaving empty spaces
  if (!ENABLE_ADS) {
    return null;
  }

  // Size styling configurations based on Google AdSense standard dimensions
  const typeConfig = {
    leaderboard: {
      containerClass: "w-full max-w-[728px] min-h-[90px] mx-auto",
      format: "horizontal",
    },
    "in-article": {
      containerClass: "w-full min-h-[140px] my-8",
      format: "fluid",
    },
    sidebar: {
      containerClass: "w-[300px] min-h-[250px] mx-auto",
      format: "rectangle",
    },
    banner: {
      containerClass: "w-full min-h-[90px]",
      format: "auto",
    },
  }[type];

  // If client is present, render the official AdSense unit
  if (client) {
    return (
      <aside
        aria-label="Advertisement"
        className={`my-6 text-center ${typeConfig.containerClass} ${className}`}
      >
        <span className="block text-[10px] uppercase tracking-widest text-zinc-500 font-medium mb-1">
          Advertisement
        </span>
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client={client}
          {...(slot ? { "data-ad-slot": slot } : {})}
          data-ad-format={typeConfig.format}
          data-full-width-responsive="true"
        />
      </aside>
    );
  }

  return null;
}

