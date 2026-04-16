import { HeroSection } from "@/components/home/HeroSection"
import { CredibilityBar } from "@/components/home/CredibilityBar"
import { PositioningStatement } from "@/components/home/PositioningStatement"
import { ThreePillarsSection } from "@/components/home/ThreePillarsSection"
import { WhyChooseUsSection } from "@/components/home/Why302Section"
import { StatBlockSection } from "@/components/home/StatBlockSection"
import { TestimonialSection } from "@/components/home/TestimonialSection"
import { ProcessSection } from "@/components/home/ProcessSection"
import { GuaranteeSection } from "@/components/home/GuaranteeSection"
import { FAQSection } from "@/components/home/FAQSection"
import { FinalCTASection } from "@/components/home/FinalCTASection"
import { JsonLd } from "@/components/seo/JsonLd"
import { generateFAQPageSchema } from "@/lib/structured-data"
import { firmConfig } from "@/config/firm.config"

export default function Home() {
  const faqSchema = generateFAQPageSchema(firmConfig.faqs)

  return (
    <>
      <JsonLd data={faqSchema} />
      <HeroSection />
      <CredibilityBar />
      <PositioningStatement />
      <ThreePillarsSection />
      <StatBlockSection />
      <TestimonialSection />
      <WhyChooseUsSection />
      <ProcessSection />
      <GuaranteeSection />
      <FAQSection />
      <FinalCTASection />
    </>
  )
}
