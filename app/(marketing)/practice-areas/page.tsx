import { Metadata } from "next"
import Link from "next/link"
import { Breadcrumbs } from "@/components/seo/Breadcrumbs"
import { ScrollReveal } from "@/components/animations/ScrollReveal"
import { firmConfig } from "@/config/firm.config"

export const metadata: Metadata = {
  title: "Practice Areas | S. Williams Law Firm",
  description:
    "S. Williams Law Firm handles car accidents, truck accidents, workers' compensation, slip and fall, and wrongful death cases across Georgia and Mississippi.",
}

export default function PracticeAreasPage() {
  return (
    <>
      <div className="bg-gradient-to-b from-navy-950 via-navy-900 to-navy-900 pt-32 pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <Breadcrumbs items={[{ name: "Practice Areas", url: "/practice-areas" }]} className="mb-8" />
          <ScrollReveal className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl sm:text-6xl font-display font-bold text-warmWhite mb-6">
              Practice <span className="text-gold-500">Areas</span>
            </h1>
            <p className="text-xl text-warmWhite/80 leading-relaxed">
              We focus exclusively on personal injury and workers&apos; compensation cases across Georgia and Mississippi.
            </p>
          </ScrollReveal>
        </div>
      </div>

      <div className="bg-warmWhite py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {firmConfig.practiceAreas.map((area) => (
              <Link key={area.slug} href={`/practice-areas/${area.slug}`} className="block group">
                <div className="bg-white border border-navy-900/10 rounded-xl p-8 h-full hover:shadow-lg hover:border-gold-500/30 transition-all">
                  <h2 className="text-2xl font-display font-bold text-navy-900 mb-3 group-hover:text-gold-500 transition-colors">
                    {area.name}
                  </h2>
                  <p className="text-navy-700 leading-relaxed mb-4">
                    {area.shortDescription}
                  </p>
                  <span className="text-gold-500 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                    Learn More
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
