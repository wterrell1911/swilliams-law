import type { Metadata } from "next"
import { ScrollReveal } from "@/components/animations/ScrollReveal"
import { Breadcrumbs } from "@/components/seo/Breadcrumbs"
import { OnboardForm } from "@/components/forms/OnboardForm"
import { pageMetadata } from "@/config/seo"

export const metadata: Metadata = {
  title: pageMetadata.onboard.title,
  description: pageMetadata.onboard.description,
  keywords: pageMetadata.onboard.keywords,
}

export default function OnboardPage() {
  return (
    <>
      {/* Hero - Dark */}
      <div className="bg-gradient-to-b from-navy-950 via-navy-900 to-navy-900 pt-32 pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <Breadcrumbs items={[{ name: "Onboard", url: "/onboard" }]} className="mb-8" />

          <ScrollReveal className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl sm:text-6xl font-display font-bold text-warmWhite mb-6">
              Welcome <span className="text-gradient">Aboard</span>
            </h1>
            <p className="text-xl text-warmWhite/80 leading-relaxed">
              Let&apos;s get everything we need to hit the ground running. This takes about 10 minutes.
            </p>
          </ScrollReveal>
        </div>
      </div>

      {/* Content - Light */}
      <div className="bg-stone-50 py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <OnboardForm />
        </div>
      </div>
    </>
  )
}
