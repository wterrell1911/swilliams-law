"use client"

import Link from "next/link"
import { Button } from "@/components/ui/Button"

export default function StartPage() {
  return (
    <div className="min-h-screen bg-navy-950 text-warmWhite">
      {/* Print styles */}
      <style jsx global>{`
        @media print {
          body { 
            background: white !important; 
            color: black !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .no-print { display: none !important; }
          .print-break { page-break-before: always; }
          .print-bg { background: #0a1628 !important; color: white !important; }
        }
      `}</style>

      {/* PAGE 1: The Problem & Solution */}
      <section className="min-h-screen px-6 py-12 flex flex-col justify-center print-bg">
        <div className="max-w-3xl mx-auto">
          {/* Logo */}
          <div className="text-center mb-8">
            {/* TODO: Phase 3 — read firm name from firmConfig */}
            <span className="text-2xl font-display font-bold text-gold-500">Law Firm</span>
            <span className="text-2xl font-display font-bold text-warmWhite ml-1">Template</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl font-display font-bold text-center mb-6 leading-tight">
            Your marketing shouldn&apos;t be{" "}
            <span className="text-gold-500">another full-time job.</span>
          </h1>

          {/* The Problem - 3 pain points */}
          <div className="grid gap-4 mb-10">
            <div className="flex items-start gap-4 bg-navy-900/50 rounded-xl p-5 border border-navy-700">
              <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">No time to learn SEO</h3>
                <p className="text-warmWhite/70">You went to law school, not marketing school. You shouldn&apos;t need to become an expert just to get clients.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-navy-900/50 rounded-xl p-5 border border-navy-700">
              <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Agencies charge a fortune</h3>
                <p className="text-warmWhite/70">$5K-$10K/month for mediocre results. Long contracts. Endless &quot;strategy calls&quot; that go nowhere.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-navy-900/50 rounded-xl p-5 border border-navy-700">
              <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">You&apos;re invisible online</h3>
                <p className="text-warmWhite/70">Your website exists, but Google doesn&apos;t show it. Potential clients can&apos;t find you when they search.</p>
              </div>
            </div>
          </div>

          {/* The Solution */}
          <div className="bg-gradient-to-r from-gold-500/10 to-electric-500/10 rounded-2xl p-6 border border-gold-500/30 mb-8">
            <h2 className="text-2xl font-display font-bold text-center mb-4">
              We fix all of this for <span className="text-gold-500">one flat fee.</span>
            </h2>
            <p className="text-center text-lg text-warmWhite/80">
              SEO • Content • Video • Social Media • Reputation Management
            </p>
            <p className="text-center text-warmWhite/60 mt-2">
              Month-to-month. No contracts. No setup fees. Cancel anytime.
            </p>
          </div>

          {/* Simple Pricing */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-navy-900 rounded-xl p-6 border border-navy-700 text-center">
              <div className="text-warmWhite/60 text-sm uppercase tracking-wider mb-2">Digital Marketing</div>
              <div className="text-4xl font-display font-bold text-warmWhite mb-2">$2,000<span className="text-lg text-warmWhite/60">/mo</span></div>
              <div className="text-warmWhite/70 text-sm">Everything you need to dominate Google</div>
            </div>
            <div className="bg-navy-900 rounded-xl p-6 border-2 border-gold-500 text-center relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold-500 text-navy-950 text-xs font-bold px-3 py-1 rounded-full">RECOMMENDED</div>
              <div className="text-warmWhite/60 text-sm uppercase tracking-wider mb-2">+ AI Search (GEO)</div>
              <div className="text-4xl font-display font-bold text-warmWhite mb-2">$2,500<span className="text-lg text-warmWhite/60">/mo</span></div>
              <div className="text-warmWhite/70 text-sm">Also show up in ChatGPT, Gemini & Perplexity</div>
            </div>
          </div>
        </div>
      </section>

      {/* PAGE 2: How It Works & Start */}
      <section className="min-h-screen px-6 py-12 flex flex-col justify-center bg-navy-900 print-break print-bg">
        <div className="max-w-3xl mx-auto">
          {/* How It Works */}
          <h2 className="text-3xl font-display font-bold text-center mb-8">
            How It Works
          </h2>

          <div className="grid gap-6 mb-12">
            {/* Step 1 */}
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 rounded-full bg-gold-500 flex items-center justify-center flex-shrink-0">
                <span className="text-2xl font-bold text-navy-950">1</span>
              </div>
              <div>
                <h3 className="font-semibold text-xl mb-1">You share one idea</h3>
                <p className="text-warmWhite/70">A case insight, a question clients always ask, or something you learned this week. Takes 2 minutes.</p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 rounded-full bg-gold-500 flex items-center justify-center flex-shrink-0">
                <span className="text-2xl font-bold text-navy-950">2</span>
              </div>
              <div>
                <h3 className="font-semibold text-xl mb-1">We turn it into everything</h3>
                <p className="text-warmWhite/70">Blog post, video, social content, email, Google posts — all optimized to get you found.</p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 rounded-full bg-gold-500 flex items-center justify-center flex-shrink-0">
                <span className="text-2xl font-bold text-navy-950">3</span>
              </div>
              <div>
                <h3 className="font-semibold text-xl mb-1">You focus on practicing law</h3>
                <p className="text-warmWhite/70">We handle the rest. Watch your rankings climb. Get more calls. Grow your practice.</p>
              </div>
            </div>
          </div>

          {/* What We Need */}
          <div className="bg-navy-950 rounded-2xl p-6 mb-8 border border-navy-700">
            <h3 className="text-xl font-display font-bold mb-4 text-center">What We Need to Start</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-gold-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-warmWhite/80">Your website URL</span>
              </div>
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-gold-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-warmWhite/80">Practice areas to rank for</span>
              </div>
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-gold-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-warmWhite/80">Cities you serve</span>
              </div>
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-gold-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-warmWhite/80">15-minute kickoff call</span>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="space-y-4">
            <Link 
              href="https://buy.stripe.com/fZu14o8Q35YH5m36N997G00" 
              target="_blank"
              className="block w-full bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold text-xl py-4 px-8 rounded-xl text-center transition-colors"
            >
              Start Now — $2,000/month →
            </Link>
            <Link 
              href="https://buy.stripe.com/4gM7sMaYb72Lc0vc7t97G03" 
              target="_blank"
              className="block w-full bg-transparent hover:bg-gold-500/10 text-gold-500 border-2 border-gold-500 font-bold text-xl py-4 px-8 rounded-xl text-center transition-colors"
            >
              Start with GEO — $2,500/month →
            </Link>
          </div>

          {/* Contact */}
          <div className="mt-8 text-center text-warmWhite/60">
            <p className="mb-2">Questions? Let&apos;s talk first.</p>
            {/* TODO: Phase 3 — read booking link from firmConfig */}
            <Link
              href="/contact"
              className="text-gold-500 hover:text-gold-400 underline"
            >
              Book a free 15-minute call →
            </Link>
          </div>

          {/* Footer */}
          <div className="mt-12 pt-6 border-t border-navy-700 text-center text-warmWhite/40 text-sm">
            {/* TODO: Phase 3 — read firm name, phone, and website from firmConfig */}
            <p>Your Law Firm Name • (555) 000-0000 • yourfirm.com</p>
          </div>
        </div>
      </section>
    </div>
  )
}
