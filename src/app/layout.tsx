import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Footer } from "@/components/layout/Footer";
import { CookieConsent } from "@/components/common/CookieConsent";
import { AdSlot } from "@/components/ads/AdSlot";
import { getAllReviews } from "@/lib/reviews";

export const metadata: Metadata = {
  metadataBase: new URL("https://cinepulse.blog"),
  title: {
    default: "CinePulse | Honest Movie Reviews, Ratings & Entertainment News",
    template: "%s | CinePulse",
  },
  description:
    "CinePulse delivers in-depth, authentic movie reviews, star ratings, box office analysis, and OTT series critiques across Bollywood, Hollywood, and Indian cinema.",
  keywords: [
    "movie reviews",
    "film review blog",
    "Bollywood reviews",
    "Hollywood movie ratings",
    "Web series review",
    "Jawan review",
    "Oppenheimer review",
    "Dune review",
    "12th Fail review",
    "Panchayat review",
    "OTT recommendations",
  ],
  authors: [{ name: "CinePulse Editorial Team" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://cinepulse.blog",
    siteName: "CinePulse",
    title: "CinePulse | Honest Movie Reviews, Ratings & Entertainment News",
    description:
      "Your definitive portal for unfiltered movie reviews, star ratings, and cinema deep-dives.",
  },
  twitter: {
    card: "summary_large_image",
    title: "CinePulse | Honest Movie Reviews & Entertainment News",
    description: "Honest movie critiques, star ratings, and box office analysis.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const reviews = getAllReviews();

  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <meta name="theme-color" content="#090a0f" />
      </head>
      <body className="min-h-screen flex flex-col bg-[#090a0f] text-[#f3f4f6] antialiased" suppressHydrationWarning>
        {/* Navigation Header with Search */}
        <SiteHeader reviews={reviews} />

        {/* Global Leaderboard Ad Slot (Directly below Header) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-4">
          <AdSlot type="leaderboard" />
        </div>

        {/* Main Content Area */}
        <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-6">
          {children}
        </main>

        {/* Global Footer */}
        <Footer />

        {/* GDPR & AdSense Cookie Consent Banner */}
        <CookieConsent />

        {/* Vercel Analytics */}
        <Analytics />
      </body>
    </html>
  );
}
