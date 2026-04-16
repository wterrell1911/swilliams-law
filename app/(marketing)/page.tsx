import { HeroSection } from "@/components/home/HeroSection"
import { CredibilityBar } from "@/components/home/CredibilityBar"
import { PositioningStatement } from "@/components/home/PositioningStatement"
import { ThreePillarsSection } from "@/components/home/ThreePillarsSection"
import { WhyChooseUsSection } from "@/components/home/Why302Section"
import { StatBlockSection } from "@/components/home/StatBlockSection"
import { GuaranteeSection } from "@/components/home/GuaranteeSection"
import { FAQSection } from "@/components/home/FAQSection"
import { FinalCTASection } from "@/components/home/FinalCTASection"

export default function Home() {
  return (
    <>
      <HeroSection />
      <CredibilityBar />
      <PositioningStatement />
      <ThreePillarsSection />
      <WhyChooseUsSection />
      <StatBlockSection />
      <GuaranteeSection />
      <FAQSection />
      <FinalCTASection />
    </>
  )
}
