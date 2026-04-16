"use client"

import { ScrollReveal } from "@/components/animations/ScrollReveal"
import { firmConfig } from "@/config/firm.config"

export function TestimonialSection() {
  const testimonials = firmConfig.testimonials.filter((t) => t.featured)

  return (
    <section className="py-20 lg:py-28 bg-warmWhite">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="uppercase text-xs tracking-[0.2em] text-gold-500 mb-4">Client Testimonials</p>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-navy-900 mb-4">
              What Our Clients Say
            </h2>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <div
                key={idx}
                className="bg-white border border-navy-900/10 rounded-xl p-8 relative"
              >
                {/* Quote mark */}
                <div className="text-gold-500/20 text-6xl font-display leading-none absolute top-4 left-6">
                  &ldquo;
                </div>
                <div className="relative z-10">
                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-gold-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-navy-700 leading-relaxed mb-6 italic">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                  <div className="border-t border-navy-900/10 pt-4">
                    <p className="text-navy-900 font-semibold text-sm">{testimonial.clientName}</p>
                    <p className="text-navy-600 text-xs">{testimonial.caseType}</p>
                    <p className="text-gold-500 text-xs mt-1">via {testimonial.source}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
