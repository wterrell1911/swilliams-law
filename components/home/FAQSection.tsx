"use client"

import { FAQAccordion, FAQItem } from "@/components/ui/FAQAccordion"
import { ScrollReveal } from "@/components/animations/ScrollReveal"
import { firmConfig } from "@/config/firm.config"

export function FAQSection() {
  const faqItems: FAQItem[] = firmConfig.faqs.map((faq) => ({
    question: faq.question,
    answer: faq.answer,
  }))

  return (
    <section className="py-20 lg:py-28 bg-navy-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        <ScrollReveal>
          <div className="text-center mb-12">
            <p className="uppercase text-xs tracking-[0.2em] text-gold-500 mb-4">FAQ</p>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-warmWhite mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-warmWhite/70">
              Answers to common questions about personal injury and workers&apos; compensation claims.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <FAQAccordion items={faqItems} />
        </ScrollReveal>
      </div>
    </section>
  )
}
