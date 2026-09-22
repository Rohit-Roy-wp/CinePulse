"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, X, Star, Film, ArrowRight } from "lucide-react";
import { ReviewPost } from "@/lib/types";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  reviews: ReviewPost[];
}

export function SearchModal({ isOpen, onClose, reviews }: SearchModalProps) {
  const [query, setQuery] = useState("");

  if (!isOpen) return null;

  const filtered = query.trim()
    ? reviews.filter((r) => {
        const q = query.toLowerCase();
        return (
          r.title.toLowerCase().includes(q) ||
          r.director.toLowerCase().includes(q) ||
          r.category.toLowerCase().includes(q) ||
          r.cast.some((c) => c.toLowerCase().includes(q))
        );
      })
    : reviews.slice(0, 4);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-2xl bg-zinc-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3 border-b border-white/10 gap-3">
          <Search className="w-5 h-5 text-red-500 shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Search by movie title, actor, or director (e.g., SRK, Nolan, Dune)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-white placeholder-zinc-500 text-sm focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-2">
          <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wider px-2 mb-2">
            {query.trim() ? `Search Results (${filtered.length})` : "Trending Reviews"}
          </div>

          {filtered.length === 0 ? (
            <div className="py-12 text-center text-zinc-500 text-sm">
              No reviews found matching &quot;{query}&quot;
            </div>
          ) : (
            filtered.map((review) => (
              <Link
                key={review.slug}
                href={`/reviews/${review.slug}`}
                onClick={onClose}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-zinc-800 flex items-center justify-center text-red-500 group-hover:bg-red-600 group-hover:text-white transition-colors">
                    <Film className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white group-hover:text-red-400 transition-colors">
                      {review.title.split(":")[0]}
                    </h4>
                    <span className="text-xs text-zinc-400">
                      {review.category} • Dir: {review.director}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 text-xs font-bold text-amber-400">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{review.rating}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-white transition-colors" />
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
