"use client"

import { ScrollReveal, ScrollRevealItem } from "@/components/animations/ScrollReveal"

const reasons = [
  {
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.97zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.97z" />
      </svg>
    ),
    title: "We have been inside a law firm",
    description: "We understand intake workflows, ethics rules, and client relationships. That context shapes every tool we build. Most vendors learn legal from the outside. We built from the inside.",
  },
  {
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    title: "Every tool is built for confidentiality",
    description: "Attorney-client privilege is not an afterthought. Every AI workflow and automation system we build is designed around your ethics obligations and your bar's rules of professional conduct.",
  },
  {
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
      </svg>
    ),
    title: "We report on results, not activity",
    description: "No reports full of impressions and click rates. We track hours saved, leads captured, and consults booked. If we cannot show you the return in plain numbers, we have not done our job.",
  },
]

export function WhyChooseUsSection() {
  return (
    <section className="py-20 bg-navy-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <ScrollReveal className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-warmWhite mb-4">
            {/* TODO: Phase 3 — read firm name from firmConfig */}
            Why Choose Us
          </h2>
        </ScrollReveal>

        <ScrollReveal stagger staggerDelay={0.15}>
          <div className="grid md:grid-cols-3 gap-8">
            {reasons.map((reason, i) => (
              <ScrollRevealItem key={i}>
                <div className="text-center">
                  <div className="text-gold-500 flex justify-center mb-4">
                    {reason.icon}
                  </div>
                  <h3 className="text-xl font-bold text-warmWhite mb-3">
                    {reason.title}
                  </h3>
                  <p className="text-warmWhite/60 leading-relaxed">
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
