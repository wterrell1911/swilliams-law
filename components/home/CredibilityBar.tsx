"use client"

import { FadeIn } from "@/components/animations/FadeIn"

const trustSignals = [
  "Licensed in Georgia & Mississippi",
  "No Fee Unless We Win",
  "Over $3M Recovered for Clients",
  "Se Habla Espa\u00F1ol",
]

export function CredibilityBar() {
  return (
    <section className="bg-navy-800/50 border-y border-navy-700/50 py-4">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <FadeIn>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
            {trustSignals.map((signal) => (
              <div key={signal} className="flex items-center gap-2 text-warmWhite/80 text-sm">
                <svg className="w-4 h-4 text-gold-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>{signal}</span>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
