"use client"

import { ScrollReveal } from "@/components/animations/ScrollReveal"
import { firmConfig } from "@/config/firm.config"

function formatAmount(amount: number): string {
  if (amount >= 1000000) {
    return `$${(amount / 1000000).toFixed(1)}M`
  }
  return `$${(amount / 1000).toFixed(0)}K`
}

export function StatBlockSection() {
  const featured = firmConfig.caseResults.filter((r) => r.featured)

  return (
    <section className="py-20 lg:py-28 bg-warmWhite">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="uppercase text-xs tracking-[0.2em] text-gold-500 mb-4">Case Results</p>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-navy-900 mb-4">
              Proven Results for Our Clients
            </h2>
            <p className="text-navy-600 max-w-2xl mx-auto">
              We measure our success by the recoveries we obtain for our clients. Here are some of our recent results.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((result) => (
              <div
                key={result.headline}
                className="bg-white border border-navy-900/10 rounded-xl p-6 text-center hover:shadow-lg transition-shadow"
              >
                <p className="text-3xl sm:text-4xl font-display font-bold text-navy-900 mb-2">
                  {formatAmount(result.amount)}
                </p>
                <p className="text-gold-500 font-semibold text-sm mb-2">
                  {result.headline.split(" — ")[1]}
                </p>
                <p className="text-navy-600 text-xs leading-relaxed">
                  {result.summary}
                </p>
              </div>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <p className="text-center text-navy-600/60 text-xs mt-8 italic">
            {firmConfig.legal.caseResultsDisclaimer}
          </p>
        </ScrollReveal>
      </div>
    </section>
  )
}
