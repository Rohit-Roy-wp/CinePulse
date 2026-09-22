import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getAllCategories, getReviewsByCategory } from "@/lib/reviews";
import { ReviewCard } from "@/components/reviews/ReviewCard";
import { AdSlot } from "@/components/ads/AdSlot";
import { ChevronRight, Film, Sparkles } from "lucide-react";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map((c) => ({
    slug: c.slug,
  }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const categories = getAllCategories();
  const category = categories.find((c) => c.slug === slug);

  if (!category) {
    return {
      title: "Category Not Found | CinePulse",
    };
  }

  return {
    title: `${category.name} Movie Reviews & Ratings`,
    description: category.description,
    openGraph: {
      title: `${category.name} Reviews | CinePulse`,
      description: category.description,
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const categories = getAllCategories();
  const category = categories.find((c) => c.slug === slug);

  if (!category) {
    notFound();
  }

  const reviews = getReviewsByCategory(slug);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumbs" className="flex items-center gap-2 text-xs text-zinc-400">
        <Link href="/" className="hover:text-white transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
        <span className="text-zinc-300 font-medium">{category.name}</span>
      </nav>

      {/* Category Hero Banner */}
      <header className="rounded-3xl p-8 sm:p-12 glass-panel border border-white/10 bg-gradient-to-r from-red-950/40 via-zinc-900/90 to-zinc-950 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/20 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-wider">
            <Film className="w-3.5 h-3.5" />
            <span>Category Archive</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            {category.name} Reviews
          </h1>

          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
            {category.description}
          </p>

          <div className="pt-2 text-xs font-semibold text-zinc-500">
            Showing <span className="text-white font-bold">{reviews.length}</span> published reviews
          </div>
        </div>
      </header>

      {/* In-feed Ad */}
      <AdSlot type="banner" />

      {/* Category Reviews Grid */}
      <section>
        {reviews.length === 0 ? (
          <div className="py-20 text-center glass-panel rounded-3xl p-8 border border-white/10">
            <Sparkles className="w-10 h-10 text-zinc-600 mx-auto mb-3" />
            <h3 className="text-xl font-bold text-white mb-2">
              Reviews Coming Soon
            </h3>
            <p className="text-sm text-zinc-400 max-w-md mx-auto mb-6">
              Our film critics are currently screening and penning down reviews for upcoming {category.name} releases. Stay tuned!
            </p>
            <Link
              href="/"
              className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition-all"
            >
              Explore All Reviews
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {reviews.map((review) => (
              <ReviewCard key={review.slug} review={review} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
