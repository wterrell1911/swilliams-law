"use client"

import { ScrollReveal } from "@/components/animations/ScrollReveal"

export function PositioningStatement() {
  return (
    <section className="py-20 lg:py-28 bg-warmWhite">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left — Pull Quote */}
          <ScrollReveal>
            <div className="relative">
              <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gold-500 rounded-full" />
              <blockquote className="pl-8">
                <p className="text-2xl sm:text-3xl font-display font-semibold text-navy-900 leading-snug">
                  &ldquo;I founded this firm because I know what it&apos;s like to be injured and feel alone in the legal system. Every client deserves someone who will fight for them — not just as a case number, but as family.&rdquo;
                </p>
                <footer className="mt-6">
                  <p className="text-navy-900 font-semibold">Suneisha L. Williams, Esq.</p>
                  <p className="text-navy-600 text-sm">Owner &amp; Managing Attorney</p>
                </footer>
              </blockquote>
            </div>
          </ScrollReveal>

          {/* Right — Supporting Copy */}
          <ScrollReveal delay={0.2}>
            <div className="space-y-4 text-navy-700 text-base leading-relaxed">
              <p>
                S. Williams Law Firm was founded in 2013 with a single mission: to give personal injury and workers&apos; compensation victims the aggressive, compassionate representation they deserve. Attorney Williams knows firsthand what it means to navigate the legal system after an injury — she was injured in a car accident at 19 years old.
              </p>
              <p>
                That experience shaped everything about how this firm operates. We don&apos;t treat clients like case files. We return calls the same day. We explain every step of the process. And we fight as hard for a $50,000 case as we do for a $1 million case, because every client&apos;s recovery matters.
              </p>
              <p>
                Licensed in both Georgia and Mississippi, with offices in Atlanta and Jackson, we serve injury victims across both states — from Buckhead to the Mississippi Delta.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
