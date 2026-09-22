import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Film, ShieldCheck, Award, Heart, Users, Star, Clapperboard, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us - CinePulse Movie Reviews & Editorial Mission",
  description:
    "Learn about CinePulse, our independent film critique methodology, our star rating scale, and our commitment to authentic cinema journalism.",
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-12 py-6 animate-fadeIn">
      {/* Header Banner */}
      <header className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/20 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-wider">
          <Film className="w-3.5 h-3.5" />
          <span>About CinePulse</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Passionate Cinema Journalism, <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-amber-400">
            Unapologetically Honest Critiques.
          </span>
        </h1>
        <p className="text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          CinePulse was founded with a singular conviction: cinema lovers deserve insightful, spoiler-free, and fiercely independent film analysis free from promotional PR fluff.
        </p>
      </header>

      {/* Core Values / Mission Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-red-600/20 text-red-500 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white">100% Independent</h3>
          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
            We never accept paid reviews or studio sponsorships to alter our verdicts. Our opinions reflect genuine cinematic merit.
          </p>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
            <Award className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white">Analytical Depth</h3>
          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
            Beyond surface entertainment, we dissect screenplays, directorial craftsmanship, acting nuance, musical scores, and cinematography.
          </p>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-purple-600/20 text-purple-400 flex items-center justify-center">
            <Heart className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white">Audience First</h3>
          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
            Every review provides a clear, actionable verdict so you know whether a film is worth your hard-earned time and money.
          </p>
        </div>
      </div>

      {/* Rating System Breakdown */}
      <section className="glass-panel p-8 sm:p-10 rounded-3xl border border-white/10 space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400">
            <Star className="w-6 h-6 fill-amber-400" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white tracking-tight">
              Our 5-Star Rating Metric
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400">
              How we evaluate films, web series, and theatrical releases
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div className="p-4 rounded-xl bg-zinc-900/80 border border-white/5 space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-bold text-amber-400">4.5 – 5.0 Stars</span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800">
                Masterpiece / All-Time Must Watch
              </span>
            </div>
            <p className="text-xs text-zinc-400">
              A landmark cinematic achievement with flawless storytelling, acting, and direction. Unmissable.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-zinc-900/80 border border-white/5 space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-bold text-amber-400">3.5 – 4.0 Stars</span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                Blockbuster / Highly Recommended
              </span>
            </div>
            <p className="text-xs text-zinc-400">
              Thoroughly engaging, high production values, solid execution with very minor flaws.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-zinc-900/80 border border-white/5 space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-bold text-amber-400">2.5 – 3.0 Stars</span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800">
                One-Time Watch / Decent
              </span>
            </div>
            <p className="text-xs text-zinc-400">
              Entertaining in spurts, may suffer from pacing issues or predictability, suitable for casual streaming.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-zinc-900/80 border border-white/5 space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-bold text-amber-400">Under 2.5 Stars</span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800">
                Below Average / Skip
              </span>
            </div>
            <p className="text-xs text-zinc-400">
              Hamstrung by poor writing, uninspired direction, or jarring technical execution.
            </p>
          </div>
        </div>
      </section>

      {/* Editorial Team */}
      <section className="space-y-6">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-red-500" />
          <h2 className="text-2xl font-black text-white tracking-tight">
            Meet the Editorial Desk
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-panel p-6 rounded-2xl border border-white/10 text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-red-600 to-amber-500 mx-auto flex items-center justify-center text-white text-xl font-black shadow-lg">
              RR
            </div>
            <div>
              <h4 className="font-bold text-white">Rohit Roy</h4>
              <span className="text-xs text-red-400 font-semibold">Chief Film Critic & Founder</span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Veteran cinephile covering Bollywood and Hollywood blockbusters, box office economics, and festival cinema.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-white/10 text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 mx-auto flex items-center justify-center text-white text-xl font-black shadow-lg">
              AS
            </div>
            <div>
              <h4 className="font-bold text-white">Aisha Sharma</h4>
              <span className="text-xs text-blue-400 font-semibold">Senior OTT & Series Editor</span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Specializes in long-form television writing, character analysis, and Indian digital streaming content.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-white/10 text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-500 mx-auto flex items-center justify-center text-white text-xl font-black shadow-lg">
              DV
            </div>
            <div>
              <h4 className="font-bold text-white">David Vance</h4>
              <span className="text-xs text-emerald-400 font-semibold">International Cinema Correspondent</span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Brings insights into IMAX cinematography, sound engineering, sci-fi world-building, and Academy awards.
            </p>
          </div>
        </div>
      </section>

      {/* Ethical Pledge & Anti-Piracy Notice */}
      <section className="p-6 rounded-2xl bg-zinc-900/70 border border-white/10 space-y-3 text-sm text-zinc-300">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          Our Ethical Code
        </h3>
        <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
          CinePulse upholds the highest journalistic standards. We strictly advocate for legal movie consumption via authorized cinema theatres and licensed streaming platforms. We categorically oppose digital piracy and will never provide torrents, unauthorized download links, or infringed media on our site.
        </p>
        <div className="pt-2">
          <Link
            href="/contact"
            className="text-xs font-semibold text-red-400 hover:text-red-300 underline"
          >
            Have an editorial query or screening invitation? Contact our desk →
          </Link>
        </div>
      </section>
    </div>
  );
}
