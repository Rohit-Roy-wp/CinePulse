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
    Masterpiece: { bg: "bg-amber-950/40", text: "text-amber-300", border: "border-amber-500/30" },
    Blockbuster: { bg: "bg-red-950/40", text: "text-red-300", border: "border-red-500/30" },
    "Must Watch": { bg: "bg-emerald-950/40", text: "text-emerald-300", border: "border-emerald-500/30" },
    "One-Time Watch": { bg: "bg-zinc-800", text: "text-zinc-300", border: "border-zinc-700" },
    Average: { bg: "bg-zinc-800", text: "text-zinc-400", border: "border-zinc-700" },
    Skip: { bg: "bg-rose-950/40", text: "text-rose-400", border: "border-rose-900" },
  };

  const currentVerdict = verdictColors[review.verdict] || verdictColors["Must Watch"];

  return (
    <div className="rounded-2xl p-6 sm:p-8 my-8 bg-zinc-900 border border-zinc-800 relative">
      <div className="flex flex-col sm:flex-row gap-6 lg:gap-8 items-start">
        {/* Poster Thumbnail */}
        <div className="relative w-full sm:w-48 lg:w-56 aspect-[2/3] shrink-0 rounded-xl overflow-hidden border border-zinc-800 mx-auto sm:mx-0 max-w-[280px] sm:max-w-none">
          <Image
            src={review.image}
            alt={`${review.title} poster`}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 224px"
          />
          <div className="absolute top-2 left-2 px-2.5 py-1 rounded-md bg-black/80 text-[10px] font-bold uppercase tracking-wider text-white border border-white/10">
            {review.category}
          </div>
        </div>

        {/* Info Grid */}
        <div className="flex-1 w-full space-y-5">
          {/* Header Row: Title & Verdict */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="text-xs font-semibold text-zinc-500 uppercase tracking-widest block mb-1">
                Quick Info & Verdict
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                {review.title.split(":")[0]}
              </h2>
            </div>
            
            <div
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider border ${currentVerdict.bg} ${currentVerdict.text} ${currentVerdict.border}`}
            >
              {review.verdict}
            </div>
          </div>

          {/* Rating Meter */}
          <div className="p-3.5 sm:p-4 rounded-xl bg-zinc-950 border border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 overflow-hidden">
            <div className="flex items-start sm:items-center gap-3 min-w-0">
              <Award className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400 shrink-0 mt-0.5 sm:mt-0" />
              <div className="min-w-0 space-y-1">
                <span className="text-[11px] sm:text-xs text-zinc-400 block font-medium">Overall Cineverse Score</span>
                <RatingStars rating={review.rating} maxRating={10} size="lg" />
              </div>
            </div>
            <div className="text-[11px] sm:text-xs sm:text-right text-zinc-400 shrink-0 pt-1 sm:pt-0 border-t border-zinc-800 sm:border-t-0">
              <span className="text-zinc-300 font-semibold block">Editorial Film Review</span>
              <p className="text-zinc-500">Direction, narrative, performances & score</p>
            </div>
          </div>

          {/* Grid of Key Metadata */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-sm">
            <div className="flex items-start gap-2.5 p-3 rounded-lg bg-zinc-950/60 border border-zinc-800/80">
              <Clapperboard className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-[11px] text-zinc-500 block uppercase font-medium">Director</span>
                <span className="text-white font-semibold">{review.director}</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-3 rounded-lg bg-zinc-950/60 border border-zinc-800/80">
              <Calendar className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-[11px] text-zinc-500 block uppercase font-medium">Release Date</span>
                <span className="text-white font-semibold">{review.releaseDate}</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-3 rounded-lg bg-zinc-950/60 border border-zinc-800/80">
              <Clock className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-[11px] text-zinc-500 block uppercase font-medium">Runtime</span>
                <span className="text-white font-semibold">{review.runtime}</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-3 rounded-lg bg-zinc-950/60 border border-zinc-800/80">
              <Tv className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-[11px] text-zinc-500 block uppercase font-medium">Where to Watch</span>
                <span className="text-white font-semibold">{review.platform}</span>
              </div>
            </div>

            {review.boxOfficeOrBudget && (
              <div className="sm:col-span-2 flex items-start gap-2.5 p-3 rounded-lg bg-zinc-950/60 border border-zinc-800/80">
                <DollarSign className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[11px] text-zinc-500 block uppercase font-medium">Box Office & Milestone</span>
                  <span className="text-zinc-200 font-semibold">{review.boxOfficeOrBudget}</span>
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
