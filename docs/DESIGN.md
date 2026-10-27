# Design System & Aesthetics — CinePulse

**Design Philosophy:** Human-Crafted Cinema Editorial (Analogous to *Letterboxd*, *The Criterion Collection*, and *RogerEbert.com*)  
**Color Palette:** Charcoal & Deep Obsidian with Vivid Film Crimson and Warm Gold  
**Canvas Strategy:** Full 1680px Widescreen Container (Zero awkward desktop side voids)

---

## 1. Design Philosophy: Human Cinema vs AI Template

Most AI-generated web interfaces share common design tells: translucent frosted glassmorphism, floating blur orbs, rainbow badges, sparkle icons, bouncing hover jumps, and narrow 1280px layouts that leave massive black voids on modern monitors.

CinePulse completely eliminates these tropes in favor of an authentic, prestigious cinema publication aesthetic:
- **Solid, Grounded Surfaces:** Dark matte zinc surfaces (`#12151f`, `bg-zinc-900`) with subtle, crisp borders (`border-zinc-800`), avoiding gimmicky liquid glass blurs.
- **Restrained Cinema Palette:** A cohesive, dark visual atmosphere anchored by crimson red accents (`#e50914`) for primary calls-to-action and warm amber gold for star ratings.
- **Content-Dense 4-Column Widescreen:** Expansive 1680px canvas utilizing modern widescreen displays without awkward margins.

---

## 2. Color Tokens & Palette

| Token Name | Hex / Class | Description / Usage |
|---|---|---|
| **Background** | `#090a0f` / `bg-[#090a0f]` | Deepest obsidian black; foundation of the cinema theater room. |
| **Surface Card** | `#12151f` / `bg-zinc-900` | Solid matte dark surface for review cards, sidebars, and panels. |
| **Card Border** | `rgba(255, 255, 255, 0.08)` / `border-zinc-800` | Subtle hairline divider; provides structure without harsh contrast. |
| **Cinema Crimson** | `#e50914` / `bg-red-600` | Primary brand accent for badges, featured buttons, and active tabs. |
| **Rating Gold** | `#f59e0b` / `text-amber-400` | Warm golden amber reserved exclusively for star ratings and award markers. |
| **Subtle Text** | `#a1a1aa` / `text-zinc-400` | Neutral slate for metadata, runtimes, and secondary editorial copy. |
| **Muted Text** | `#71717a` / `text-zinc-500` | Soft charcoal for dates, disclaimers, and timestamps. |

> [!IMPORTANT]
> **No Rainbow Badges & No Purple Gradients:**
> All verdict chips, metadata icons, and author badges adhere strictly to the crimson/amber/zinc palette. Generic rainbow colors (bright blues, purples, neons) are strictly prohibited.

---

## 3. Layout & Widescreen Grid Specification

### 3.1 The 1680px Widescreen Canvas
Standard AI templates cap layouts at `max-w-7xl` (1280px), creating over 640px of dead black margin on a 1920x1080 display. CinePulse utilizes a **`max-w-[1680px]`** canvas across:
- **Header:** Sticky full-width navigation with `px-4 sm:px-6 lg:px-10 xl:px-12`.
- **Hero Spotlight:** Expansive 600px+ height backdrop image with 4K-ready presentation.
- **Leaderboard Slot:** Top advertisement integrated smoothly into the visual hierarchy.
- **Footer:** 5-column editorial footer spanning the full desktop width.

### 3.2 Responsive Review Grid
- **Mobile (< 640px):** 1 Column (`grid-cols-1`)
- **Tablet (640px – 1024px):** 2 Columns (`sm:grid-cols-2`)
- **Laptop (1024px – 1280px):** 3 Columns (`lg:grid-cols-3`)
- **Widescreen Desktop (≥ 1280px):** **4 Columns** (`xl:grid-cols-4 gap-6`)

---

## 4. Typography & Prose Styling

- **Font Stack:** Clean system sans-serif hierarchy:
  `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`
- **Headings (`h1`, `h2`, `h3`):** Tight letter tracking (`tracking-tight`), bold/black weights (`font-black`), pure white color.
- **Section Dividers:** Clean hairline borders (`border-b border-zinc-800`) replacing colored left stripes.
- **Classic Pullquotes:** Subtle left border (`border-l-2 border-zinc-600`), italic typography, slate color, without aggressive colored background fills.

---

## 5. Micro-Interactions & Hover States

- **No Jarring Hover Bounces:** Replaced `hover:scale-102` and `group-hover:scale-105` with calm, elegant color transitions (`transition-colors duration-200`).
- **No Animated Jumping Arrows:** Replaced `group-hover:translate-x-0.5` on buttons and cards with stable link presentation.
- **Zero Heavy Drop Shadows:** Eliminated colored glow effects (`shadow-red-600/40`) in favor of clean 1px borders (`border-zinc-800`) and subtle dark focus shadows.

---

## 6. Component Style Guidelines

### 6.1 Pros & Cons Box
- Replaced generic SaaS green/red checkmark icons (`CheckCircle2` / `XCircle`) with clean editorial **`+`** and **`–`** indicators.
- Solid `bg-zinc-900 border border-zinc-800` cards with uppercase section headers (*"The Strengths"* / *"The Shortcomings"*).

### 6.2 QuickInfo Box
- Displays film metadata (Director, Runtime, Platform, Release Date, Box Office) with unified neutral zinc icons.
- Rating meter displays score out of 10.0 with golden star visualization and verdict badge.

### 6.3 Newsletter Box
- Replaced fake inflated claims (*"Join 25,000+ lovers"*) with genuine editorial invitation (*"Weekly Film Dispatch"*).
- Uses `Mail` icon instead of AI `Sparkles` icon.
