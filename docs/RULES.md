# Development Rules & Coding Standards — CinePulse

This document establishes the mandatory engineering and design rules for all developers and AI agents working on CinePulse.

---

## 1. Absolute Git Workflow Rule

> [!CAUTION]
> **NEVER PUSH TO GIT DIRECTLY (`git push` IS STRICTLY FORBIDDEN):**  
> All code changes must remain strictly in the local working directory. The user reviews changes locally and executes `git push` manually. Never run `git push` or write automated scripts that push to the remote repository.

---

## 2. Next.js 16 & Turbopack Rules

- **Refer to Agent Conventions:** Next.js 16 contains breaking changes and conventions. Always check `node_modules/next/dist/docs/` before adopting deprecated patterns.
- **Dynamic Route Params:** In Next.js 16, route parameters in Page components and `generateMetadata` are asynchronous Promises (`params: Promise<{ slug: string }>`). Always `await params`.
- **SSG & ISR Configuration:** Review pages and categories must export `revalidate = 3600` and implement `generateStaticParams()` for high-speed edge serving.
- **Strict Build Verification:** Always run `npm run build` after any modifications to ensure zero TypeScript or Turbopack compilation errors.

---

## 3. Hydration & Third-Party Extension Rules

Browser extensions (password managers, form autofill tools) inject attributes (`fdprocessedid`, `data-lastpass`, etc.) into HTML form elements before React finishes hydration:

1. **Every Interactive `<button>` Must Have:**
   - Explicit `type="button"` (or `type="submit"`)
   - `suppressHydrationWarning`
   - Example:
     ```tsx
     <button type="button" suppressHydrationWarning onClick={handleClick} className="...">
     ```
2. **Every `<input>`, `<select>`, and `<textarea>` Must Have:**
   - `suppressHydrationWarning`
3. **Every `<form>` Must Have:**
   - `suppressHydrationWarning`

---

## 4. Design & Aesthetics Rules (Zero AI-Tells Checklist)

Always adhere to the cinema editorial aesthetic and verify against these 30 prohibited patterns:

1. **No Harsh Gradients:** Do not use multi-color gradient text (`bg-gradient-to-r from-red-500 to-amber-400`) or progress bar gradients. Use solid, refined colors.
2. **No Pure White Backgrounds:** Base theme is deep obsidian `#090a0f`.
3. **No Rainbow Colors:** Do not mix blue, emerald, purple, and amber in the same component. Adhere strictly to Crimson (`#e50914`), Gold (`#f59e0b`), and Zinc (`#71717a`).
4. **No Heavy Drop Shadows:** Prohibit `shadow-red-600/40` or heavy colored glows. Use crisp 1px borders (`border-zinc-800`).
5. **No Liquid Glassmorphism:** Prohibit `backdrop-filter: blur(12px)` frosted glass on cards. Use solid matte surfaces (`#12151f`, `bg-zinc-900`).
6. **No Purple & Black Color Schemes:** Verdicts and badges must never use purple.
7. **No Radial Blur Orbs:** Prohibit `w-96 h-96 bg-red-600/10 blur-3xl` ambient orbs in the background.
8. **No Neon Colors:** Use natural film crimson (`#e50914`) instead of neon shades.
9. **No Washed-out Pastel Colors:** Maintain crisp, high-contrast dark cinema palettes.
10. **No Default Generic Lucide Icons:** Use contextual film icons (`Film`, `Clapperboard`, `Mail`, `Plus`, `Minus`).
11. **No Emojis as UI Icons:** Prohibit emojis in navigation, headers, or buttons.
12. **No Generic Font Typography:** Use curated system font stack with tight tracking and custom line heights.
13. **No Sparkle Icons (`Sparkles`):** Never use `Sparkles` as a decoration on reviews or buttons.
14. **No Animated Jumping Arrows:** Prohibit `group-hover:translate-x-0.5`. Use stable link colors.
15. **No Hover Scale Bounces:** Prohibit `hover:scale-102` or `scale-105` on standard buttons or cards.
16. **No 3-Feature Card Rows:** Use cohesive editorial charters or manifestos instead of generic SaaS cards.
17. **No Colored Left Stripes:** Prohibit `border-l-4 border-red-600` on article headings. Use bottom dividers or typography.
18. **No Bento Grids:** Use clean, structured 4-column review grids.
19. **No Terminal Window Mockups:** Never place mock code terminal blocks on an entertainment site.
20. **No Pricing Tiers:** CinePulse is 100% free; no subscription tier cards.
21. **No Oversized Bubble Corners:** Use refined `rounded-xl` / `rounded-2xl`, not `rounded-3xl` bubble radius.
22. **No Dot Grid Patterns:** Background must remain clean and immersive.
23. **No Excessive AI Em-Dashes:** Use standard hyphens or colons for editorial clarity.
24. **No "It's not X, it's Y" Copy:** Write authoritative, direct film criticism.
25. **No Checkmark Bullet Lists:** In pros/cons, use editorial `+` and `–` symbols instead of green/red checkmark icons.
26. **No Fake Social Proof / Numbers:** Never fabricate claims like "Join 25,000+ lovers".
27. **Real Movie Critiques Only:** Maintain rich metadata, real cast details, and deep editorial analysis.
28. **Maintain Skeleton Loaders:** Ensure `src/app/loading.tsx` is updated whenever grid structures change.
29. **Maintain Terms of Service:** Keep Fair Use, DMCA, and Anti-Piracy guidelines updated at `/terms`.
30. **Maintain Privacy Policy:** Keep AdSense disclosure and cookie privacy policies updated at `/privacy-policy`.

---

## 5. SEO & Semantic HTML Rules

- **Single `<h1>` Per Page:** Every route must declare exactly one descriptive `<h1>`.
- **Descriptive Meta Titles & Descriptions:** Follow the format: `{Movie Title} Review: {Subtitle} | CinePulse`.
- **Image Optimization:**
  - Always use `next/image` with explicit `alt` text.
  - Define accurate `sizes` attributes (e.g. `(max-width: 1680px) 100vw, 1680px`).
  - Set `priority` on the main hero spotlight image.
- **Schema.org Structured Data:** Keep `JsonLd.tsx` synchronized with the movie schema specifications.
