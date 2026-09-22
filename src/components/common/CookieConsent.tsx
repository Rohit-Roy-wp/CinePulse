"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Cookie, X } from "lucide-react";

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cinepulse_cookie_consent");
    if (!consent) {
      // Small delay for smooth entry
      const timer = setTimeout(() => setIsVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem("cinepulse_cookie_consent", "all");
    setIsVisible(false);
  };

  const handleEssentialOnly = () => {
    localStorage.setItem("cinepulse_cookie_consent", "essential");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent banner"
      className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-50 animate-slideUp"
    >
      <div className="glass-panel p-5 rounded-2xl shadow-2xl border border-white/10 bg-zinc-950/95 text-zinc-300">
        <div className="flex items-start gap-3">
          <div className="p-2.5 rounded-xl bg-red-600/20 text-red-500 shrink-0">
            <Cookie className="w-5 h-5" />
          </div>
          <div className="flex-1 text-xs">
            <h4 className="text-sm font-semibold text-white mb-1">
              Cookie & Privacy Consent
            </h4>
            <p className="text-zinc-400 leading-relaxed">
              We use cookies to deliver personalized entertainment content, analyze traffic, and display relevant Google AdSense advertisements. Read our{" "}
              <Link href="/privacy-policy" className="text-red-400 underline hover:text-red-300">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
          <button
            onClick={handleEssentialOnly}
            className="text-zinc-500 hover:text-zinc-300 p-1"
            aria-label="Dismiss cookie banner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-4 flex items-center gap-2">
          <button
            onClick={handleAcceptAll}
            className="flex-1 py-2 px-3 text-xs font-semibold rounded-xl bg-red-600 hover:bg-red-500 text-white transition-colors"
          >
            Accept All
          </button>
          <button
            onClick={handleEssentialOnly}
            className="py-2 px-3 text-xs font-medium rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors border border-white/10"
          >
            Essential Only
          </button>
        </div>
      </div>
    </div>
  );
}
