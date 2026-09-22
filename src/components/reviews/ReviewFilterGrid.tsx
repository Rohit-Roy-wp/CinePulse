"use client";

import React, { useState, useMemo } from "react";
import { ReviewPost } from "@/lib/types";
import { ReviewCard } from "./ReviewCard";
import { Search, SlidersHorizontal, Sparkles } from "lucide-react";

interface ReviewFilterGridProps {
  reviews: ReviewPost[];
}

export function ReviewFilterGrid({ reviews }: ReviewFilterGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [sortBy, setSortBy] = useState<"latest" | "rating">("latest");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["All", "Bollywood", "Hollywood", "Web Series", "South Cinema"];

  const filteredReviews = useMemo(() => {
    return reviews
      .filter((review) => {
        const matchesCategory =
          selectedCategory === "All" ||
          review.category.toLowerCase() === selectedCategory.toLowerCase();

        const q = searchQuery.toLowerCase().trim();
        const matchesSearch =
          !q ||
          review.title.toLowerCase().includes(q) ||
          review.director.toLowerCase().includes(q) ||
          review.cast.some((c) => c.toLowerCase().includes(q));

        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === "rating") {
          return b.rating - a.rating;
        }
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
  }, [reviews, selectedCategory, sortBy, searchQuery]);

  return (
    <div className="space-y-8 my-12">
      {/* Filter and Control Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-2xl glass-panel border border-white/10 bg-zinc-900/60">
        
        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === category
                  ? "bg-red-600 text-white shadow-lg shadow-red-600/30 scale-102"
                  : "bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white"
              }`}
            >
              {category === "All" ? "All Reviews" : category}
            </button>
          ))}
        </div>

        {/* Search & Sort Controls */}
        <div className="flex items-center gap-3">
          {/* Quick Search */}
          <div className="relative flex-1 md:w-56">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter titles..."
              className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-black/50 border border-white/10 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-red-500"
            />
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-1.5 bg-black/50 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-zinc-300">
            <SlidersHorizontal className="w-3.5 h-3.5 text-zinc-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "latest" | "rating")}
              className="bg-transparent text-white focus:outline-none cursor-pointer text-xs"
            >
              <option value="latest" className="bg-zinc-900 text-white">Latest Releases</option>
              <option value="rating" className="bg-zinc-900 text-white">Highest Rated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Reviews Grid */}
      {filteredReviews.length === 0 ? (
        <div className="py-20 text-center glass-panel rounded-3xl p-8 border border-white/10">
          <Sparkles className="w-10 h-10 text-zinc-600 mx-auto mb-3" />
          <h4 className="text-lg font-bold text-white mb-1">No Reviews Found</h4>
          <p className="text-sm text-zinc-400 max-w-sm mx-auto">
            We couldn&apos;t find any reviews matching your current filter. Try resetting your search or category filter.
          </p>
          <button
            onClick={() => {
              setSelectedCategory("All");
              setSearchQuery("");
            }}
            className="mt-4 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-semibold"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredReviews.map((review) => (
            <ReviewCard key={review.slug} review={review} />
          ))}
        </div>
      )}
    </div>
  );
}
