import React from "react";
import Link from "next/link";
import { Film, ShieldCheck, Heart, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#07080b] border-t border-white/10 text-zinc-400 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center text-white shadow-lg shadow-red-600/30">
                <Film className="w-5 h-5" />
              </div>
              <span className="text-2xl font-black tracking-tight text-white">
                CINE<span className="text-red-500">PULSE</span>
              </span>
            </Link>
            <p className="text-sm text-zinc-400 leading-relaxed max-w-sm">
              CinePulse is India’s dedicated movie review portal and entertainment journal. We provide unapologetically honest critiques, star ratings, and industry insights across Bollywood, Hollywood, and OTT streaming platforms.
            </p>
            <div className="flex items-center gap-2 text-xs text-zinc-500 pt-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>100% Independent Editorial Integrity • No Paid Ratings</span>
            </div>
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

        {/* Anti-Piracy & Fair Use Disclaimer */}
        <div className="mt-12 pt-8 border-t border-white/5">
          <div className="bg-zinc-900/60 rounded-xl p-4 border border-white/5 text-xs text-zinc-400 leading-relaxed space-y-2">
            <p>
              <strong className="text-zinc-300">Strict Anti-Piracy Policy:</strong> CinePulse is strictly against digital piracy. We do not host, store, or provide download links or streaming URLs for copyrighted movies or series. We encourage our readers to watch films exclusively through licensed movie theatres and authorized OTT services (e.g. Netflix, Amazon Prime Video, Disney+ Hotstar, JioCinema).
            </p>
            <p className="text-zinc-400">
              <strong>Fair Use Disclaimer:</strong> All movie posters, screenshots, and character likenesses displayed on this website are properties of their respective production studios and distributors, utilized solely for commentary, educational criticism, and editorial review purposes under the Fair Use doctrine.
            </p>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
            <p>© {new Date().getFullYear()} CinePulse Media. All rights reserved.</p>
            <p className="flex items-center gap-1.5">
              Crafted with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> for cinema enthusiasts
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
}
