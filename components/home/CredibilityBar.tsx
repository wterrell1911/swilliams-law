"use client"

import { FadeIn } from "@/components/animations/FadeIn"

const signals = [
  "Built by practicing attorneys",
  "AI designed around legal ethics",
  "Automation, AI assistants, and websites",
  "No contracts. Cancel anytime.",
]

export function CredibilityBar() {
  return (
    <section className="py-4 bg-navy-800/50 border-y border-navy-700">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <FadeIn>
          <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-2 text-center">
            {signals.map((signal, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="text-gold-500">✓</span>
                <span className="text-warmWhite/70 text-sm">{signal}</span>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
