# Implementation Plan - CinePulse: Movie Review & Entertainment Blog

Build **CinePulse**, a production-grade, SEO-optimized, monetization-ready movie review and entertainment platform built with **Next.js (App Router)**, **Tailwind CSS**, and zero-cost **MDX/Markdown** content architecture.

---

## User Review Required

> [!IMPORTANT]
> **AdSense Compliance & Monetization Structure**:
> - AdSense placeholder slots will be built with responsive, clean layouts (Leaderboard, In-Article, Sticky Sidebar) and an easy toggle to input your Google AdSense Publisher ID (`ca-pub-xxxxxxxxxx`).
> - A Google Consent Mode / GDPR-compliant Cookie Banner will be included to meet AdSense's mandatory requirements.
> - `public/ads.txt` will be pre-configured with placeholder Google publisher credentials.
> - Strictly **zero piracy links** will be present; instead, official OTT availability badges (e.g., Netflix, Prime Video, Theatres) will be shown.

> [!NOTE]
> **Content & MDX Architecture**:
> - Reviews are written as Markdown/MDX files in `content/reviews/` with frontmatter (`title`, `date`, `rating`, `category`, `director`, `cast`, `verdict`, `pros`, `cons`, `runtime`, `image`, etc.).
> - No database is required, keeping hosting 100% free on Vercel while achieving sub-second load times and static site generation (SSG).

---

## Architecture & Design Aesthetic

- **Design System**: Premium Dark Cinema UI (Obsidian `#0a0b0e`, Slate `#12151c`, Crimson Accent `#e50914`, Gold/Amber `#f59e0b` for ratings & highlights, glassmorphism cards, subtle neon glow).
- **Typography & Icons**: Clean, modern typography with responsive scaling and Lucide React icons.
- **Rendering Strategy**: Static Site Generation (`generateStaticParams`) with Incremental Static Regeneration support for optimal Google Lighthouse scores (90+ on mobile & desktop).
- **Structured Data**: Google Rich Snippets compatible Schema.org `Movie` and `Review` JSON-LD on every review page for star ratings in Google SERP.

---

## Proposed Changes

### 1. Project Initialization & Dependencies

Bootstrap Next.js App Router project in the root directory:
- Framework: Next.js 14/15 with TypeScript, Tailwind CSS, App Router (`src/` directory layout).
- Supporting Packages:
  - `gray-matter`: Frontmatter extraction from MDX/markdown files
  - `date-fns`: Elegant date formatting
  - `lucide-react`: Crisp cinema, social, and UI icons
  - `clsx` & `tailwind-merge`: Dynamic utility classes

---

### 2. Core Library & Content Architecture

#### [NEW] `src/lib/types.ts`
- TypeScript interfaces for `ReviewPost`, `ReviewFrontmatter`, `QuickInfo`, `Category`, and `BreadcrumbItem`.

#### [NEW] `src/lib/reviews.ts`
- Functions to read, parse, and sort markdown reviews:
  - `getAllReviews()`: Reads all `.mdx` files from `content/reviews/`, parses frontmatter, calculates reading time, sorts by date.
  - `getReviewBySlug(slug)`: Retrieves individual review with raw and parsed content.
  - `getReviewsByCategory(category)`: Filters reviews by category (Bollywood, Hollywood, Web Series, etc.).
  - `getFeaturedReviews()`: Returns hero and trending reviews.
  - `getAllCategories()`: Aggregates unique categories with post counts.

#### [NEW] `content/reviews/*.mdx` (5 Authentic 600-800+ word reviews)
1. `jawan.mdx` (Bollywood / Action / Atlee / SRK - 4.5/5 ⭐)
2. `oppenheimer.mdx` (Hollywood / Biopic Drama / Christopher Nolan - 4.8/5 ⭐)
3. `dune-part-two.mdx` (Hollywood / Sci-Fi Epic / Denis Villeneuve - 4.7/5 ⭐)
4. `12th-fail.mdx` (Bollywood / Inspiring Drama / Vidhu Vinod Chopra - 4.9/5 ⭐)
5. `panchayat-season-3.mdx` (Web Series / Rural Comedy-Drama / TVF - 4.3/5 ⭐)

Each contains detailed frontmatter:
```yaml
title: "Jawan Movie Review: Shah Rukh Khan & Atlee Deliver a High-Octane Mass Spectacle"
slug: "jawan"
date: "2026-09-21"
rating: 4.5
category: "Bollywood"
director: "Atlee"
cast: ["Shah Rukh Khan", "Nayanthara", "Vijay Sethupathi", "Deepika Padukone"]
releaseDate: "September 7, 2023"
runtime: "2h 49m"
verdict: "Blockbuster Entertainer"
platform: "Theatres / Netflix"
pros:
  - "Unmatched screen presence and dual avatar of Shah Rukh Khan"
  - "High-voltage action sequences and thumping Anirudh BGM"
  - "Sharp social and political messaging wrapped in mass entertainment"
cons:
  - "Slightly overstuffed screenplay in the second half"
  - "Predictable emotional beats in flashback scenes"
image: "/images/reviews/jawan-banner.jpg"
description: "An explosive action entertainer that balances mass commercial cinema with poignant social messaging..."
```

---

### 3. UI Components & Design System

#### [NEW] `src/components/layout/Navbar.tsx`
- Logo with pulse glow effect ("CinePulse"), navigation links (Home, Bollywood, Hollywood, Web Series, Top Rated), search modal trigger, mobile responsive drawer.

#### [NEW] `src/components/layout/Footer.tsx`
- Rich footer with brand bio, category links, legal links (Privacy Policy, Terms, About, Contact), newsletter subscription, copyright notice, and DMCA / Fair Use disclaimer.

#### [NEW] `src/components/ads/AdSlot.tsx`
- Flexible Google AdSense container supporting:
  - `leaderboard` (728x90 / responsive mobile 320x50 / 300x100) below header
  - `in-article` (responsive banner) mid-review
  - `sidebar` (300x250 / 300x600 sticky display ad)
  - `mobile-anchor` (optional bottom banner)
- Includes clean "ADVERTISEMENT" regulatory disclosure label and fallback preview mode.

#### [NEW] `src/components/common/CookieConsent.tsx`
- GDPR & Google AdSense Consent Mode v2 compliant banner with Accept All, Essential Only, and storage in `localStorage`.

#### [NEW] `src/components/reviews/QuickInfoBox.tsx`
- Prominent review metadata box: Director, Cast pills, Release Date, Runtime, Category, OTT/Theatre platform, Star Rating with visual score bar, and CinePulse Verdict Badge.

#### [NEW] `src/components/reviews/ProsConsBox.tsx`
- Side-by-side or stacked visual cards highlighting "What Works (The Good 👍)" and "What Doesn't (The Bad 👎)".

#### [NEW] `src/components/reviews/RatingStars.tsx`
- High-fidelity star rating renderer (supporting full, half, and empty stars with score label).

#### [NEW] `src/components/reviews/SocialShare.tsx`
- Interactive share buttons for WhatsApp, X (Twitter), Facebook, Reddit, and 1-click "Copy Link" with instant visual confirmation toast.

#### [NEW] `src/components/reviews/ReviewCard.tsx`
- Cinematic review card with category pill, rating badge, thumbnail image with hover zoom, reading time, and date.

#### [NEW] `src/components/reviews/ReviewContent.tsx`
- Custom Markdown renderer with styled blockquotes, scorecards, headers, image figures, and inserted In-Article ad slot.

---

### 4. Pages & Routing

#### [NEW] `src/app/page.tsx` (Homepage)
- **Hero Spotlight**: Large banner for trending/latest blockbuster review with quick rating, verdict, and CTA.
- **Top Rated Strip**: Quick scrollable/grid badges of top-scored movies.
- **Categorized Grid**: Filterable tabs (All, Bollywood, Hollywood, Web Series) + Search input.
- **Leaderboard Ad Slot** between hero and grid.
- **Newsletter Subscription Section**: High-converting email signup component with validation and feedback.

#### [NEW] `src/app/reviews/[slug]/page.tsx` (Review Detail Page)
- Dynamic route with `generateStaticParams` (SSG) and dynamic `generateMetadata` (SEO title, description, OpenGraph images).
- JSON-LD Structured Data script (`Movie` + `Review` schema).
- Quick Info Box + Pros & Cons + Full Review content + Mid-article Ad + Sticky Sidebar Ad + Share Buttons + Related Reviews.

#### [NEW] `src/app/category/[slug]/page.tsx` (Category Archive Page)
- Dynamic route for each category with hero title, description, article counter, and responsive review cards.

#### [NEW] Mandatory AdSense Pages:
- `src/app/about/page.tsx`: Editorial integrity, review guidelines, rating scale explanation (1 to 5 stars), author team.
- `src/app/contact/page.tsx`: Contact form, editorial inquiries, press/review screening requests, email.
- `src/app/privacy-policy/page.tsx`: Comprehensive GDPR, CCPA, and Google AdSense DART cookie compliant policy.
- `src/app/terms/page.tsx`: Terms of Service, DMCA policy, Fair Use disclaimer for movie posters and trailers.

---

### 5. SEO & Monetization Assets

#### [NEW] `public/ads.txt`
- Standard Google AdSense format file ready for publisher ID validation.

#### [NEW] `src/app/sitemap.ts`
- Automatic XML sitemap generation containing home, all review pages, category pages, and legal pages.

#### [NEW] `src/app/robots.ts`
- Crawling instructions for Googlebot, Bingbot, allowing all public routes and linking to `sitemap.xml`.

#### [NEW] `src/components/seo/JsonLd.tsx`
- Helper component to cleanly inject Schema.org JSON-LD scripts for reviews, breadcrumbs, and website.

---

## Verification Plan

### Automated Build & Lint Verification
1. `npm run build`: Verify Next.js generates all static routes (`/`, `/reviews/[slug]`, `/category/[slug]`, `/about`, `/contact`, `/privacy-policy`, `/terms`, `/sitemap.xml`, `/robots.txt`).
2. Verify zero TypeScript or linting errors.

### Manual Verification via Browser Subagent
1. Launch development server (`npm run dev`) on local port.
2. Verify Homepage:
   - Hero banner renders properly with rating and verdict.
   - Leaderboard ad placeholder displays cleanly.
   - Category filtering works seamlessly.
   - Newsletter subscription form gives visual confirmation.
3. Verify Review Detail Page (`/reviews/jawan` and `/reviews/oppenheimer`):
   - Quick Info Box, Star Rating, and Pros/Cons render properly.
   - In-article ad and sidebar ad slots display as intended.
   - Social share buttons work (copy link toasts confirmation).
   - Inspect DOM to verify `<script type="application/ld+json">` has valid `Review` and `Movie` schema.
4. Verify Mandatory Pages:
   - About, Contact, Privacy Policy, Terms render complete, professional copy.
5. Verify `/ads.txt`, `/sitemap.xml`, and `/robots.txt` route outputs.
