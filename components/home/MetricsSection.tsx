"use client"

import { ScrollReveal } from "@/components/animations/ScrollReveal"
import { Card } from "@/components/ui/Card"

const phases = [
  {
    month: "Month 1",
    name: "Foundation",
    items: [
      "Comprehensive website audit & SEO baseline",
      "Google Business Profile setup & optimization",
      "Content strategy tailored to your practice areas",
      "First blog posts researched, written & published",
    ],
  },
  {
    month: "Month 2-3",
    name: "Building Momentum",
    items: [
      "Rankings start moving for target keywords",
      "Consistent content publishing on a set schedule",
      "Social media presence growing & engaging",
      "Review generation strategy active & working",
    ],
  },
  {
    month: "Month 3+",
    name: "Compounding Results",
    items: [
      "SEO gains compound — each month builds on the last",
      "Lead flow increases as your visibility grows",
      "Online authority established in your market",
      "A digital presence that works for you around the clock",
    ],
  },
]

export function MetricsSection() {
  return (
    <section className="py-24 sm:py-32 bg-navy-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <ScrollReveal className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-warmWhite mb-4">
            Our Process: What To Expect
          </h2>
          <p className="text-xl text-warmWhite/70 max-w-2xl mx-auto">
            A clear, proven approach to building your firm&apos;s digital presence — no shortcuts, no gimmicks
          </p>
        </ScrollReveal>

        <ScrollReveal className="mt-8">
          <Card variant="bordered" className="p-8 md:p-12">
            <div className="grid md:grid-cols-3 gap-8">
              {phases.map((phase) => (
                <div key={phase.month}>
                  <div className="mb-4">
                    <span className="text-sm font-semibold text-gold-500 uppercase tracking-wider">
                      {phase.month}
                    </span>
                    <h3 className="text-2xl font-display font-bold text-warmWhite mt-1">
                      {phase.name}
                    </h3>
                  </div>
                  <ul className="space-y-3 text-warmWhite/80">
                    {phase.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-gold-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Card>
        </ScrollReveal>
      </div>
    </section>
  )
}
