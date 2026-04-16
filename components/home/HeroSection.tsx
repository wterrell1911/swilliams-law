"use client"

import Link from "next/link"
import { Button } from "@/components/ui/Button"
import { FadeIn } from "@/components/animations/FadeIn"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-navy-950 via-navy-900 to-navy-900 pt-20">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(250, 250, 249, 0.3) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Gradient Orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-gold-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-electric-500/20 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Eyebrow */}
          <FadeIn>
            <p className="uppercase text-xs sm:text-[13px] tracking-[0.2em] text-gold-500 mb-10">
              For lawyers. By lawyers.
            </p>
          </FadeIn>

          {/* Headline */}
          <FadeIn delay={0.1}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-warmWhite mb-6 leading-tight max-w-[850px] mx-auto">
              Your judgment is the product. We build everything else.
            </h1>
          </FadeIn>

          {/* Subheadline */}
          <FadeIn delay={0.2}>
            <p className="text-lg sm:text-xl text-warmWhite/70 mb-10 max-w-[700px] mx-auto leading-relaxed">
              The intake calls. The follow-up emails. The scheduling. The status updates. None of it requires a law degree, but all of it is eating your day. We automate the infrastructure so you spend your time on the work only you can do. That is what we build. That is all we build.
            </p>
          </FadeIn>

          {/* CTA Buttons */}
          <FadeIn delay={0.4}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {/* TODO: Phase 3 — CTA links from firmConfig */}
              <Link href="/practice-areas">
                <Button size="lg" variant="primary">
                  Our Practice Areas
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline">
                  Free Consultation
                </Button>
              </Link>
            </div>
          </FadeIn>

          {/* Trust line */}
          <FadeIn delay={0.6}>
            <p className="text-warmWhite/60 text-sm mt-6">
              No contracts. Cancel anytime. For lawyers, by lawyers.
            </p>
          </FadeIn>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-gold-500" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" stroke="currentColor">
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  )
}
