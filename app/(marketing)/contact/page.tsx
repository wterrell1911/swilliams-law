import type { Metadata } from "next"
import Link from "next/link"
import { ScrollReveal } from "@/components/animations/ScrollReveal"
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Breadcrumbs } from "@/components/seo/Breadcrumbs"
import { ContactForm } from "@/components/forms/ContactForm"
import { pageMetadata } from "@/config/seo"
import { siteConfig } from "@/config/site"

export const metadata: Metadata = {
  title: pageMetadata.contact.title,
  description: pageMetadata.contact.description,
  keywords: pageMetadata.contact.keywords,
}

export default function ContactPage() {
  return (
    <>
      {/* Hero - Dark */}
      <div className="bg-gradient-to-b from-navy-950 via-navy-900 to-navy-900 pt-32 pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <Breadcrumbs items={[{ name: "Contact", url: "/contact" }]} className="mb-8" />

          <ScrollReveal className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl sm:text-6xl font-display font-bold text-warmWhite mb-6">
              Tell Us What&apos;s <span className="text-gradient">Not Working</span>
            </h1>
            <p className="text-xl text-warmWhite/80 leading-relaxed">
              Frustrated with your current marketing? Not seeing results? Let&apos;s talk. No
              pressure, no pitch — just honest advice about what&apos;s broken and how to fix it.
            </p>
          </ScrollReveal>
        </div>
      </div>

      {/* Content - Light */}
      <div className="bg-stone-50 py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <ScrollReveal>
              <Card variant="bordered" className="p-8 bg-white border-navy-200">
                <h2 className="text-2xl font-display font-bold text-navy-900 mb-6">
                  Send Us a Message
                </h2>
                <ContactForm />
              </Card>
            </ScrollReveal>

            {/* Contact Info */}
            <div className="space-y-6">
              <ScrollReveal delay={0.2}>
                <Card variant="bordered" className="p-8 bg-white border-navy-200">
                  <h3 className="text-xl font-semibold text-navy-900 mb-4">
                    Prefer a Live Conversation?
                  </h3>
                  <p className="text-navy-900/70 mb-6">
                    Book a free 30-minute strategy call. We&apos;ll review your current marketing,
                    identify what&apos;s not working, and map out a path forward.
                  </p>
                  {/* TODO: Phase 3 — read booking link from firmConfig */}
                  <Link href="/contact#book">
                    <Button variant="primary" size="lg" className="w-full">
                      Free Strategy Call — No Pitch, Just Answers
                    </Button>
                  </Link>
                </Card>
              </ScrollReveal>

              <ScrollReveal delay={0.3}>
                <Card variant="bordered" className="p-8 bg-white border-navy-200">
                  <h3 className="text-xl font-semibold text-navy-900 mb-4">
                    Email Us Directly
                  </h3>
                  <p className="text-navy-900/70 mb-4">
                    Got a quick question? Reach out directly:
                  </p>
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="text-gold-600 hover:text-gold-500 font-semibold transition-colors text-lg"
                  >
                    {siteConfig.contact.email}
                  </a>
                </Card>
              </ScrollReveal>

              <ScrollReveal delay={0.4}>
                <Card variant="bordered" className="p-8 bg-white border-navy-200">
                  <h3 className="text-xl font-semibold text-navy-900 mb-4">
                    What to Expect
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
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
                      <span className="text-navy-900/80">
                        We&apos;ll respond within 24 hours (usually same day)
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
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
                      <span className="text-navy-900/80">
                        Free 30-minute strategy call to diagnose the problem
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
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
                      <span className="text-navy-900/80">
                        Custom proposal if we&apos;re a good fit for each other
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
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
                      <span className="text-navy-900/80">
                        Zero obligation — we&apos;re not salespeople, we&apos;re marketers
                      </span>
                    </li>
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
