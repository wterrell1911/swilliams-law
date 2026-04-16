"use client"

import Link from "next/link"
import { ScrollReveal, ScrollRevealItem } from "@/components/animations/ScrollReveal"
import { Button } from "@/components/ui/Button"

const steps = [
  {
    number: "1",
    title: "Free Case Evaluation",
    description:
      "Call us or fill out our online form. We'll review your case, explain your options, and let you know if you have a claim — all at no cost.",
  },
  {
    number: "2",
    title: "We Investigate & Build Your Case",
    description:
      "Our team gathers evidence, obtains medical records, consults experts, and builds the strongest possible case for maximum compensation.",
  },
  {
    number: "3",
    title: "We Fight for Your Recovery",
    description:
      "We negotiate aggressively with the insurance company. If they won't pay what your case is worth, we take them to court. You focus on healing.",
  },
]

export function ProcessSection() {
  return (
    <section className="py-20 lg:py-28 bg-navy-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="uppercase text-xs tracking-[0.2em] text-gold-500 mb-4">How It Works</p>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-warmWhite mb-4">
              Three Steps to Your Recovery
            </h2>
            <p className="text-warmWhite/70 max-w-2xl mx-auto">
              We make the legal process as simple as possible so you can focus on healing.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal stagger>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connector line (desktop) */}
            <div className="hidden md:block absolute top-10 left-[16%] right-[16%] h-px bg-gold-500/30" />

            {steps.map((step) => (
              <ScrollRevealItem key={step.number}>
                <div className="text-center relative">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-navy-950 border-2 border-gold-500 text-gold-500 text-2xl font-display font-bold mb-6 relative z-10">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-display font-semibold text-warmWhite mb-3">
                    {step.title}
                  </h3>
                  <p className="text-warmWhite/70 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </ScrollRevealItem>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="text-center mt-12">
            <Link href="/contact">
              <Button size="lg" variant="primary">
                Start Your Free Case Evaluation
              </Button>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
