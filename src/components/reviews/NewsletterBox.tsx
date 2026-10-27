"use client";

import React, { useState } from "react";
import { Mail, CheckCircle2 } from "lucide-react";

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
    <section className="my-16 rounded-2xl p-8 sm:p-12 bg-zinc-900 border border-zinc-800">
      <div className="max-w-2xl mx-auto text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/40 border border-red-500/20 text-red-400 text-xs font-semibold">
          <Mail className="w-3.5 h-3.5" />
          <span>Weekly Film Dispatch</span>
        </div>

        <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Never Miss an Honest Critique & Box Office Analysis
        </h3>

        <p className="text-sm sm:text-base text-zinc-400 max-w-lg mx-auto leading-relaxed">
          Receive spoiler-free reviews, OTT streaming picks, and independent editorial analysis delivered directly to your inbox every Friday.
        </p>

        {submitted ? (
          <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 flex items-center justify-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span className="text-sm font-semibold">
              You&apos;re in! Welcome to The Cineverse community.
            </span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} suppressHydrationWarning className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto pt-2">
            <div className="relative flex-1">
              <Mail className="w-5 h-5 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                suppressHydrationWarning
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-zinc-950 border border-zinc-700 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-red-500 transition-colors"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              suppressHydrationWarning
              className="py-3 px-6 rounded-xl bg-red-600 hover:bg-red-500 text-white text-sm font-semibold transition-colors cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? "Subscribing..." : "Subscribe Free"}
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
