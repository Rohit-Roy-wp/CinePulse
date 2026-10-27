# Technical Architecture — CinePulse

**Framework:** Next.js 16.3.5 (Turbopack, App Router)  
**Language:** TypeScript 5+  
**Styling Engine:** Tailwind CSS v4 (`@theme inline`)  
**Data Layer:** Markdown/MDX with `gray-matter`  
**Deployment Platform:** Vercel / Edge Ready

---

## 1. High-Level Architecture

CinePulse follows a Hybrid Static Generation (SSG) with Incremental Static Regeneration (ISR) architecture. All film reviews, category pages, and home views are pre-rendered at build time into pure HTML/CSS, with an hourly background revalidation cycle (`revalidate = 3600`).

```
  ┌─────────────────────────────────────────────────────────────┐
  │                 content/reviews/*.mdx                       │
  │     (Frontmatter + Markdown Content for 50+ Films)          │
  └──────────────────────────────┬──────────────────────────────┘
                                 │
                                 ▼
  ┌─────────────────────────────────────────────────────────────┐
  │                  src/lib/reviews.ts                         │
  │     (gray-matter parser, sorting, filtering, metrics)       │
  └──────────────────────────────┬──────────────────────────────┘
                                 │
                 ┌───────────────┴───────────────┐
                 ▼                               ▼
  ┌─────────────────────────────┐ ┌─────────────────────────────┐
  │   Server Components (RSC)   │ │   Client Components ("use") │
  │   - layout.tsx (Root Layout)│ │   - ReviewFilterGrid.tsx    │
  │   - page.tsx (Home Spotlight│ │   - SearchModal.tsx         │
  │   - reviews/[slug]/page.tsx │ │   - NewsletterBox.tsx       │
  │   - category/[slug]/page.tsx│ │   - CookieConsent.tsx       │
  │   - terms/page.tsx          │ │   - Navbar.tsx (Mobile Menu)│
  │   - about/page.tsx          │ └─────────────────────────────┘
  └─────────────────────────────┘
```

---

## 2. Directory Structure Map

```
CinePulse/
├── content/
│   └── reviews/               # MDX review files with YAML frontmatter
│       ├── udta-teer.mdx
│       ├── the-beekeeper.mdx
│       └── ... (50+ critique files)
├── docs/                      # Architectural & design documentation
│   ├── ARCHITECTURE.md
│   ├── DESIGN.md
│   ├── MEMORY.md
│   ├── PRD.md
│   ├── RULES.md
│   └── TASK.md
├── public/                    # Static assets, posters, og-images
│   ├── images/reviews/
│   ├── favicon.ico
│   └── ads.txt
├── src/
│   ├── app/                   # App Router hierarchy
│   │   ├── layout.tsx         # Root layout with 1680px wide container & AdSlot
│   │   ├── page.tsx           # Home page with Hero spotlight & 4-col trending
│   │   ├── loading.tsx        # Zero-CLS skeleton loader
│   │   ├── globals.css        # Global cinema theme tokens & prose typography
│   │   ├── about/page.tsx     # Editorial mission & staff manifesto
│   │   ├── contact/page.tsx   # Screening invites & inquiries form
│   │   ├── terms/page.tsx     # Terms of service & DMCA compliance
│   │   ├── privacy-policy/    # Privacy policy & AdSense disclosure
│   │   ├── category/[slug]/   # Dynamic category archive routes
│   │   ├── reviews/[slug]/    # Dynamic individual film review routes
│   │   ├── sitemap.ts         # Automated XML sitemap generator
│   │   └── robots.ts          # Search engine crawler directives
│   ├── components/
│   │   ├── ads/
│   │   │   └── AdSlot.tsx     # Responsive zero-layout-shift AdSense container
│   │   ├── common/
│   │   │   ├── CookieConsent.tsx # GDPR/ePrivacy compliant banner
│   │   │   └── SearchModal.tsx   # Global instantaneous search modal
│   │   ├── layout/
│   │   │   ├── Navbar.tsx     # Top sticky nav with 1680px canvas
│   │   │   ├── Footer.tsx     # 5-column editorial footer
│   │   │   └── SiteHeader.tsx # Header state wrapper
│   │   ├── reviews/
│   │   │   ├── ReviewCard.tsx # 4-column responsive critique card
│   │   │   ├── ReviewFilterGrid.tsx # Category filter, search, & sort
│   │   │   ├── QuickInfoBox.tsx # Film metadata, verdict, & rating meter
│   │   │   ├── ProsConsBox.tsx  # Editorial strengths & shortcomings
│   │   │   ├── ReviewContent.tsx# Custom MDX parser & typography
│   │   │   ├── RatingStars.tsx  # Star visualization component
│   │   │   └── SocialShare.tsx  # Native social sharing & link copying
│   │   └── seo/
│   │       └── JsonLd.tsx     # Schema.org Movie & Review structured data
│   └── lib/
│       ├── reviews.ts         # Content filesystem reader & query methods
│       ├── types.ts           # TypeScript interfaces (ReviewPost, Frontmatter)
│       └── utils.ts           # Date formatters, reading time, parsers
```

---

## 3. Data Flow & Processing Pipeline

1. **Storage:** Each film review is stored as an `.mdx` file inside `content/reviews/`.
2. **Schema Validation:** Frontmatter fields include:
   - `title`, `description`, `date`, `rating` (0-10), `verdict`
   - `director`, `cast`, `runtime`, `releaseDate`, `platform`, `boxOfficeOrBudget`
   - `category`, `genre`, `image`, `backdrop`, `scoreBreakdown`
   - `pros`, `cons`, `featured`, `trending`
3. **Build Execution:** During `next build`:
   - `generateStaticParams()` evaluates all slug possibilities.
   - 68+ routes are statically exported with zero runtime server latency.
   - ISR revalidation headers ensure automatic fresh content without rebuilding the entire project.

---

## 4. Hydration & Third-Party Extension Tolerance

### The Extension Injection Challenge
Modern browser extensions (password managers, form autofill tools like 1Password, Bitwarden, LastPass, Dashlane) immediately inject custom attributes (e.g., `fdprocessedid="xxxx"`) into DOM elements upon page load. In React 19 / Next.js 16, this previously triggered hydration mismatch warnings.

### Architectural Solution
- All interactive `<button>`, `<input>`, `<select>`, and `<textarea>` elements across all client components are configured with explicit `type` attributes and **`suppressHydrationWarning`**.
- The root `<html>` and `<body>` tags in `layout.tsx` both declare `suppressHydrationWarning`.
- This decouples third-party DOM modifications from React's internal fiber reconciliation, completely silencing spurious console warnings.

---

## 5. SEO & Structured Data Architecture

- **Schema.org Movie & Review Entity:** Each review route emits an inline `<script type="application/ld+json">` containing complete Schema.org annotations:
  - `@type: "Review"`
  - `itemReviewed: { @type: "Movie", name, director, actor, image }`
  - `reviewRating: { @type: "Rating", ratingValue, bestRating: 10 }`
  - `author: { @type: "Person", name }`
  - `publisher: { @type: "Organization", name: "CinePulse" }`
- **Canonical URLs:** Every dynamic route enforces an absolute canonical tag to prevent duplicate content penalties.
- **Automated Sitemap:** `src/app/sitemap.ts` dynamically indexes every published critique, category, and legal page.
