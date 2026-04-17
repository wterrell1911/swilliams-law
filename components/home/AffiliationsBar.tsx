"use client"

import { FadeIn } from "@/components/animations/FadeIn"
import { firmConfig } from "@/config/firm.config"

export function AffiliationsBar() {
  return (
    <section className="bg-warmWhite py-12 border-b border-navy-900/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <FadeIn>
          <p className="text-center text-xs uppercase tracking-[0.2em] text-navy-600 mb-8">
            Professional Affiliations
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {firmConfig.affiliations.map((affiliation) => (
              <div
                key={affiliation.shortName}
                className="px-5 py-2.5 border border-navy-900/10 rounded-lg bg-white text-navy-900 text-sm font-medium"
              >
                {affiliation.name}
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
