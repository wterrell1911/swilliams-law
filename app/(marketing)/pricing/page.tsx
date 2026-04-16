import { Metadata } from "next"
import { pageMetadata } from "@/config/seo"
import { PricingTabs } from "@/components/services/PricingTabs"

export const metadata: Metadata = {
  title: pageMetadata.pricing.title,
  description: pageMetadata.pricing.description,
  keywords: pageMetadata.pricing.keywords,
}

export default function PricingPage() {
  return <PricingTabs />
}
