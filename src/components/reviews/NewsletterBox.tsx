"use client";

import React, { useState } from "react";
import { Mail, CheckCircle2, Sparkles } from "lucide-react";

export function NewsletterBox() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim()) return;
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("access_key", "106f1478-e8a6-4bbf-ba50-3f1e1c12fb48");
    formData.append("email", email);
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (data.success) {
        setSubmitted(true);
        setEmail("");
      } else {
        console.error("Newsletter submission failed", data);
        alert("Failed to subscribe. Please try again.");
      }
    } catch (err) {
      console.error("Error submitting newsletter", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="my-16 relative overflow-hidden rounded-3xl p-8 sm:p-12 glass-panel border border-red-500/20 bg-gradient-to-r from-red-950/40 via-zinc-900/90 to-zinc-950">
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-2xl mx-auto text-center relative z-10 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Weekly Film Briefing</span>
        </div>

        <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          Never Miss an Honest Review & Box Office Update
        </h3>

        <p className="text-sm sm:text-base text-zinc-400 max-w-lg mx-auto leading-relaxed">
          Join 25,000+ cinema lovers. Receive spoiler-free reviews, OTT recommendations, and industry insider analysis delivered directly to your inbox every Friday.
        </p>

        {submitted ? (
          <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 flex items-center justify-center gap-3 animate-fadeIn">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span className="text-sm font-semibold">
              You&apos;re in! Welcome to the CinePulse community.
            </span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto pt-2">
            <div className="relative flex-1">
              <Mail className="w-5 h-5 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-red-500 transition-colors"
              />
            </div>
            <button
              type="submit"
              className="py-3 px-6 rounded-xl bg-red-600 hover:bg-red-500 text-white text-sm font-bold shadow-lg shadow-red-600/30 transition-all hover:scale-102 cursor-pointer"
            >
              Subscribe Free
            </button>
          </form>
        )}

        <p className="text-[11px] text-zinc-500">
          Zero spam. Unsubscribe anytime in 1 click.
        </p>
      </div>
    </section>
  );
}
