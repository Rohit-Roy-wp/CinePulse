"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Film, Search, Menu, X, Clapperboard, Flame } from "lucide-react";

interface NavbarProps {
  onSearchOpen?: () => void;
}

export function Navbar({ onSearchOpen }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 glass-nav">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-red-600 to-rose-800 flex items-center justify-center text-white shadow-lg shadow-red-600/30 group-hover:scale-105 transition-transform duration-200">
              <Film className="w-6 h-6 animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black tracking-tight text-white flex items-center gap-1 font-sans">
                CINE<span className="text-red-500">PULSE</span>
              </span>
              <span className="text-[10px] uppercase tracking-widest text-zinc-400 font-semibold -mt-1">
                Honest Film Reviews
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <Link
              href="/"
              className="px-3.5 py-2 text-sm font-medium text-zinc-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
            >
              Home
            </Link>
            <Link
              href="/category/bollywood"
              className="px-3.5 py-2 text-sm font-medium text-zinc-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <Clapperboard className="w-4 h-4 text-red-500" />
              Bollywood
            </Link>
            <Link
              href="/category/hollywood"
              className="px-3.5 py-2 text-sm font-medium text-zinc-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
            >
              Hollywood
            </Link>
            <Link
              href="/category/web-series"
              className="px-3.5 py-2 text-sm font-medium text-zinc-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <Flame className="w-4 h-4 text-amber-500" />
              Web Series
            </Link>
            <Link
              href="/category/south-cinema"
              className="px-3.5 py-2 text-sm font-medium text-zinc-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
            >
              South Cinema
            </Link>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            {onSearchOpen && (
              <button
                onClick={onSearchOpen}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-zinc-800/80 hover:bg-zinc-700/80 text-zinc-300 hover:text-white border border-white/10 text-xs sm:text-sm font-medium transition-all"
                title="Search reviews"
              >
                <Search className="w-4 h-4 text-zinc-400" />
                <span className="hidden sm:inline">Search movies...</span>
              </button>
            )}

            <Link
              href="/about"
              className="hidden lg:inline-flex items-center px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-semibold shadow-md shadow-red-600/20 transition-all hover:scale-102"
            >
              Our Verdicts
            </Link>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/10 space-y-1 animate-fadeIn">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2.5 rounded-lg text-base font-medium text-zinc-300 hover:text-white hover:bg-white/5"
            >
              Home
            </Link>
            <Link
              href="/category/bollywood"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2.5 rounded-lg text-base font-medium text-zinc-300 hover:text-white hover:bg-white/5"
            >
              Bollywood
            </Link>
            <Link
              href="/category/hollywood"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2.5 rounded-lg text-base font-medium text-zinc-300 hover:text-white hover:bg-white/5"
            >
              Hollywood
            </Link>
            <Link
              href="/category/web-series"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2.5 rounded-lg text-base font-medium text-zinc-300 hover:text-white hover:bg-white/5"
            >
              Web Series
            </Link>
            <Link
              href="/category/south-cinema"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2.5 rounded-lg text-base font-medium text-zinc-300 hover:text-white hover:bg-white/5"
            >
              South Cinema
            </Link>
            <div className="pt-2 border-t border-white/10 flex flex-col gap-2 px-4">
              <Link
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm text-zinc-400 hover:text-white"
              >
                About CinePulse
              </Link>
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm text-zinc-400 hover:text-white"
              >
                Contact & Feedback
              </Link>
            </div>
          </div>
        )}

      </div>
    </header>
  );
}
