import type { Metadata } from "next"
import { ScrollReveal } from "@/components/animations/ScrollReveal"
import { Card } from "@/components/ui/Card"
import { Breadcrumbs } from "@/components/seo/Breadcrumbs"
import { ContactForm } from "@/components/forms/ContactForm"
import { siteConfig } from "@/config/site"
import { firmConfig } from "@/config/firm.config"
import { PhoneNumber } from "@/components/PhoneNumber"

export const metadata: Metadata = {
  title: "Free Case Evaluation | S. Williams Law Firm",
  description:
    "Contact S. Williams Law Firm for a free case evaluation. Personal injury and workers' compensation attorneys in Atlanta, GA and Jackson, MS. No fee unless we win.",
  keywords: [
    "free case evaluation",
    "personal injury attorney Atlanta",
    "workers compensation lawyer",
    "contact attorney",
  ],
}

export default function ContactPage() {
  return (
    <>
      {/* Hero - Dark */}
      <div className="bg-gradient-to-b from-navy-950 via-navy-900 to-navy-900 pt-32 pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <Breadcrumbs items={[{ name: "Free Case Evaluation", url: "/contact" }]} className="mb-8" />

          <ScrollReveal className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl sm:text-6xl font-display font-bold text-warmWhite mb-6">
              Free Case <span className="text-gold-500">Evaluation</span>
            </h1>
            <p className="text-xl text-warmWhite/80 leading-relaxed">
              Injured? Tell us what happened. We&apos;ll review your case for free and let you know how we can help. No obligation. No fee unless we win.
            </p>
          </ScrollReveal>
        </div>
      </div>

      {/* Content - Light */}
      <div className="bg-warmWhite py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <ScrollReveal>
              <Card variant="bordered" className="p-8 bg-white border-navy-200">
                <h2 className="text-2xl font-display font-bold text-navy-900 mb-6">
                  Tell Us About Your Case
                </h2>
                <ContactForm />
              </Card>
            </ScrollReveal>

            {/* Contact Info */}
            <div className="space-y-6">
              <ScrollReveal delay={0.2}>
                <Card variant="bordered" className="p-8 bg-white border-navy-200">
                  <h3 className="text-xl font-semibold text-navy-900 mb-4">
                    Prefer to Call?
                  </h3>
                  <p className="text-navy-900/70 mb-4">
                    Speak with our team directly. We&apos;ll listen to your story and explain your options.
                  </p>
                  <PhoneNumber className="text-gold-500 hover:text-gold-400 font-semibold transition-colors text-2xl" />
                  <p className="text-navy-600 text-sm mt-2">Se Habla Espa&ntilde;ol</p>
                </Card>
              </ScrollReveal>

              {/* Offices */}
              {firmConfig.locations.map((loc, idx) => (
                <ScrollReveal key={loc.slug} delay={0.3 + idx * 0.1}>
                  <Card variant="bordered" className="p-8 bg-white border-navy-200">
                    <h3 className="text-xl font-semibold text-navy-900 mb-2">
                      {loc.name} Office
                    </h3>
                    <p className="text-navy-900/70 text-sm">
                      {loc.streetAddress}<br />
                      {loc.city}, {loc.state} {loc.postalCode}
                    </p>
                    <p className="text-navy-900/70 text-sm mt-2">
                      Phone: {loc.phone}
                    </p>
                    <p className="text-navy-600 text-xs mt-2">
                      Mon-Fri: 9:00 AM - 5:00 PM
                    </p>
                  </Card>
                </ScrollReveal>
              ))}

              <ScrollReveal delay={0.5}>
                <Card variant="bordered" className="p-8 bg-white border-navy-200">
                  <h3 className="text-xl font-semibold text-navy-900 mb-4">
                    What to Expect
                  </h3>
                  <ul className="space-y-3">
                    {[
                      "We respond within 24 hours (usually same day)",
                      "Free, confidential case evaluation",
                      "Honest assessment of your case",
                      "No fee unless we win your case",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <svg
                          className="w-6 h-6 text-gold-500 mt-0.5 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-navy-900/80">{item}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
