import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ReviewPost } from "@/lib/types";
import { RatingStars } from "./RatingStars";
import { Calendar, Clock } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface ReviewCardProps {
  review: ReviewPost;
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <article className="group glass-panel rounded-2xl overflow-hidden flex flex-col border border-white/10 hover:border-red-500/40 hover:shadow-2xl hover:shadow-red-950/30 transition-all duration-300">
      {/* Poster Image Container */}
      <Link href={`/reviews/${review.slug}`} className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden block bg-zinc-900">
        <Image
          src={review.backdrop || review.image}
          alt={`${review.title} poster`}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#090a0f] via-transparent to-black/30" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <span className="px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md text-[11px] font-bold uppercase tracking-wider text-white border border-white/10">
            {review.category}
          </span>
          <div className="px-2.5 py-1 rounded-md bg-zinc-950/80 backdrop-blur-md border border-amber-500/30">
            <RatingStars rating={review.rating} size="sm" />
          </div>
        </div>

        {/* Bottom Platform Tag */}
        <div className="absolute bottom-3 left-3">
          <span className="text-[11px] font-medium text-zinc-300 bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded border border-white/5">
            {review.platform}
          </span>
        </div>
      </Link>

      {/* Content Area */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          {/* Metadata Row */}
          <div className="flex items-center gap-3 text-xs text-zinc-400">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-zinc-500" />
              {formatDate(review.date)}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-zinc-500" />
              {review.readingTime}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-white group-hover:text-red-400 transition-colors line-clamp-2 leading-snug">
            <Link href={`/reviews/${review.slug}`}>{review.title}</Link>
          </h3>

          {/* Description Excerpt */}
          <p className="text-xs sm:text-sm text-zinc-400 line-clamp-2 leading-relaxed">
            {review.description}
          </p>
        </div>

        {/* Card Footer: Director & Read More */}
        <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs">
          <span className="text-zinc-400 font-medium">
            Dir: <strong className="text-zinc-200">{review.director}</strong>
          </span>
          <Link
            href={`/reviews/${review.slug}`}
            className="font-semibold text-red-500 group-hover:text-red-400 flex items-center gap-1 group-hover:translate-x-0.5 transition-all"
          >
            Read Review →
          </Link>
        </div>
      </div>
    </article>
  );
}
