import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/Button"
import { PhoneNumber } from "@/components/PhoneNumber"
import { firmConfig } from "@/config/firm.config"

export const metadata: Metadata = {
  title: "Client Testimonials | S. Williams Law Firm",
  description:
    "Read what our clients say about working with S. Williams Law Firm. Real reviews from personal injury and workers' compensation clients in Georgia and Mississippi.",
  keywords: [
    "S. Williams Law Firm reviews",
    "Atlanta personal injury lawyer reviews",
    "Suneisha Williams testimonials",
    "Georgia workers compensation attorney reviews",
  ],
}

export default function TestimonialsPage() {
  const testimonials = firmConfig.testimonials

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-navy-950 pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="uppercase text-xs tracking-[0.2em] text-gold-500 mb-6">
            Client Testimonials
          </p>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-warmWhite mb-6">
            What Our Clients Say
          </h1>
          <p className="text-warmWhite/70 leading-relaxed max-w-2xl mx-auto">
            We measure our success by the outcomes we achieve for our clients and the relationships we build along the way. Here&apos;s what they have to say.
          </p>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="bg-warmWhite py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy-900 py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-display font-bold text-warmWhite mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-warmWhite/60 mb-8 max-w-xl mx-auto">
            Join the families we&apos;ve helped across Georgia and Mississippi. Your free consultation is completely confidential.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            <Link href="/contact">
              <Button variant="primary" size="lg">
                Free Case Evaluation
              </Button>
            </Link>
            <PhoneNumber className="inline-flex items-center justify-center px-6 py-3 border border-gold-500/50 text-warmWhite hover:bg-gold-500/10 rounded-md transition-colors text-base font-medium" />
          </div>
          <p className="text-warmWhite/50 text-sm">
            No fee unless we win. Se Habla Espa&ntilde;ol.
          </p>
        </div>
      </section>
    </div>
  )
}
