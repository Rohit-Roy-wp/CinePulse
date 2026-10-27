import React from "react";
import Link from "next/link";
import Image from "next/image";
import { getAllReviews, getFeaturedReviews } from "@/lib/reviews";
import { ReviewFilterGrid } from "@/components/reviews/ReviewFilterGrid";
import { NewsletterBox } from "@/components/reviews/NewsletterBox";
import { RatingStars } from "@/components/reviews/RatingStars";
import { AdSlot } from "@/components/ads/AdSlot";
import { Flame, Star, Film, TrendingUp, ArrowRight, Play } from "lucide-react";

export const revalidate = 3600; // SSG with ISR (1 hour)

export default function HomePage() {
  const allReviews = getAllReviews();
  const { hero, trending } = getFeaturedReviews();

  const heroReview = hero || allReviews[0];

  return (
    <div className="space-y-12">
      
      {/* Hero Section: Featured Blockbuster Review */}
      {heroReview && (
        <section className="relative rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900 group">
          {/* Backdrop Image */}
          <div className="relative w-full min-h-[460px] sm:min-h-[540px] lg:min-h-[600px] xl:min-h-[640px] flex items-end">
            <Image
              src={heroReview.backdrop || heroReview.image}
              alt={heroReview.title}
              fill
              priority
              className="object-cover brightness-75"
              sizes="(max-width: 1680px) 100vw, 1680px"
            />
            {/* Cinematic Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#090a0f] via-[#090a0f]/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#090a0f] via-[#090a0f]/40 to-transparent" />

            {/* Hero Text Content */}
            <div className="relative z-10 p-6 sm:p-10 lg:p-14 xl:p-16 max-w-4xl space-y-4">
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600 text-white text-xs font-bold uppercase tracking-wider">
                  <Flame className="w-3.5 h-3.5 fill-white" />
                  Trending Spotlight
                </span>
                <span className="px-3 py-1 rounded-full bg-zinc-950/80 text-zinc-300 text-xs font-semibold border border-zinc-700">
                  {heroReview.category}
                </span>
                <span className="px-3 py-1 rounded-full bg-amber-950/60 text-amber-300 text-xs font-bold border border-amber-500/30">
                  Verdict: {heroReview.verdict}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-white tracking-tight leading-tight">
                <Link
                  href={`/reviews/${heroReview.slug}`}
                  className="hover:text-red-400 transition-colors"
                >
                  {heroReview.title}
                </Link>
              </h1>

              {/* Star Rating & Quick Specs */}
              <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-zinc-300">
                <div className="p-2 rounded-xl bg-zinc-950/80 border border-zinc-700">
                  <RatingStars rating={heroReview.rating} maxRating={10} size="md" />
                </div>
                <span>Dir: <strong className="text-white">{heroReview.director}</strong></span>
                <span>•</span>
                <span>Runtime: <strong className="text-white">{heroReview.runtime}</strong></span>
                <span>•</span>
                <span>Platform: <strong className="text-zinc-200">{heroReview.platform}</strong></span>
              </div>

              {/* Excerpt */}
              <p className="text-sm sm:text-base text-zinc-300 line-clamp-3 leading-relaxed max-w-3xl pt-1">
                {heroReview.description}
              </p>

              {/* Action Buttons */}
              <div className="pt-3 flex flex-wrap items-center gap-3">
                <Link
                  href={`/reviews/${heroReview.slug}`}
                  className="px-6 py-3.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-sm flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-white" />
                  Read Full Review
                </Link>
                <Link
                  href={`/category/${heroReview.category.toLowerCase().replace(/\s+/g, "-")}`}
                  className="px-5 py-3.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 font-semibold text-sm border border-zinc-700 transition-colors"
                >
                  More in {heroReview.category}
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Trending Picks Strip */}
      {trending.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-red-500" />
              High Voltage Trending Reviews
            </h2>
            <span className="text-xs text-zinc-400 hidden sm:inline">
              Critic Approved & Highly Rated
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {trending.slice(0, 4).map((item) => (
              <Link
                key={item.slug}
                href={`/reviews/${item.slug}`}
                className="p-4 rounded-xl border border-zinc-800 bg-zinc-900 hover:border-zinc-700 transition-colors flex items-center gap-4 group"
              >
                <div className="relative w-20 h-24 rounded-lg overflow-hidden shrink-0 bg-zinc-950 border border-zinc-800">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">
                      {item.category}
                    </span>
                    <div className="flex items-center gap-1 text-xs font-bold text-amber-400">
                      <Star className="w-3 h-3 fill-amber-400" />
                      <span>{item.rating}</span>
                    </div>
                  </div>
                  <h3 className="text-sm font-bold text-white group-hover:text-red-400 transition-colors truncate">
                    {item.title.split(":")[0]}
                  </h3>
                  <p className="text-xs text-zinc-400 line-clamp-1">
                    {item.verdict} • {item.runtime}
                  </p>
                  <span className="text-[11px] text-red-500 font-semibold inline-flex items-center gap-1">
                    Read critique <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* In-Feed Banner Ad */}
      <AdSlot type="banner" />

      {/* Main Filterable Reviews Grid */}
      <section className="space-y-6">
        <div className="border-b border-zinc-800 pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-500 uppercase tracking-wider mb-1">
              <Film className="w-3.5 h-3.5" />
              Latest Critiques
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Explore All Reviews
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400">
            Unfiltered verdicts across Bollywood, Hollywood & OTT
          </p>
        </div>

        {/* Interactive Filterable Review Grid */}
        <ReviewFilterGrid reviews={allReviews} />
      </section>

      {/* High-Converting Newsletter Subscription Section */}
      <NewsletterBox />

    </div>
  );
}
