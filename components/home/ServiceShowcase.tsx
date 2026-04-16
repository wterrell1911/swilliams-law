"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ScrollReveal, ScrollRevealItem } from "@/components/animations/ScrollReveal"
import { Button } from "@/components/ui/Button"
import { cn } from "@/lib/utils"
import {
  GEODemo,
  SEODemo,
  ContentDemo,
  VideoDemo,
  SocialDemo,
  ReputationDemo,
  LeadTrackingDemo,
} from "@/components/home/ServiceDemos"

const services = [
  { id: "seo", title: "SEO", component: SEODemo },
  { id: "geo", title: "AI Search (GEO)", component: GEODemo },
  { id: "content", title: "Content Marketing", component: ContentDemo },
  { id: "video", title: "Video Production", component: VideoDemo },
  { id: "social", title: "Social Media", component: SocialDemo },
  { id: "reputation", title: "Reputation Management", component: ReputationDemo },
  { id: "tracking", title: "Lead Tracking", component: LeadTrackingDemo },
]

export function ServiceShowcase() {
  const [activeService, setActiveService] = useState(services[0].id)
  const activeServiceData = services.find((s) => s.id === activeService)!
  const ActiveDemo = activeServiceData.component

  return (
    <section id="services" className="py-24 sm:py-32 bg-stone-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <ScrollReveal className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-navy-900 mb-4">
            What You Get
          </h2>
          <p className="text-xl text-navy-900/70 max-w-2xl mx-auto">
            Full-service digital marketing, all included in one monthly price
          </p>
        </ScrollReveal>

        {/* Service Tabs */}
        <ScrollReveal stagger staggerDelay={0.08}>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 mb-12">
            {services.map((service) => (
              <ScrollRevealItem key={service.id}>
                <button
                  onClick={() => setActiveService(service.id)}
                  className={cn(
                    "w-full px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                    activeService === service.id
                      ? "bg-gold-500 text-navy-950 shadow-lg shadow-gold-500/25"
                      : "bg-white text-navy-900/80 hover:bg-navy-50 border border-navy-200"
                  )}
                >
                  {service.title}
                </button>
              </ScrollRevealItem>
            ))}
          </div>
        </ScrollReveal>

        {/* Service Demo */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeService}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-gray-50 rounded-2xl border border-gray-200 p-6 sm:p-8 lg:p-10"
          >
            <ActiveDemo />
          </motion.div>
        </AnimatePresence>

        {/* Pricing CTA */}
        <ScrollReveal className="mt-16">
          <div className="max-w-4xl mx-auto">
            <div className="bg-navy-900 rounded-2xl p-8 lg:p-12 border border-gold-500/30">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                {/* Left: What You'd Pay Separately */}
                <div>
                  <h3 className="text-sm uppercase tracking-wide text-warmWhite/60 mb-4">
                    What Most Firms Pay
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-warmWhite/70 border-b border-warmWhite/10 pb-2">
                      <span>SEO Agency</span>
                      <span className="font-semibold">$1,500-$5,000/mo</span>
                    </div>
                    <div className="flex items-center justify-between text-warmWhite/70 border-b border-warmWhite/10 pb-2">
                      <span>Content Writer</span>
                      <span className="font-semibold">$500-$1,500/mo</span>
                    </div>
                    <div className="flex items-center justify-between text-warmWhite/70 border-b border-warmWhite/10 pb-2">
                      <span>Video Production</span>
                      <span className="font-semibold">$300-$800/video</span>
                    </div>
                    <div className="flex items-center justify-between text-warmWhite/70 border-b border-warmWhite/10 pb-2">
                      <span>Social Media Manager</span>
                      <span className="font-semibold">$1,000-$2,500/mo</span>
                    </div>
                    <div className="flex items-center justify-between text-warmWhite/70 border-b border-warmWhite/10 pb-2">
                      <span>Reputation Management</span>
                      <span className="font-semibold">$500-$1,000/mo</span>
                    </div>
                    <div className="flex items-center justify-between text-warmWhite font-semibold pt-2">
                      <span>Total if hired separately:</span>
                      <span className="text-red-400">$3,800-$10,800/mo</span>
                    </div>
                  </div>
                </div>

                {/* Right: Your Pricing */}
                <div className="lg:border-l lg:border-warmWhite/10 lg:pl-8">
                  <h3 className="text-sm uppercase tracking-wide text-warmWhite/60 mb-4 text-center">
                    What You Actually Pay
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {/* Tier 1: Digital Marketing */}
                    <div className="rounded-xl border border-warmWhite/20 p-5 text-center">
                      <div className="text-sm font-semibold text-warmWhite/80 mb-3">Digital Marketing</div>
                      <div className="text-4xl font-display font-bold text-warmWhite mb-1">
                        $2,000
                        <span className="text-lg text-warmWhite/60">/mo</span>
                      </div>
                      <p className="text-xs text-warmWhite/50 mb-4">Everything you need to dominate Google</p>
                      <ul className="text-xs text-warmWhite/60 space-y-1.5 mb-5 text-left">
                        <li className="flex items-center gap-2">
                          <svg className="w-3.5 h-3.5 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                          SEO
                        </li>
                        <li className="flex items-center gap-2">
                          <svg className="w-3.5 h-3.5 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                          Content Marketing
                        </li>
                        <li className="flex items-center gap-2">
                          <svg className="w-3.5 h-3.5 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                          Video Production
                        </li>
                        <li className="flex items-center gap-2">
                          <svg className="w-3.5 h-3.5 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                          Social Media
                        </li>
                        <li className="flex items-center gap-2">
                          <svg className="w-3.5 h-3.5 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                          Reputation Management
                        </li>
                        <li className="flex items-center gap-2">
                          <svg className="w-3.5 h-3.5 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                          Lead Tracking
                        </li>
                      </ul>
                      <Link href="/contact" target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" size="sm" className="w-full border-warmWhite/30 text-warmWhite hover:bg-warmWhite/10">
                          Free Strategy Call
                        </Button>
                      </Link>
                    </div>

                    {/* Tier 2: Digital Marketing + GEO */}
                    <div className="relative rounded-xl border-2 border-gold-500 p-5 text-center bg-gold-500/5">
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold-500 text-navy-950 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                        Recommended
                      </span>
                      <div className="text-sm font-semibold text-gold-500 mb-3">Digital Marketing + GEO</div>
                      <div className="text-4xl font-display font-bold text-gold-500 mb-1">
                        $2,500
                        <span className="text-lg text-warmWhite/60">/mo</span>
                      </div>
                      <p className="text-xs text-warmWhite/50 mb-4">Everything above, plus AI search visibility</p>
                      <ul className="text-xs text-warmWhite/60 space-y-1.5 mb-5 text-left">
                        <li className="flex items-center gap-2">
                          <svg className="w-3.5 h-3.5 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                          Everything in Digital Marketing
                        </li>
                        <li className="flex items-center gap-2">
                          <svg className="w-3.5 h-3.5 text-gold-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0v-1H3a1 1 0 010-2h1v-1a1 1 0 011-1zm7-10a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" /></svg>
                          <strong className="text-gold-400">AI Search Optimization (GEO)</strong>
                        </li>
                        <li className="flex items-center gap-2 pl-5">
                          <span className="text-warmWhite/40">Get cited by ChatGPT, Gemini, Perplexity</span>
                        </li>
                        <li className="flex items-center gap-2 pl-5">
                          <span className="text-warmWhite/40">AI-optimized content structure</span>
                        </li>
                        <li className="flex items-center gap-2 pl-5">
                          <span className="text-warmWhite/40">AI visibility tracking &amp; reporting</span>
                        </li>
                      </ul>
                      <Link href="/contact" target="_blank" rel="noopener noreferrer">
                        <Button variant="primary" size="sm" className="w-full">
                          Free Strategy Call
                        </Button>
                      </Link>
                    </div>
                  </div>
                  <p className="text-sm text-warmWhite/60 text-center mt-4">
                    Month-to-month. No contracts. No setup fees.
                  </p>
                  <p className="text-xs text-warmWhite/50 text-center mt-2">
                    Built for solo practitioners and small firms (2-10 attorneys)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Practice Areas */}
        <ScrollReveal className="mt-12 text-center">
          <p className="text-sm text-navy-900/60 mb-4">Perfect for:</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {["Personal Injury", "Workers Comp", "Family Law", "Criminal Defense"].map((area) => (
              <span
                key={area}
                className="px-4 py-2 bg-white text-navy-900/80 rounded-full text-sm border border-navy-200"
              >
                {area}
              </span>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
