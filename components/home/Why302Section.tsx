"use client"

import { ScrollReveal, ScrollRevealItem } from "@/components/animations/ScrollReveal"

const reasons = [
  {
    title: "No Fee Unless We Win",
    description:
      "We work on a contingency fee basis. You pay nothing upfront, and we only get paid when we recover compensation for you. Zero financial risk.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Aggressive Yet Compassionate",
    description:
      "Attorney Williams is known for her aggressive courtroom presence combined with genuine care for her clients. You get a fighter who treats you like family.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: "Two States, One Mission",
    description:
      "Licensed in both Georgia and Mississippi with offices in Atlanta and Jackson. Whether your injury happened in either state, we can represent you.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
]

export function WhyChooseUsSection() {
  return (
    <section className="py-20 lg:py-28 bg-navy-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="uppercase text-xs tracking-[0.2em] text-gold-500 mb-4">Why Choose Us</p>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-warmWhite">
              What Sets Us Apart
            </h2>
          </div>
        </ScrollReveal>

        <ScrollReveal stagger>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reasons.map((reason) => (
              <ScrollRevealItem key={reason.title}>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-gold-500/10 rounded-xl text-gold-500 mb-6">
                    {reason.icon}
                  </div>
                  <h3 className="text-xl font-display font-semibold text-warmWhite mb-3">
                    {reason.title}
                  </h3>
                  <p className="text-warmWhite/70 text-sm leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              </ScrollRevealItem>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
