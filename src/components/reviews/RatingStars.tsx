import React from "react";
import { Star, StarHalf } from "lucide-react";

interface RatingStarsProps {
  rating: number; // e.g., 4.5
  maxRating?: number; // default 5
  size?: "sm" | "md" | "lg";
  showNumber?: boolean;
  className?: string;
}

export function RatingStars({
  rating,
  maxRating = 5,
  size = "md",
  showNumber = true,
  className = "",
}: RatingStarsProps) {
  const sizeClasses = {
    sm: "w-3.5 h-3.5",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  }[size];

  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.25 && rating % 1 <= 0.75;
  const emptyStars = Math.max(0, maxRating - fullStars - (hasHalfStar ? 1 : 0));

  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      <div className="flex items-center text-amber-400">
        {/* Full Stars */}
        {Array.from({ length: fullStars }).map((_, i) => (
          <Star key={`full-${i}`} className={`${sizeClasses} fill-amber-400 text-amber-400`} />
        ))}

        {/* Half Star */}
        {hasHalfStar && (
          <StarHalf className={`${sizeClasses} fill-amber-400 text-amber-400`} />
        )}

        {/* Empty Stars */}
        {Array.from({ length: emptyStars }).map((_, i) => (
          <Star key={`empty-${i}`} className={`${sizeClasses} text-zinc-700`} />
        ))}
      </div>

      {showNumber && (
        <span
          className={`font-black tracking-tight text-amber-400 ${
            size === "sm" ? "text-xs" : size === "lg" ? "text-lg" : "text-sm"
          }`}
        >
          {rating.toFixed(1)}
          <span className="text-zinc-500 font-normal text-[0.85em]">/{maxRating}</span>
        </span>
      )}
    </div>
  );
}
