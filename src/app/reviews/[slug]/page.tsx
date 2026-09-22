import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { getAllReviews, getReviewBySlug, getRelatedReviews } from "@/lib/reviews";
import { QuickInfoBox } from "@/components/reviews/QuickInfoBox";
import { ProsConsBox } from "@/components/reviews/ProsConsBox";
import { ReviewContent } from "@/components/reviews/ReviewContent";
import { SocialShare } from "@/components/reviews/SocialShare";
import { ReviewCard } from "@/components/reviews/ReviewCard";
import { AdSlot } from "@/components/ads/AdSlot";
import { JsonLd } from "@/components/seo/JsonLd";
import { formatDate } from "@/lib/utils";
import { ChevronRight, Calendar, Clock, User, ShieldCheck, Star } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const reviews = getAllReviews();
  return reviews.map((review) => ({
    slug: review.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const review = getReviewBySlug(slug);

  if (!review) {
    return {
      title: "Review Not Found | CinePulse",
    };
  }

  return {
    title: `${review.title} - CinePulse Review`,
    description: review.description,
    keywords: [
      `${review.title.split(":")[0]} review`,
      `${review.title.split(":")[0]} star rating`,
      `${review.director} movie review`,
      `${review.category} movie reviews`,
      ...review.genre,
    ],
    openGraph: {
      title: `${review.title} | CinePulse Rating: ${review.rating}/5`,
      description: review.description,
      type: "article",
      publishedTime: review.date,
      authors: [review.author.name],
      images: [
        {
          url: review.backdrop || review.image,
          width: 1200,
          height: 630,
          alt: review.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${review.title} - ${review.rating}/5 Rating`,
      description: review.description,
      images: [review.backdrop || review.image],
    },
  };
}

export default async function ReviewDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const review = getReviewBySlug(slug);

  if (!review) {
    notFound();
  }

  const relatedReviews = getRelatedReviews(review.slug, review.category, 3);

  return (
    <article className="space-y-8 animate-fadeIn">
      {/* Google Rich Snippets JSON-LD Structured Data */}
      <JsonLd review={review} />

      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumbs" className="flex items-center gap-2 text-xs text-zinc-400">
        <Link href="/" className="hover:text-white transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
        <Link
          href={`/category/${review.category.toLowerCase().replace(/\s+/g, "-")}`}
          className="hover:text-white transition-colors"
        >
          {review.category}
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
        <span className="text-zinc-300 font-medium truncate max-w-[200px] sm:max-w-md">
          {review.title.split(":")[0]}
        </span>
      </nav>

      {/* Article Header & Title */}
      <header className="space-y-4 max-w-4xl">
        <div className="flex flex-wrap items-center gap-2.5">
          <Link
            href={`/category/${review.category.toLowerCase().replace(/\s+/g, "-")}`}
            className="px-3 py-1 rounded-full bg-red-600/20 text-red-400 border border-red-500/30 text-xs font-bold uppercase tracking-wider hover:bg-red-600 hover:text-white transition-colors"
          >
            {review.category}
          </Link>
          <span className="px-3 py-1 rounded-full bg-zinc-800 text-amber-400 border border-amber-500/20 text-xs font-bold">
            ★ {review.rating} / 5.0
          </span>
          <span className="px-3 py-1 rounded-full bg-white/5 text-zinc-300 text-xs font-medium">
            {review.verdict}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
          {review.title}
        </h1>

        {/* Author & Publication Timestamp */}
        <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-zinc-400 pt-2 border-b border-white/10 pb-6">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-red-600 flex items-center justify-center text-white text-xs font-bold">
              <User className="w-4 h-4" />
            </div>
            <div>
              <span className="text-white font-semibold">{review.author.name}</span>
              <span className="text-[11px] text-zinc-500 block">{review.author.role}</span>
            </div>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-zinc-500" />
            <span>Published: {formatDate(review.date)}</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-zinc-500" />
            <span>{review.readingTime}</span>
          </div>
          <div className="ml-auto hidden sm:flex items-center gap-1 text-xs text-emerald-400">
            <ShieldCheck className="w-4 h-4" />
            <span>Editorial Standards Verified</span>
          </div>
        </div>
      </header>

      {/* Main Layout Grid: Content + Sticky Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* Left Column: Full Review Content (8 cols) */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Quick Info Box */}
          <QuickInfoBox review={review} />

          {/* Pros & Cons Checklist */}
          <ProsConsBox pros={review.pros} cons={review.cons} />

          {/* Social Share Bar */}
          <SocialShare title={review.title} slug={review.slug} />

          {/* Full Markdown Review Text with In-Article AdSlot */}
          <div className="bg-zinc-950/40 rounded-3xl p-6 sm:p-10 border border-white/5">
            <ReviewContent review={review} />
          </div>

          {/* Social Share Bar (Bottom of review) */}
          <SocialShare title={review.title} slug={review.slug} />

        </div>

        {/* Right Column: Sticky Sidebar with Monetization (4 cols) */}
        <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
          
          {/* Sticky Sidebar Google AdSense Slot */}
          <div className="glass-panel rounded-2xl p-4 border border-white/10 text-center">
            <AdSlot type="sidebar" />
          </div>

          {/* Fast Verdict Summary Card */}
          <div className="glass-panel rounded-2xl p-6 border border-white/10 space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              Verdict at a Glance
            </h4>
            
            <div className="p-4 rounded-xl bg-zinc-900 border border-white/5 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-zinc-400">Movie</span>
                <span className="text-white font-bold">{review.title.split(":")[0]}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-zinc-400">Score</span>
                <span className="text-amber-400 font-black">{review.rating} / 5.0</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-zinc-400">Verdict</span>
                <span className="text-red-400 font-semibold">{review.verdict}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-zinc-400">Streaming On</span>
                <span className="text-emerald-400 font-semibold">{review.platform}</span>
              </div>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed italic">
              &quot;{review.description}&quot;
            </p>
          </div>

          {/* Editorial Integrity Box */}
          <div className="p-5 rounded-2xl bg-zinc-900/60 border border-white/5 text-xs text-zinc-400 space-y-2">
            <div className="flex items-center gap-2 text-white font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Independent Critique</span>
            </div>
            <p className="leading-relaxed">
              CinePulse does not accept financial compensation for film ratings. Our reviews are crafted independently by passionate film journalists.
            </p>
          </div>

        </aside>

      </div>

      {/* Related Reviews Section */}
      {relatedReviews.length > 0 && (
        <section className="pt-16 border-t border-white/10 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-black text-white tracking-tight">
              More in {review.category}
            </h3>
            <Link
              href={`/category/${review.category.toLowerCase().replace(/\s+/g, "-")}`}
              className="text-xs font-semibold text-red-500 hover:text-red-400"
            >
              View all {review.category} reviews →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedReviews.map((item) => (
              <ReviewCard key={item.slug} review={item} />
            ))}
          </div>
        </section>
      )}

    </article>
  );
}
