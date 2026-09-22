import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Lock, Eye, FileText, Globe } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy - CinePulse",
  description:
    "CinePulse Privacy Policy detailing data collection, cookie usage, Google AdSense compliance, and user rights.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-10 py-6 text-zinc-300 animate-fadeIn">
      {/* Header */}
      <header className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/20 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-wider">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Legal & Compliance</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400">
          Last Updated & Effective Date: September 21, 2026
        </p>
      </header>

      {/* Main Legal Content */}
      <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-white/10 space-y-8 leading-relaxed text-sm sm:text-base">

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Globe className="w-5 h-5 text-red-500" />
            1. Introduction & Overview
          </h2>
          <p className="text-zinc-400">
            Welcome to CinePulse (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;), accessible via{" "}
            <span className="text-white font-medium">https://cinepulse.blog</span>. We are deeply committed to protecting your personal data and your right to privacy. This Privacy Policy outlines how we collect, process, and safeguard information when you browse our film critiques, articles, and entertainment blogs.
          </p>
          <p className="text-zinc-400">
            By accessing CinePulse, you signify your agreement to the terms outlined in this Privacy Policy. If you disagree with any segment of this policy, please discontinue use of the website immediately.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Lock className="w-5 h-5 text-amber-500" />
            2. Information We Collect
          </h2>
          <div className="space-y-2 text-zinc-400">
            <p>
              <strong className="text-white">Log Files:</strong> Like most standard web servers, CinePulse uses log files. These files log visitors when they visit websites. Information collected includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date/time stamp, referring/exit pages, and number of clicks. These are not linked to personally identifiable information and are used solely to analyze trends, administer the site, and gather broad demographic data.
            </p>
            <p>
              <strong className="text-white">Voluntary User Input:</strong> When you subscribe to our newsletter or submit our contact form, we collect your name, email address, and message content to deliver requested services and responses.
            </p>
          </div>
        </section>

        {/* Mandatory Google AdSense Clause */}
        <section className="space-y-4 p-6 rounded-2xl bg-zinc-900/80 border border-red-500/20">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Eye className="w-5 h-5 text-red-500" />
            3. Google AdSense & Third-Party Advertising
          </h2>
          <div className="space-y-3 text-zinc-400 text-sm">
            <p>
              CinePulse partners with third-party vendors, including <strong className="text-white">Google AdSense</strong>, to serve advertisements on our web pages. Please review the following crucial disclosures:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li>
                <strong className="text-zinc-200">DoubleClick DART Cookie:</strong> Google, as a third-party vendor, uses cookies to serve ads on CinePulse based on your prior visits to our site and other websites across the Internet.
              </li>
              <li>
                Google&apos;s use of advertising cookies enables it and its partners to serve targeted ads based on your visit to CinePulse and/or other sites on the World Wide Web.
              </li>
              <li>
                <strong className="text-zinc-200">Opting Out:</strong> You may opt out of personalized advertising by visiting Google&apos;s Ads Settings at{" "}
                <a
                  href="https://www.google.com/settings/ads"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-400 underline hover:text-red-300"
                >
                  https://www.google.com/settings/ads
                </a>{" "}
                or alternatively through the Network Advertising Initiative opt-out page at{" "}
                <a
                  href="https://www.aboutads.info"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-400 underline hover:text-red-300"
                >
                  www.aboutads.info
                </a>.
              </li>
            </ul>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-500" />
            4. Cookies & Web Beacons
          </h2>
          <p className="text-zinc-400">
            CinePulse uses &quot;Cookies&quot; to store information regarding visitors&apos; preferences, and to record user-specific information on which pages the visitor accesses. The information is used to optimize user experience by customizing our web page content based on browser types and other analytics data.
          </p>
          <p className="text-zinc-400">
            You can choose to disable cookies through your individual browser options. Detailed information about cookie management with specific web browsers can be found at the browsers&apos; respective official websites.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">5. GDPR & CCPA Data Privacy Rights</h2>
          <p className="text-zinc-400">
            Under data protection regulations (including GDPR and CCPA), you are entitled to the following rights:
          </p>
          <ul className="list-disc list-inside space-y-1.5 text-zinc-400 pl-2">
            <li>The right to access and request copies of your personal data.</li>
            <li>The right to rectification of inaccurate or incomplete information.</li>
            <li>The right to erasure of your personal data under certain conditions.</li>
            <li>The right to restrict or object to the processing of your data.</li>
            <li>The right to data portability.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">6. Children&apos;s Information</h2>
          <p className="text-zinc-400">
            Protecting children while using the internet is paramount to us. CinePulse does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately, and we will do our best efforts to promptly remove such records from our databases.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">7. Contact Regarding Privacy Inquiries</h2>
          <p className="text-zinc-400">
            If you have additional questions or require more information about our Privacy Policy, do not hesitate to reach our Data Protection team via email at{" "}
            <a href="mailto:dailystudyhindi@gmail.com" className="text-red-400 underline">
              dailystudyhindi@gmail.com
            </a>{" "}
            or submit an inquiry via our{" "}
            <Link href="/contact" className="text-red-400 underline">
              Contact Page
            </Link>
            .
          </p>
        </section>

      </div>
    </div>
  );
}
