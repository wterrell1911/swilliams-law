import { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Breadcrumbs } from "@/components/seo/Breadcrumbs"
import { ScrollReveal } from "@/components/animations/ScrollReveal"
import { Button } from "@/components/ui/Button"
import { PhoneNumber } from "@/components/PhoneNumber"
import { MDXRemote } from "next-mdx-remote/rsc"
import { getCityPracticeArea } from "@/lib/city-practice-areas"
import { firmConfig } from "@/config/firm.config"
import { mdxComponents } from "@/components/blog/MDXComponents"
import { JsonLd } from "@/components/seo/JsonLd"
import { generateMetadata as generateMeta } from "@/lib/metadata"
import {
  generateLegalServicePageSchema,
  generateFAQPageSchema,
} from "@/lib/structured-data"
import { siteConfig } from "@/config/site"

interface Props {
  params: Promise<{ city: string; "practice-slug": string }>
}

export async function generateStaticParams() {
  return firmConfig.cityPracticePages.map((page) => ({
    city: page.city,
    "practice-slug": page.practiceSlug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city, "practice-slug": practiceSlug } = await params
  const page = getCityPracticeArea(city, practiceSlug)
  if (!page) return {}

  return generateMeta({
    title: page.seoTitle,
    description: page.description,
    canonical: `${siteConfig.url}/${city}/${practiceSlug}`,
  })
}

export default async function CityPracticeAreaPage({ params }: Props) {
  const { city, "practice-slug": practiceSlug } = await params
  const page = getCityPracticeArea(city, practiceSlug)

  if (!page) {
    notFound()
  }

  const configPage = firmConfig.cityPracticePages.find(
    (p) => p.city === city && p.practiceSlug === practiceSlug
  )
  if (!configPage) notFound()

  const location = firmConfig.locations.find(
    (l) => l.slug === configPage.locationSlug
  )
  if (!location) notFound()

  const pageUrl = `${siteConfig.url}/${city}/${practiceSlug}`

  const legalServiceSchema = generateLegalServicePageSchema({
    practiceLabel: page.practiceLabel,
    cityName: page.cityName,
    state: page.state,
    description: page.description,
    url: pageUrl,
    location: {
      streetAddress: location.streetAddress,
      city: location.city,
      state: location.state,
      postalCode: location.postalCode,
      country: location.country,
      latitude: location.latitude,
      longitude: location.longitude,
      phone: location.phone,
    },
  })

  const faqSchema =
    page.faqs.length > 0 ? generateFAQPageSchema(page.faqs) : null

  return (
    <>
      <JsonLd data={legalServiceSchema} />
      {faqSchema && <JsonLd data={faqSchema} />}

      {/* Hero */}
      <div className="bg-gradient-to-b from-navy-950 via-navy-900 to-navy-900 pt-32 pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <Breadcrumbs
            items={[
              { name: page.cityName, url: `/locations/${configPage.locationSlug}` },
              { name: page.practiceLabel, url: `/${city}/${practiceSlug}` },
            ]}
            className="mb-8"
          />
          <ScrollReveal className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-display font-bold text-warmWhite mb-6">
              {page.title}
            </h1>
            <p className="text-xl text-warmWhite/80 leading-relaxed mb-8">
              {page.description}
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
      </div>

      {/* MDX Content */}
      <div className="bg-navy-950 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <article className="prose prose-lg max-w-none">
            <MDXRemote source={page.content} components={mdxComponents} />
          </article>
        </div>
      </div>

      {/* FAQ Section */}
      {page.faqs.length > 0 && (
        <div className="bg-navy-950 py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
            <h2 className="text-3xl font-display font-bold text-warmWhite mb-8 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {page.faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="bg-navy-900/50 border border-navy-700 rounded-xl p-6"
                >
                  <h3 className="text-lg font-display font-semibold text-warmWhite mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-warmWhite/70 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Related Links */}
      <div className="bg-navy-900 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm">
            <Link
              href={`/locations/${configPage.locationSlug}`}
              className="text-warmWhite/70 hover:text-gold-500 transition-colors"
            >
              {configPage.cityName} Office &rarr;
            </Link>
            <span className="hidden sm:inline text-warmWhite/30">|</span>
            <Link
              href="/practice-areas"
              className="text-warmWhite/70 hover:text-gold-500 transition-colors"
            >
              All Practice Areas &rarr;
            </Link>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-navy-950 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl text-center">
          <h2 className="text-3xl font-display font-bold text-warmWhite mb-4">
            Injured in {page.cityName}? Get Your Free Case Evaluation.
          </h2>
          <p className="text-warmWhite/70 mb-8">
            No fee unless we win. Contact S. Williams Law Firm today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact">
              <Button size="lg" variant="primary">
                Free Case Evaluation
              </Button>
            </Link>
            <PhoneNumber className="inline-flex items-center justify-center px-6 py-3 border border-gold-500/50 text-warmWhite hover:bg-gold-500/10 rounded-md transition-colors text-base font-medium" />
          </div>
        </div>
      </div>
    </>
  )
}
