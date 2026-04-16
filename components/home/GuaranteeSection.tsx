"use client"

import { ScrollReveal } from "@/components/animations/ScrollReveal"
import { PhoneNumber } from "@/components/PhoneNumber"

export function GuaranteeSection() {
  return (
    <section className="py-20 lg:py-28 bg-navy-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <ScrollReveal>
          <div className="max-w-3xl mx-auto">
            <div className="border-2 border-gold-500/40 rounded-2xl p-10 sm:p-14 text-center relative">
              {/* Corner accent */}
              <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-gold-500 rounded-tl-2xl" />
              <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-gold-500 rounded-br-2xl" />

              <p className="uppercase text-xs tracking-[0.2em] text-gold-500 mb-4">Our Promise</p>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-warmWhite mb-6">
                No Fee Unless We Win
              </h2>
              <p className="text-warmWhite/70 text-lg leading-relaxed mb-6">
                We believe that everyone deserves access to justice, regardless of their financial situation. That&apos;s why we handle all personal injury and workers&apos; compensation cases on a contingency fee basis. You pay nothing upfront. You pay nothing out of pocket. We only get paid when we recover compensation for you.
              </p>
              <div className="inline-flex items-center gap-2 text-gold-500 font-medium">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <PhoneNumber plain className="text-gold-500" />
                <span className="text-warmWhite/40 mx-2">|</span>
                <span className="text-warmWhite/70 text-sm">Free Case Evaluation</span>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
