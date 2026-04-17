import { Metadata } from "next"
import { Breadcrumbs } from "@/components/seo/Breadcrumbs"
import { ScrollReveal } from "@/components/animations/ScrollReveal"
import { PracticeAreaCityGrid } from "@/components/home/PracticeAreaCityGrid"

export const metadata: Metadata = {
  title: "Practice Areas | S. Williams Law Firm",
  description:
    "S. Williams Law Firm handles personal injury, car accidents, workers' compensation, slip and fall, and wrongful death cases across Georgia and Mississippi.",
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
              We focus exclusively on personal injury and workers&apos; compensation cases across Georgia and Mississippi. Select your location below.
            </p>
          </ScrollReveal>
        </div>
      </div>

      <div className="bg-warmWhite py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <PracticeAreaCityGrid />
        </div>
      </div>
    </>
  )
}
