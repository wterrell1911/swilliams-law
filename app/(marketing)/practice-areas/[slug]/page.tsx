import { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Breadcrumbs } from "@/components/seo/Breadcrumbs"
import { ScrollReveal } from "@/components/animations/ScrollReveal"
import { Button } from "@/components/ui/Button"
import { PhoneNumber } from "@/components/PhoneNumber"
import { MDXRemote } from "next-mdx-remote/rsc"
import { getPracticeArea, getAllPracticeAreas } from "@/lib/practice-areas"
import { firmConfig } from "@/config/firm.config"
import { mdxComponents } from "@/components/blog/MDXComponents"
import { JsonLd } from "@/components/seo/JsonLd"
import { generateServiceSchema } from "@/lib/structured-data"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const areas = getAllPracticeAreas()
  return areas.map((area) => ({ slug: area.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const area = getPracticeArea(slug)
  if (!area) return {}

  return {
    title: area.seoTitle,
    description: area.description,
  }
}

export default async function PracticeAreaPage({ params }: Props) {
  const { slug } = await params
  const area = getPracticeArea(slug)

  if (!area) {
    notFound()
  }

  const relatedAreas = area.relatedAreas
    .map((s) => firmConfig.practiceAreas.find((pa) => pa.slug === s))
    .filter(Boolean)

  const serviceSchema = generateServiceSchema({
    name: area.title,
    description: area.description,
    areaServed: "Georgia and Mississippi",
  })

  return (
    <>
      <JsonLd data={serviceSchema} />

      {/* Hero */}
      <div className="bg-gradient-to-b from-navy-950 via-navy-900 to-navy-900 pt-32 pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <Breadcrumbs
            items={[
              { name: "Practice Areas", url: "/practice-areas" },
              { name: area.title, url: `/practice-areas/${slug}` },
            ]}
            className="mb-8"
          />
          <ScrollReveal className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-display font-bold text-warmWhite mb-6">
              {area.heroHeading}
            </h1>
            <p className="text-xl text-warmWhite/80 leading-relaxed mb-8">
              {area.description}
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

      {/* Content */}
      <div className="bg-warmWhite py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <article className="prose prose-lg prose-navy max-w-none">
            <MDXRemote source={area.content} components={mdxComponents} />
          </article>
        </div>
      </div>

      {/* Related Practice Areas */}
      {relatedAreas.length > 0 && (
        <div className="bg-navy-950 py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
            <h2 className="text-2xl font-display font-bold text-warmWhite mb-8 text-center">
              Related Practice Areas
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
              {relatedAreas.map((ra) => ra && (
                <Link key={ra.slug} href={`/practice-areas/${ra.slug}`} className="block group">
                  <div className="bg-navy-900 border border-navy-700/50 rounded-xl p-6 hover:border-gold-500/50 transition-all">
                    <h3 className="text-lg font-display font-semibold text-warmWhite group-hover:text-gold-500 transition-colors">
                      {ra.name}
                    </h3>
                    <p className="text-warmWhite/60 text-sm mt-2">{ra.shortDescription}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="bg-navy-900 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl text-center">
          <h2 className="text-3xl font-display font-bold text-warmWhite mb-4">
            Injured? Get Your Free Case Evaluation.
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
