import React from "react";
import Image from "next/image";
import { ReviewPost } from "@/lib/types";
import { RatingStars } from "./RatingStars";
import { Calendar, Clock, Film, Award, Tv, Users, Clapperboard, DollarSign } from "lucide-react";

interface QuickInfoBoxProps {
  review: ReviewPost;
}

export function QuickInfoBox({ review }: QuickInfoBoxProps) {
  const verdictColors: Record<string, { bg: string; text: string; border: string }> = {
    Masterpiece: { bg: "bg-purple-950/60", text: "text-purple-300", border: "border-purple-500/40" },
    Blockbuster: { bg: "bg-red-950/60", text: "text-red-300", border: "border-red-500/40" },
    "Must Watch": { bg: "bg-emerald-950/60", text: "text-emerald-300", border: "border-emerald-500/40" },
    "One-Time Watch": { bg: "bg-amber-950/60", text: "text-amber-300", border: "border-amber-500/40" },
    Average: { bg: "bg-zinc-800", text: "text-zinc-300", border: "border-zinc-700" },
    Skip: { bg: "bg-rose-950/60", text: "text-rose-400", border: "border-rose-800" },
  };

  const currentVerdict = verdictColors[review.verdict] || verdictColors["Must Watch"];

  return (
    <div className="glass-panel rounded-2xl p-6 sm:p-8 my-8 border border-white/10 shadow-2xl relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
        {/* Poster Thumbnail */}
        <div className="relative w-full sm:w-48 lg:w-56 aspect-[2/3] shrink-0 rounded-xl overflow-hidden border border-white/10 shadow-lg group">
          <Image
            src={review.image}
            alt={`${review.title} poster`}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, 224px"
          />
          <div className="absolute top-2 left-2 px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider text-white border border-white/10">
            {review.category}
          </div>
        </div>

        {/* Info Grid */}
        <div className="flex-1 w-full space-y-5">
          {/* Header Row: Title & Verdict */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="text-xs font-semibold text-zinc-400 uppercase tracking-widest block mb-1">
                Quick Info & Verdict
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {review.title.split(":")[0]}
              </h2>
            </div>
            
            <div
              className={`px-4 py-2 rounded-xl text-sm font-black uppercase tracking-wider border shadow-md ${currentVerdict.bg} ${currentVerdict.text} ${currentVerdict.border}`}
            >
              {review.verdict}
            </div>
          </div>

          {/* Rating Meter */}
          <div className="p-4 rounded-xl bg-zinc-900/80 border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Award className="w-6 h-6 text-amber-400" />
              <div>
                <span className="text-xs text-zinc-400 block font-medium">Overall CinePulse Score</span>
                <RatingStars rating={review.rating} size="lg" />
              </div>
            </div>
            <div className="text-xs sm:text-right text-zinc-400">
              <span className="text-emerald-400 font-semibold">Verified Critic Review</span>
              <p>Based on direction, story, and acting</p>
            </div>
          </div>

          {/* Grid of Key Metadata */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-sm">
            <div className="flex items-start gap-2.5 p-3 rounded-lg bg-white/5 border border-white/5">
              <Clapperboard className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-[11px] text-zinc-400 block uppercase font-medium">Director</span>
                <span className="text-white font-semibold">{review.director}</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-3 rounded-lg bg-white/5 border border-white/5">
              <Calendar className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-[11px] text-zinc-400 block uppercase font-medium">Release Date</span>
                <span className="text-white font-semibold">{review.releaseDate}</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-3 rounded-lg bg-white/5 border border-white/5">
              <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-[11px] text-zinc-400 block uppercase font-medium">Runtime</span>
                <span className="text-white font-semibold">{review.runtime}</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-3 rounded-lg bg-white/5 border border-white/5">
              <Tv className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-[11px] text-zinc-400 block uppercase font-medium">Where to Watch</span>
                <span className="text-white font-semibold">{review.platform}</span>
              </div>
            </div>

            {review.boxOfficeOrBudget && (
              <div className="sm:col-span-2 flex items-start gap-2.5 p-3 rounded-lg bg-white/5 border border-white/5">
                <DollarSign className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[11px] text-zinc-400 block uppercase font-medium">Box Office & Milestone</span>
                  <span className="text-emerald-300 font-semibold">{review.boxOfficeOrBudget}</span>
                </div>
              </div>
            )}
          </div>

          {/* Cast Members */}
          <div className="space-y-1.5 pt-1">
            <span className="text-[11px] text-zinc-400 uppercase tracking-wider font-semibold flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-zinc-400" />
              Lead Star Cast:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {review.cast.map((actor) => (
                <span
                  key={actor}
                  className="px-2.5 py-1 rounded-md bg-zinc-800 text-xs text-zinc-300 border border-white/10 font-medium"
                >
                  {actor}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
