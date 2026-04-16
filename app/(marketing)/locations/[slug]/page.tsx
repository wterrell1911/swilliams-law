import { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Breadcrumbs } from "@/components/seo/Breadcrumbs"
import { ScrollReveal } from "@/components/animations/ScrollReveal"
import { Button } from "@/components/ui/Button"
import { PhoneNumber } from "@/components/PhoneNumber"
import { MDXRemote } from "next-mdx-remote/rsc"
import { getLocation } from "@/lib/locations"
import { firmConfig } from "@/config/firm.config"
import { mdxComponents } from "@/components/blog/MDXComponents"
import { JsonLd } from "@/components/seo/JsonLd"
import { generateLocationSchema } from "@/lib/structured-data"

interface Props {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return firmConfig.locations
    .filter((loc) => loc.hasLocationPage)
    .map((loc) => ({ slug: loc.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const location = getLocation(slug)
  if (!location) return {}

  return {
    title: location.seoTitle,
    description: location.description,
  }
}

export default async function LocationPage({ params }: Props) {
  const { slug } = await params
  const location = getLocation(slug)
  const locationData = firmConfig.locations.find((loc) => loc.slug === slug)

  if (!location || !locationData) {
    notFound()
  }

  const locationSchema = generateLocationSchema({
    name: locationData.name,
    streetAddress: locationData.streetAddress,
    city: locationData.city,
    state: locationData.state,
    postalCode: locationData.postalCode,
    country: locationData.country,
    latitude: locationData.latitude,
    longitude: locationData.longitude,
    phone: locationData.phone,
    slug: locationData.slug,
  })

  return (
    <>
      <JsonLd data={locationSchema} />

      {/* Hero */}
      <div className="bg-gradient-to-b from-navy-950 via-navy-900 to-navy-900 pt-32 pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <Breadcrumbs
            items={[
              { name: "Locations", url: "/locations" },
              { name: locationData.name, url: `/locations/${slug}` },
            ]}
            className="mb-8"
          />
          <ScrollReveal className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-display font-bold text-warmWhite mb-6">
              {location.title}
            </h1>
            <p className="text-xl text-warmWhite/80 leading-relaxed mb-4">
              {location.description}
            </p>
            <div className="text-warmWhite/60 text-sm mb-8">
              <p>{locationData.streetAddress}</p>
              <p>{locationData.city}, {locationData.state} {locationData.postalCode}</p>
              <p className="mt-2">{locationData.phone}</p>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact">
                <Button size="lg" variant="primary">
                  Free Case Evaluation
                </Button>
              </Link>
              <a href={`tel:${locationData.phone.replace(/\D/g, "")}`}>
                <Button size="lg" variant="outline">
                  Call {locationData.phone}
                </Button>
              </a>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Content */}
      <div className="bg-warmWhite py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <article className="prose prose-lg prose-navy max-w-none">
            <MDXRemote source={location.content} components={mdxComponents} />
          </article>
        </div>
      </div>

      {/* Service Areas */}
      <div className="bg-navy-950 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl text-center">
          <h2 className="text-2xl font-display font-bold text-warmWhite mb-8">
            Areas We Serve from {locationData.name}
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {locationData.servesAreas.map((area) => (
              <span
                key={area}
                className="px-4 py-2 bg-navy-900 border border-navy-700/50 rounded-lg text-warmWhite/80 text-sm"
              >
                {area}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-navy-900 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl text-center">
          <h2 className="text-3xl font-display font-bold text-warmWhite mb-4">
            Injured in {locationData.city}? We Can Help.
          </h2>
          <p className="text-warmWhite/70 mb-8">
            Contact our {locationData.name} office for a free case evaluation.
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
