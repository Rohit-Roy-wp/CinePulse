"use client";

import React, { useState } from "react";
import { Mail, MessageSquare, Send, CheckCircle2, MapPin, Clock, ShieldCheck } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Editorial Feedback",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setIsSubmitting(true);
      
      const submissionData = new FormData();
      submissionData.append("access_key", "106f1478-e8a6-4bbf-ba50-3f1e1c12fb48");
      submissionData.append("name", formData.name);
      submissionData.append("email", formData.email);
      submissionData.append("subject", formData.subject);
      submissionData.append("message", formData.message);

      try {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          body: submissionData
        });

        const data = await response.json();
        
        if (data.success) {
          setSubmitted(true);
        } else {
          console.error("Form submission failed", data);
          alert("Something went wrong. Please try again.");
        }
      } catch (error) {
        console.error("Error submitting form", error);
        alert("Something went wrong. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12 py-6 animate-fadeIn">
      {/* Page Header */}
      <header className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/20 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-wider">
          <Mail className="w-3.5 h-3.5" />
          <span>Get in Touch</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Contact the CinePulse Desk
        </h1>
        <p className="text-base sm:text-lg text-zinc-400 max-w-xl mx-auto leading-relaxed">
          Have an inquiry, feedback regarding a review, press release, or an advertising proposal? We’d love to hear from you.
        </p>
      </header>

      {/* Main Grid: Form + Info Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Contact Information & Channels (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6">
            <h3 className="text-xl font-bold text-white tracking-tight">
              Direct Communication Channels
            </h3>

            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white/5 border border-white/5">
                <div className="p-2 rounded-xl bg-red-600/20 text-red-500 shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block">
                    Editorial Desk
                  </span>
                  <a
                    href="mailto:dailystudyhindi@gmail.com"
                    className="text-white font-medium hover:text-red-400 transition-colors"
                  >
                    dailystudyhindi@gmail.com
                  </a>
                  <p className="text-[11px] text-zinc-500 mt-0.5">
                    Review feedback & story tips
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white/5 border border-white/5">
                <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 shrink-0">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block">
                    Press & Screenings
                  </span>
                  <a
                    href="mailto:dailystudyhindi@gmail.com"
                    className="text-white font-medium hover:text-amber-400 transition-colors"
                  >
                    dailystudyhindi@gmail.com
                  </a>
                  <p className="text-[11px] text-zinc-500 mt-0.5">
                    Preview screenings & talent interviews
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white/5 border border-white/5">
                <div className="p-2 rounded-xl bg-blue-500/20 text-blue-400 shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block">
                    Advertising & Partnerships
                  </span>
                  <a
                    href="mailto:dailystudyhindi@gmail.com"
                    className="text-white font-medium hover:text-blue-400 transition-colors"
                  >
                    dailystudyhindi@gmail.com
                  </a>
                  <p className="text-[11px] text-zinc-500 mt-0.5">
                    Ad placements & sponsored content
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 space-y-2 text-xs text-zinc-400">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-zinc-500" />
                <span>Response Time: Typically within 24-48 business hours</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-zinc-500" />
                <span>Operating remotely across Mumbai & New Delhi, India</span>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form (7 cols) */}
        <div className="lg:col-span-7">
          <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-white/10 relative">
            {submitted ? (
              <div className="py-16 text-center space-y-4 animate-fadeIn">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white">Message Dispatched!</h3>
                <p className="text-sm text-zinc-400 max-w-sm mx-auto leading-relaxed">
                  Thank you for contacting CinePulse. Our editorial team will review your message and reply as soon as possible.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      name: "",
                      email: "",
                      subject: "Editorial Feedback",
                      message: "",
                    });
                  }}
                  className="mt-4 px-5 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="text-xl font-bold text-white tracking-tight mb-2">
                  Send Us an Electronic Dispatch
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-zinc-300">
                      Your Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-red-500 transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-zinc-300">
                      Your Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. rahul@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-red-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-300">
                    Subject / Category
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white text-sm focus:outline-none focus:border-red-500 transition-colors cursor-pointer"
                  >
                    <option value="Editorial Feedback" className="bg-zinc-900 text-white">Editorial Feedback & Corrections</option>
                    <option value="Review Screening Invitation" className="bg-zinc-900 text-white">Review Screening / Screener Link</option>
                    <option value="Advertising & AdSense Inquiry" className="bg-zinc-900 text-white">Advertising & Sponsorship Inquiry</option>
                    <option value="DMCA / Copyright Inquiry" className="bg-zinc-900 text-white">DMCA / Copyright Inquiries</option>
                    <option value="General Question" className="bg-zinc-900 text-white">General Inquiry</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-300">
                    Your Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Tell us about your query, proposal, or thoughts on our movie coverage..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-red-500 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-xl bg-red-600 hover:bg-red-500 text-white text-sm font-bold shadow-xl shadow-red-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-101 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                  {isSubmitting ? "Transmitting..." : "Transmit Message"}
                </button>

                <p className="text-[11px] text-zinc-500 text-center">
                  We respect your privacy. Your contact details will never be sold or shared.
                </p>
              </form>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
