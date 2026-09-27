import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return dateString;
  }
}

export function calculateReadingTime(text: string): string {
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

export function parseReleaseDate(str?: string): number {
  if (!str) return 0;
  // Clean up season indicators, brackets e.g. "(S1)", "(Season 1)" and take first release if multiple
  const cleaned = str.split("/")[0].replace(/\(.*?\)/g, "").trim();
  const timestamp = Date.parse(cleaned);
  if (!isNaN(timestamp)) {
    return timestamp;
  }
  // Fallback: extract 4-digit year (e.g. "2026", "2015")
  const yearMatch = str.match(/\b(19\d{2}|20\d{2})\b/);
  if (yearMatch) {
    return new Date(`${yearMatch[1]}-01-01`).getTime();
  }
  return 0;
}

