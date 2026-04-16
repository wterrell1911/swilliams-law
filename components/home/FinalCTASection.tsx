"use client"

import Link from "next/link"
import { ScrollReveal } from "@/components/animations/ScrollReveal"
import { Button } from "@/components/ui/Button"

export function FinalCTASection() {
  return (
    <section className="py-20 bg-gradient-to-b from-navy-900 to-navy-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl text-center">
        <ScrollReveal>
          {/* TODO: Phase 3 — read copy and CTA from firmConfig */}
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-warmWhite mb-4">
            Ready to discuss your case?
          </h2>
          <p className="text-lg text-warmWhite/60 mb-8 max-w-xl mx-auto">
            Contact us today for a free, no-obligation consultation. We will review your situation and explain your legal options.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            <Link href="/contact">
              <Button variant="primary" size="lg">
                Free Consultation
              </Button>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
