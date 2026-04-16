"use client"

import { ScrollReveal } from "@/components/animations/ScrollReveal"

// TODO: Phase 3 — read firm identity and elevator pitch from firmConfig
export function PositioningStatement() {
  return (
    <section className="py-20 bg-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <ScrollReveal>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Pull Quote */}
            <div>
              <blockquote className="text-2xl sm:text-3xl font-display font-bold text-navy-900 leading-snug">
                &ldquo;Experienced attorneys dedicated to protecting your rights and securing the results you deserve.&rdquo;
              </blockquote>
            </div>

            {/* Supporting Copy */}
            <div className="space-y-4 text-navy-700 leading-relaxed">
              <p>
                {/* TODO: Phase 3 — read from firmConfig.identity.elevatorPitch */}
                Our firm was founded on a simple principle: every client deserves dedicated, experienced legal representation regardless of the size of their case.
              </p>
              <p>
                We take the time to understand your situation, explain your options clearly, and fight for the best possible outcome.
              </p>
              <p className="font-semibold text-navy-900">
                When you need a legal team that puts your interests first, we are here to help.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
