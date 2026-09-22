import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { FileText, ShieldAlert, Copyright, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service - CinePulse",
  description:
    "CinePulse Terms of Service, Fair Use disclaimers, Intellectual Property guidelines, and DMCA takedown procedures.",
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-10 py-6 text-zinc-300 animate-fadeIn">
      {/* Header */}
      <header className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/20 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-wider">
          <FileText className="w-3.5 h-3.5" />
          <span>User Agreement</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Terms of Service
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400">
          Last Updated: September 21, 2026
        </p>
      </header>

      {/* Main Terms Body */}
      <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-white/10 space-y-8 leading-relaxed text-sm sm:text-base">

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            1. Agreement to Terms
          </h2>
          <p className="text-zinc-400">
            By visiting or using CinePulse (<span className="text-white font-medium">https://cinepulse.blog</span>), you agree to comply with and be bound by these Terms of Service. If you disagree with any part of these terms, you are prohibited from utilizing our website or consuming our services.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Copyright className="w-5 h-5 text-amber-500" />
            2. Intellectual Property Rights & Content Ownership
          </h2>
          <p className="text-zinc-400">
            All written critiques, star ratings, editorial analyses, layout designs, and original graphics published on CinePulse are the intellectual property of CinePulse Media, protected under applicable international copyright and trademark laws. You may not republish, scrape, copy, or redistribute our written content without explicit written consent.
          </p>
        </section>

        {/* Fair Use Section */}
        <section className="space-y-3 p-6 rounded-2xl bg-zinc-900/80 border border-white/10">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-red-500" />
            3. Fair Use Doctrine & Movie Media Disclaimer
          </h2>
          <p className="text-zinc-400 text-sm">
            All movie titles, promotional posters, character stills, trailer captures, and studio trademarks featured on CinePulse belong to their respective copyright holders, producers, and distribution entities.
          </p>
          <p className="text-zinc-400 text-sm">
            CinePulse displays these materials strictly under the <strong className="text-zinc-200">Fair Use Doctrine</strong> (U.S. Copyright Act Title 17 § 107 and Section 52 of the Indian Copyright Act, 1957) for the legitimate purposes of news reporting, public criticism, scholarship, and educational cinematic critique.
          </p>
        </section>

        {/* Anti-Piracy Rule */}
        <section className="space-y-3 p-6 rounded-2xl bg-red-950/20 border border-red-500/20">
          <h2 className="text-xl font-bold text-red-400">
            4. Absolute Prohibition of Digital Piracy
          </h2>
          <p className="text-zinc-300 text-sm">
            CinePulse operates under strict ethical guidelines. You acknowledge and agree that:
          </p>
          <ul className="list-disc list-inside space-y-1.5 text-zinc-400 text-sm pl-2">
            <li>CinePulse does not provide torrent links, direct download links, unauthorized video streams, or mirrors for any copyrighted cinema content.</li>
            <li>Users are strictly forbidden from submitting comments, forum discussions, or emails requesting or distributing links to pirated films.</li>
            <li>We actively encourage all readers to support artists and creators by watching films in theatres or via licensed streaming providers (Netflix, Prime Video, Hotstar, etc.).</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">5. Editorial Disclaimers & Subjectivity</h2>
          <p className="text-zinc-400">
            Film reviews and star ratings expressed on CinePulse represent the subjective artistic opinions of our editorial staff. They are intended for recreational commentary and reader guidance. CinePulse is not liable for any discrepancies between a viewer&apos;s personal enjoyment and our published critiques.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">6. DMCA Takedown & Copyright Notice</h2>
          <p className="text-zinc-400">
            If you are a copyright owner or an agent thereof and believe that any content hosted on CinePulse infringes upon your copyrights, you may submit a formal notification pursuant to the Digital Millennium Copyright Act (DMCA) by providing our Designated Agent with the following details in writing:
          </p>
          <ul className="list-disc list-inside space-y-1 text-zinc-400 text-sm pl-2">
            <li>A physical or electronic signature of the authorized copyright holder.</li>
            <li>Identification of the copyrighted work claimed to have been infringed.</li>
            <li>Identification of the material that is claimed to be infringing and its URL location.</li>
            <li>Your contact information (name, address, telephone number, and email address).</li>
          </ul>
          <p className="text-zinc-400 text-sm pt-2">
            Direct all notices to:{" "}
            <a href="mailto:dailystudyhindi@gmail.com" className="text-red-400 underline">
              dailystudyhindi@gmail.com
            </a>{" "}
            with the subject line &quot;DMCA Copyright Notification&quot;.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">7. Governing Law</h2>
          <p className="text-zinc-400">
            These Terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions.
          </p>
        </section>

      </div>
    </div>
  );
}
