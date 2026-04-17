"use client"

import Link from "next/link"
import { ScrollReveal, ScrollRevealItem } from "@/components/animations/ScrollReveal"
import { firmConfig } from "@/config/firm.config"

const cityPracticeLinks: Record<string, string> = {
  "car-accidents": "/atlanta/car-accident-lawyer",
  "truck-accidents": "/atlanta/personal-injury-lawyer",
  "workers-compensation": "/atlanta/workers-compensation-lawyer",
  "slip-and-fall": "/atlanta/slip-and-fall-lawyer",
  "wrongful-death": "/atlanta/wrongful-death-attorney",
}

const practiceAreaIcons: Record<string, React.ReactNode> = {
  "car-accidents": (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 17h.01M16 17h.01M3 11l1.5-5A2 2 0 015.4 4h13.2a2 2 0 011.9 2L22 11M3 11h18M3 11v6a1 1 0 001 1h1a1 1 0 001-1v-1h12v1a1 1 0 001 1h1a1 1 0 001-1v-6" />
    </svg>
  ),
  "truck-accidents": (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10h10zm0 0h6l2-5h-6" />
    </svg>
  ),
  "workers-compensation": (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  ),
  "slip-and-fall": (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
    </svg>
  ),
  "wrongful-death": (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
    </svg>
  ),
}

export function ThreePillarsSection() {
  const practiceAreas = firmConfig.practiceAreas

  return (
    <section className="py-20 lg:py-28 bg-navy-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="uppercase text-xs tracking-[0.2em] text-gold-500 mb-4">Practice Areas</p>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-warmWhite mb-4">
              How We Help Injury Victims
            </h2>
            <p className="text-warmWhite/70 max-w-2xl mx-auto">
              We focus exclusively on personal injury and workers&apos; compensation cases — so you get an attorney who knows your type of case inside and out.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal stagger>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {practiceAreas.map((area) => (
              <ScrollRevealItem key={area.slug}>
                <Link href={cityPracticeLinks[area.slug] || `/practice-areas/${area.slug}`} className="block group">
                  <div className="bg-navy-900 border border-navy-700/50 rounded-xl p-8 h-full hover:border-gold-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-gold-500/5">
                    <div className="text-gold-500 mb-4">
                      {practiceAreaIcons[area.slug]}
                    </div>
                    <h3 className="text-xl font-display font-semibold text-warmWhite mb-3 group-hover:text-gold-500 transition-colors">
                      {area.name}
                    </h3>
                    <p className="text-warmWhite/70 text-sm leading-relaxed">
                      {area.shortDescription}
                    </p>
                    <div className="mt-4 text-gold-500 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                      Learn More
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              </ScrollRevealItem>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
