# Project Memory & Operational Context — CinePulse

This document stores persistent historical context, key architectural decisions, resolved bugs, and domain-specific knowledge for the CinePulse repository.

---

## 1. Project Identity & Context

- **Repository:** CinePulse (The Cineverse)
- **Primary Domain:** [https://thecineverse.online](https://thecineverse.online)
- **Local Workspace Path:** `d:\Code\antigravityProject\CinePulse`
- **Core Technology Stack:** Next.js 16.3.5 (Turbopack, App Router, React 19, TypeScript), Tailwind CSS v4 (`@theme inline`), `gray-matter` for MDX.

---

## 2. Critical Operating Constraints & Decision Log

### Decision 1: Strict Manual Git Push Policy
- **Rule:** Never execute `git push` autonomously.
- **Context:** The user explicitly requires reviewing all code changes locally first before manually pushing to the remote git branch.
- **Protocol:** Ensure all working tree modifications compile cleanly with `npm run build`, check `git status`, and inform the user that changes are staged locally for their review.

---

### Decision 2: Resolution of `fdprocessedid` Hydration Collision
- **Problem:** When opening pages in Chrome/Edge with password managers or autofill extensions (1Password, Bitwarden, LastPass, Dashlane, Chrome Form Autofill) installed, React 19 threw console warnings:
  `A tree hydrated but some attributes of the server rendered HTML didn't match the client properties: - fdprocessedid="..."`.
- **Root Cause:** Third-party browser extension content scripts modify `<button>` and `<input>` DOM nodes before React completes client-side hydration.
- **Permanent Solution:**
  1. Add `type="button"` to all non-submitting buttons.
  2. Add `suppressHydrationWarning` to all `<button>`, `<input>`, `<select>`, `<textarea>`, and `<form>` elements across all client components.
  3. Add `suppressHydrationWarning` to `<html>` and `<body>` in `src/app/layout.tsx`.

---

### Decision 3: The 1680px Widescreen Canvas Overhaul
- **Problem:** The original layout was constrained to `max-w-7xl` (1280px). On modern 1080p and 1440p desktop displays (1920px+ wide), this resulted in over **350px of completely empty black dead space on both the left and right sides**, making the website look like a narrow, boxed AI template.
- **Solution:**
  1. Expanded `layout.tsx`, `Navbar.tsx`, and `Footer.tsx` containers from `max-w-7xl` to **`max-w-[1680px]`** with `px-4 sm:px-6 lg:px-10 xl:px-12`.
  2. Increased Hero Spotlight banner height (`min-h-[460px] lg:min-h-[600px] xl:min-h-[640px]`) for an immersive IMAX look.
  3. Upgraded review card grids from 3 columns to **4 columns** (`xl:grid-cols-4`), matching the desktop density of *Letterboxd* and *Rotten Tomatoes*.
  4. Synchronized `loading.tsx` to render 8 skeleton cards across 4 columns during route transitions.

---

### Decision 4: Exorcism of 30 AI-Generated Tells
- **Context:** To ensure credibility with both users and Google AdSense human reviewers, the interface was audited and stripped of common AI styling artifacts:
  - Eliminated frosted blur glassmorphism in favor of solid matte `#12151f` / `bg-zinc-900` surfaces.
  - Eliminated all ambient `blur-3xl` radial orbs.
  - Replaced purple badges with prestigious warm gold/amber tones.
  - Replaced all `Sparkles` icons with contextual cinema icons (`Film`, `Clapperboard`, `Mail`, `Tv`).
  - Removed jarring hover jumps (`hover:scale-102` / `group-hover:translate-x-0.5`).
  - Replaced checkmark icons in pros/cons boxes with clean editorial `+` and `–` markers.
  - Removed fake social proof claims in favor of authentic publication copy.

---

### Decision 5: Mobile Score Card Overflow Fix
- **Problem:** On smaller smartphone screens (< 380px width), the *"Overall The Cineverse Score"* score card previously overflowed horizontal boundaries.
- **Solution:** Refactored the score card in `src/components/reviews/QuickInfoBox.tsx` into a responsive flex layout with truncation protection, flexible wraps, and scaled star rating units.

---

### Decision 6: Automated Festival Greetings & Cinema Aesthetics Overhaul
- **Context:** User requested an automated, year-round festive greeting system to wish readers on major Indian and global festivals (Diwali, New Year, Republic Day, Holi, Eid, Independence Day, Christmas).
- **Design Iteration (3/10 to 9/10):**
  - *Initial V1 (Rated 3/10):* Used a left-aligned strip with an e-commerce-style rectangular button (*"Festive Watchlist $\rightarrow$"*), which looked like a cramped SaaS/cookie notification banner and clashed with the cinematic hero section.
  - *Refactored V2 (Rated 9/10):* Completely stripped out the corporate utility button. Switched to a strictly centered, atmospheric cinema aesthetic with deep obsidian background (`#06070a`), subtle amber/gold hairline border, and warm radial glow. Positioned the close `(X)` button absolute-right to preserve perfect mathematical center alignment.
- **Automation Engine:** Built `src/lib/festivals.ts` to automatically detect date ranges and year-rollover (e.g. Dec 30 – Jan 02) without requiring manual code changes for future festivals.
- **Hydration & Persistence:** Integrated with `localStorage` (`cineverse_festive_dismissed_{id}`) and React 19 mounted guard to guarantee zero hydration mismatch errors.

---

## 3. Essential Commands Reference

```powershell
# Start local development server (Turbopack)
npm run dev

# Full production build verification (SSG + Type Checking)
npm run build

# Check local working directory state (do not push)
git status -s
```
