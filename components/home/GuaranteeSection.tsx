"use client"

import { ScrollReveal } from "@/components/animations/ScrollReveal"

export function GuaranteeSection() {
  return (
    <section className="py-16 bg-navy-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        <ScrollReveal>
          <div className="bg-gold-500/10 border-2 border-gold-500 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-display font-bold text-gold-500 mb-4">
              90-Day Results Guarantee
            </h3>
            <p className="text-warmWhite/80 leading-relaxed">
              If you do not see measurable improvement in hours saved, leads captured, or consults booked within 90 days, your second month is free. No fine print. No wiggle room. We back our work because we know what it delivers.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
