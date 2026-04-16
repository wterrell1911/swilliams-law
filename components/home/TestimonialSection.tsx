"use client"

import Link from "next/link"
import { ScrollReveal } from "@/components/animations/ScrollReveal"
import { Card } from "@/components/ui/Card"

export function TestimonialSection() {
  return (
    <section className="py-20 bg-stone-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <ScrollReveal>
          <Card variant="bordered" className="p-8 sm:p-12 bg-white text-center">
            <svg className="w-12 h-12 text-gold-500 mx-auto mb-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
            <blockquote className="text-xl sm:text-2xl text-navy-900 font-medium mb-6 leading-relaxed">
              &ldquo;I&apos;ve been searching for 2 months for what you provided in 2 minutes. This is exactly what I needed.&rdquo;
            </blockquote>
            <cite className="text-navy-900/60 not-italic">
              — Suneisha Williams, S. Williams Law Firm (Atlanta, GA)
            </cite>
          </Card>
        </ScrollReveal>

        <ScrollReveal delay={0.2} className="text-center mt-8">
          <Link
            href="/blog?category=case-studies"
            className="text-gold-600 hover:text-gold-700 font-semibold inline-flex items-center gap-1"
          >
            More Case Studies
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </ScrollReveal>
      </div>
    </section>
  )
}
