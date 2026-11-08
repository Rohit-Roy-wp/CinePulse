"use client";

import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { getActiveFestival, Festival } from "@/lib/festivals";

export function FestiveBanner() {
  const [activeFestival, setActiveFestival] = useState<Festival | null>(null);
  const [isDismissed, setIsDismissed] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const festival = getActiveFestival();
    if (!festival) {
      setActiveFestival(null);
      return;
    }

    const storageKey = `cineverse_festive_dismissed_${festival.id}`;
    const dismissed = localStorage.getItem(storageKey);
    if (!dismissed) {
      setActiveFestival(festival);
      setIsDismissed(false);
    }
  }, []);

  if (!isMounted || !activeFestival || isDismissed) {
    return null;
  }

  const handleDismiss = () => {
    setIsDismissed(true);
    try {
      const storageKey = `cineverse_festive_dismissed_${activeFestival.id}`;
      localStorage.setItem(storageKey, "true");
    } catch {
      // LocalStorage access failsafe
    }
  };

  const { theme } = activeFestival;

  return (
    <aside
      aria-label="Festive Greeting"
      className={`relative z-40 w-full border-b ${theme.borderClass} bg-[#06070a] transition-all duration-300 overflow-hidden`}
    >
      {/* Subtle Atmospheric Cinema Glow behind the center text */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className={`w-full max-w-2xl h-full bg-gradient-to-r from-transparent ${theme.glowClass} to-transparent blur-sm`} />
      </div>

      <div className="relative max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 py-2 sm:py-2.5">
        {/* Strictly Centered Cinema Wish */}
        <div className="flex items-center justify-center text-center gap-2 sm:gap-2.5 px-8">
          <span className="text-sm sm:text-base select-none shrink-0" aria-hidden="true">
            {activeFestival.icon}
          </span>

          <p className="text-xs sm:text-sm tracking-wide text-zinc-300 font-medium">
            <span className={`font-bold ${theme.textClass}`}>
              {activeFestival.greetingTitle}
            </span>
            <span className="hidden md:inline text-zinc-400 ml-1.5 font-normal">
              — {activeFestival.greetingText}
            </span>
          </p>

          <span className="text-sm sm:text-base select-none shrink-0" aria-hidden="true">
            ✨
          </span>
        </div>

        {/* Discreet Close Button — Absolute right so it never pushes the center text */}
        <button
          type="button"
          onClick={handleDismiss}
          suppressHydrationWarning
          aria-label="Dismiss festive greeting"
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 p-1 text-zinc-500 hover:text-zinc-200 transition-colors cursor-pointer rounded-md hover:bg-white/5"
          title="Close announcement"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  );
}
