"use client"

import Link from "next/link"
import { ScrollReveal } from "@/components/animations/ScrollReveal"
import { Button } from "@/components/ui/Button"
import { PhoneNumber } from "@/components/PhoneNumber"

export function FinalCTASection() {
  return (
    <section className="py-20 lg:py-28 bg-gradient-to-b from-navy-900 to-navy-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
        <ScrollReveal>
          <p className="uppercase text-xs tracking-[0.2em] text-gold-500 mb-4">Get Started Today</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-warmWhite mb-6">
            Injured? Let Us Fight for You.
          </h2>
          <p className="text-warmWhite/70 text-lg mb-10 max-w-2xl mx-auto">
            Your free case evaluation takes just a few minutes. Tell us what happened and we&apos;ll let you know how we can help — no obligation, no pressure, no fee unless we win.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact">
              <Button size="lg" variant="primary">
                Free Case Evaluation
              </Button>
            </Link>
            <PhoneNumber className="inline-flex items-center justify-center px-6 py-3 border border-gold-500/50 text-warmWhite hover:bg-gold-500/10 rounded-md transition-colors text-base font-medium" />
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
