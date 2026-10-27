import React from "react";
import Link from "next/link";
import { Film, Heart, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#07080b] border-t border-white/10 text-zinc-400 mt-20">
      <div className="max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center text-white">
                <Film className="w-5 h-5" />
              </div>
              <span className="text-2xl font-black tracking-tight text-white">
                CINE<span className="text-red-500"> VERSE</span>
              </span>
            </Link>
            <p className="text-sm text-zinc-400 leading-relaxed max-w-sm">
              The Cineverse is India’s dedicated movie review portal and entertainment journal. We provide unapologetically honest critiques, star ratings, and industry insights across Bollywood, Hollywood, and OTT streaming platforms.
            </p>
          </div>

          {/* Quick Categories */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">
              Categories
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/category/bollywood" className="hover:text-red-400 transition-colors">
                  Bollywood Reviews
                </Link>
              </li>
              <li>
                <Link href="/category/hollywood" className="hover:text-red-400 transition-colors">
                  Hollywood Hits
                </Link>
              </li>
              <li>
                <Link href="/category/web-series" className="hover:text-red-400 transition-colors">
                  Web Series & OTT
                </Link>
              </li>
              <li>
                <Link href="/category/south-cinema" className="hover:text-red-400 transition-colors">
                  South Cinema
                </Link>
              </li>
              <li>
                <Link href="/category/anime" className="hover:text-red-400 transition-colors">
                  Anime Reviews
                </Link>
              </li>
            </ul>
          </div>

          {/* Mandatory AdSense & Legal Pages */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">
              Company & Legal
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Editorial & Inquiries */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">
              Get In Touch
            </h4>
            <p className="text-xs text-zinc-400 mb-3 leading-relaxed">
              For review screening invites, press releases, or advertising opportunities:
            </p>
            <a
              href="mailto:dailystudyhindi@gmail.com"
              className="inline-flex items-center gap-2 text-xs font-medium text-red-400 hover:text-red-300"
            >
              <Mail className="w-3.5 h-3.5" />
              dailystudyhindi@gmail.com
            </a>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
          <p>© {new Date().getFullYear()} The Cineverse Media. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Crafted with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> for cinema enthusiasts
          </p>
        </div>

      </div>
    </footer>
  );
}
