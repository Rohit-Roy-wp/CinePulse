import React from "react";
import { AdSlot } from "../ads/AdSlot";
import { ReviewPost } from "@/lib/types";

interface ReviewContentProps {
  review: ReviewPost;
}

export function ReviewContent({ review }: ReviewContentProps) {
  // Parse markdown into rendered segments with mid-article AdSense placement
  const lines = review.content.split("\n");
  const renderedElements: React.ReactNode[] = [];
  
  let currentList: string[] = [];
  let inList = false;
  let paragraphCount = 0;
  let adInserted = false;

  const flushList = (key: string) => {
    if (inList && currentList.length > 0) {
      renderedElements.push(
        <ul key={key} className="space-y-2 my-4 list-disc list-inside text-zinc-300">
          {currentList.map((item, idx) => (
            <li key={idx} className="leading-relaxed">
              {item}
            </li>
          ))}
        </ul>
      );
      currentList = [];
      inList = false;
    }
  };

  const renderInlineStyles = (text: string) => {
    // Basic inline markdown: bold **text**, italic *text*
    const parts = text.split(/(\*\*.*?\*\*|\*.*?\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={index} className="text-white font-bold">
            {part.slice(2, -2)}
          </strong>
        );
      }
      if (part.startsWith("*") && part.endsWith("*")) {
        return (
          <em key={index} className="text-amber-300 italic">
            {part.slice(1, -1)}
          </em>
        );
      }
      return part;
    });
  };

  lines.forEach((rawLine, index) => {
    const line = rawLine.trim();

    if (!line) {
      flushList(`flush-${index}`);
      return;
    }

    if (line.startsWith("## ")) {
      flushList(`flush-${index}`);
      renderedElements.push(
        <h2
          key={`h2-${index}`}
          className="text-2xl sm:text-3xl font-extrabold text-white mt-10 mb-4 tracking-tight border-l-4 border-red-600 pl-4"
        >
          {line.replace("## ", "")}
        </h2>
      );
      return;
    }

    if (line.startsWith("### ")) {
      flushList(`flush-${index}`);
      renderedElements.push(
        <h3
          key={`h3-${index}`}
          className="text-xl sm:text-2xl font-bold text-zinc-100 mt-8 mb-3"
        >
          {line.replace("### ", "")}
        </h3>
      );
      return;
    }

    if (line.startsWith("---")) {
      flushList(`flush-${index}`);
      renderedElements.push(
        <hr key={`hr-${index}`} className="border-white/10 my-8" />
      );
      return;
    }

    if (line.startsWith("> ")) {
      flushList(`flush-${index}`);
      renderedElements.push(
        <blockquote
          key={`quote-${index}`}
          className="p-4 my-6 rounded-r-xl border-l-4 border-amber-500 bg-amber-500/10 text-amber-200 italic font-medium"
        >
          {line.replace("> ", "")}
        </blockquote>
      );
      return;
    }

    if (line.startsWith("- ")) {
      inList = true;
      currentList.push(line.replace("- ", ""));
      return;
    }

    // Regular Paragraph
    flushList(`flush-${index}`);
    paragraphCount++;

    renderedElements.push(
      <p
        key={`p-${index}`}
        className="text-zinc-300 leading-relaxed text-base sm:text-lg mb-5"
      >
        {renderInlineStyles(line)}
      </p>
    );

    // Insert In-Article Google AdSense slot right after paragraph 3
    if (paragraphCount === 3 && !adInserted) {
      adInserted = true;
      renderedElements.push(
        <AdSlot
          key="in-article-ad"
          type="in-article"
          className="my-10"
        />
      );
    }
  });

  flushList("final-flush");

  return (
    <div className="prose-cinema">
      {renderedElements}

      {/* Score Breakdown Section */}
      {review.scoreBreakdown && (
        <div className="mt-12 p-6 sm:p-8 rounded-2xl glass-panel border border-white/10 bg-zinc-900/90">
          <h3 className="text-xl font-black text-white uppercase tracking-wider mb-6 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
            CinePulse Technical Breakdown
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1 text-zinc-300">
                <span>Story & Screenplay</span>
                <span className="text-amber-400">{review.scoreBreakdown.story}/10</span>
              </div>
              <div className="h-2 rounded-full bg-zinc-800 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-red-600 to-amber-500 rounded-full"
                  style={{ width: `${review.scoreBreakdown.story * 10}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1 text-zinc-300">
                <span>Acting & Performances</span>
                <span className="text-amber-400">{review.scoreBreakdown.acting}/10</span>
              </div>
              <div className="h-2 rounded-full bg-zinc-800 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-red-600 to-amber-500 rounded-full"
                  style={{ width: `${review.scoreBreakdown.acting * 10}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1 text-zinc-300">
                <span>Direction & Pacing</span>
                <span className="text-amber-400">{review.scoreBreakdown.direction}/10</span>
              </div>
              <div className="h-2 rounded-full bg-zinc-800 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-red-600 to-amber-500 rounded-full"
                  style={{ width: `${review.scoreBreakdown.direction * 10}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1 text-zinc-300">
                <span>Music, Sound & VFX</span>
                <span className="text-amber-400">{review.scoreBreakdown.musicVfx}/10</span>
              </div>
              <div className="h-2 rounded-full bg-zinc-800 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-red-600 to-amber-500 rounded-full"
                  style={{ width: `${review.scoreBreakdown.musicVfx * 10}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
