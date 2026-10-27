# Product Requirements Document (PRD) — CinePulse (The Cineverse)

**Project Name:** CinePulse (The Cineverse)  
**Status:** Live & Production Ready  
**URL:** [https://thecineverse.online](https://thecineverse.online)  
**Primary Domain / Brand:** CinePulse / The Cineverse  
**Target Audience:** Cinephiles, moviegoers, OTT streaming subscribers, and entertainment enthusiasts seeking honest, analytical, spoiler-free film criticism.

---

## 1. Executive Summary & Vision

CinePulse is an independent, high-performance cinema editorial publication and film review portal. Unlike generic entertainment blogs or AI-generated aggregators, CinePulse focuses on deep, authentic, human-crafted film criticism covering Bollywood, Hollywood, South Indian cinema, Web Series, and Anime.

The platform is designed to emulate prestigious cinema publication standards (such as *RogerEbert.com*, *Variety*, *Letterboxd*, and *The Criterion Collection*) while maximizing SEO discoverability and AdSense monetization efficiency.

---

## 2. Target Audience & User Personas

1. **The Weekend Moviegoer:**
   - Needs quick, reliable verdicts (Masterpiece, Must Watch, One-Time Watch, Skip).
   - Looks for runtime, where-to-watch platforms, and lead cast information.
2. **The OTT Binge-Watcher:**
   - Seeks quality web series recommendations across Netflix, Prime Video, Disney+ Hotstar, and JioCinema.
3. **The Cinema Purist:**
   - Values deep analytical breakdowns: direction, narrative pacing, screenplay craft, cinematography, sound design, and acting nuance.

---

## 3. Core Features & Capabilities

### 3.1 Content & Review Engine
- **MDX-Driven Publishing Pipeline:** Static MDX review files with structured frontmatter parsed via `gray-matter`.
- **10-Point Score Meter:** Detailed rating system with category breakdowns:
  - Story & Screenplay (out of 10)
  - Acting & Performances (out of 10)
  - Direction & Pacing (out of 10)
  - Music, Sound & VFX (out of 10)
- **Standardized Editorial Verdicts:**
  - *Masterpiece* (9.0 – 10.0)
  - *Blockbuster / Must Watch* (7.0 – 8.9)
  - *One-Time Watch* (5.0 – 6.9)
  - *Skip / Below Average* (< 5.0)
- **Quick Info Box:** Displays poster thumbnail, director, runtime, release date, platform, box office/milestone, and lead cast.
- **Editorial Strengths & Shortcomings:** Clean, minimalist `+` and `–` breakdown for balanced criticism.

### 3.2 Discovery & Navigation
- **Interactive Multi-Filter Grid:** Real-time client-side filtering by category (`All`, `Bollywood`, `Hollywood`, `Web Series`, `South Cinema`, `Anime`) with instantaneous keyword search and sorting options (Latest, Highest Rated, Release Date Newest/Oldest).
- **Global Search Modal:** Instant modal search matching movie titles, directors, genres, and cast members.
- **Widescreen Responsive Experience:** Built for 1680px widescreen displays down to 320px mobile screens without awkward side gaps.

### 3.3 Monetization & AdSense Integration
- **Zero-Layout-Shift Ad Slots:**
  - Header Leaderboard Ad (728x90 desktop / 320x50 mobile)
  - In-Feed Banner Ads (between trending strips and review grids)
  - In-Article Banner Ads (inside markdown content flow)
  - Sticky Sidebar Display Ads (300x250 / 300x600 in review article view)
- **Compliance Architecture:** Compliant with Google AdSense Publisher Policies, Webmaster Quality Guidelines, and GDPR/CCPA cookie consent standards.

### 3.4 Trust & Legal Architecture
- **Complete Legal Transparency:** Dedicated pages for [About Us](/about), [Contact & Screening Inquiries](/contact), [Privacy Policy](/privacy-policy), and [Terms of Service](/terms).
- **Strict Anti-Piracy Policy:** Uncompromising opposition to unauthorized downloads, mirrors, or stream piracy; directs readers strictly to licensed theaters and OTT platforms.
- **Fair Use Compliance:** Legal attribution and doctrine disclaimers for promotional movie stills and posters under U.S. Title 17 § 107 and Indian Copyright Act Section 52.

---

## 4. Non-Functional Requirements

| Metric | Target Requirement |
|---|---|
| **Build System** | Next.js 16 with Turbopack, App Router, full SSG with ISR (`revalidate = 3600`) |
| **SEO Score** | 100/100 Lighthouse SEO with complete Schema.org `Movie` and `Review` JSON-LD |
| **Performance** | Core Web Vitals (LCP < 1.8s, CLS < 0.05, FID/INP < 100ms) |
| **Accessibility** | Semantic HTML5 elements (`<article>`, `<section>`, `<nav>`, `<header>`), ARIA labels |
| **Hydration Tolerance** | Zero console hydration mismatch errors even when third-party autofill or password manager extensions inject attributes into DOM elements |
