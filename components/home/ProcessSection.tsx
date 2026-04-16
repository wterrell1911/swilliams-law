"use client"

import Link from "next/link"
import { ScrollReveal, ScrollRevealItem } from "@/components/animations/ScrollReveal"
import { Button } from "@/components/ui/Button"

const steps = [
  {
    number: "1",
    title: "Free Audit",
    description: "We analyze your site, tools, and workflow in 10 minutes. No charge, no obligation.",
  },
  {
    number: "2",
    title: "Pick Your Path",
    description: "Choose marketing, automation, websites — or all three. No contracts, month-to-month.",
  },
  {
    number: "3",
    title: "We Execute",
    description: "You focus on practicing law. We handle the rest. Results in 30 days.",
  },
]

export function ProcessSection() {
  return (
    <section className="py-20 bg-navy-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <ScrollReveal className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-warmWhite mb-4">
            How It Works
          </h2>
        </ScrollReveal>

        <ScrollReveal stagger staggerDelay={0.2}>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {steps.map((step, index) => (
              <ScrollRevealItem key={step.title}>
                <div className="text-center relative">
                  {/* Connector Line (not on last item) */}
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-6 left-[60%] w-[80%] h-0.5 bg-gold-500/30" />
                  )}
                  <div className="w-12 h-12 bg-gold-500 rounded-full flex items-center justify-center text-navy-950 font-bold text-xl mx-auto mb-4 relative z-10">
                    {step.number}
                  </div>
                  <h3 className="text-lg font-bold text-warmWhite mb-2">{step.title}</h3>
                  <p className="text-warmWhite/60">{step.description}</p>
                </div>
              </ScrollRevealItem>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.4} className="text-center">
          {/* TODO: Phase 3 — CTA link from firmConfig */}
          <Link href="/contact">
            <Button variant="primary" size="lg">
              Schedule a Free Consultation
            </Button>
          </Link>
        </ScrollReveal>
      </div>
    </section>
  )
}
