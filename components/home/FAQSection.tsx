"use client"

import { FAQAccordion, FAQItem } from "@/components/ui/FAQAccordion"
import { ScrollReveal } from "@/components/animations/ScrollReveal"

const faqs: FAQItem[] = [
  {
    question: "How is this different from a regular marketing agency?",
    answer: "Most agencies treat law firms like any other client. Our team was built by professionals who have worked inside law firms. We understand intake workflows, ethics requirements, and the client relationship dynamics that make legal different from every other industry. That is not something you can teach in a vertical.",
  },
  {
    question: "How is this different from Clio, MyCase, or Filevine AI features?",
    answer: "Those are AI features added to practice management software — helpful, but limited to what their platform allows. You cannot build custom workflows, cannot encode your specific expertise, and you are dependent on their roadmap. We build AI capability that is yours: custom workflows for your practice areas, automations that match your processes, and infrastructure that compounds over time. When you leave a wrapper, you start over. When you build with us, you keep everything.",
  },
  {
    question: "How quickly will I see results?",
    answer: "Automation results are often visible in the first 30 days. Fewer missed leads, faster intake, less manual work. AI assistant results follow quickly after setup. We back everything with our 90-day results guarantee.",
  },
  {
    question: "Is the AI assistant secure for client information?",
    answer: "Yes. Every system we build is designed with attorney-client confidentiality as a hard requirement. We do not use client data to train models. Our AI assistants are built to avoid collecting sensitive information without proper intake protocols in place. We know the rules because we have practiced under them.",
  },
  {
    question: "Do I need to provide content or can you handle that?",
    answer: "We handle it. Our content is written with legal accuracy in mind. We research your practice areas, your market, and your competitors before we write anything.",
  },
  {
    question: "What if I am not happy?",
    answer: "No contracts. Cancel any month. If you are within your first 90 days and have not seen the results we projected, your second month is free while we fix it. We would rather earn your business every month than lock you in.",
  },
]

export function FAQSection() {
  return (
    <section className="py-20 bg-navy-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <ScrollReveal className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-warmWhite mb-4">
            FAQs
          </h2>
          <p className="text-lg text-warmWhite/60">
            Everything you need to know about working with us
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <FAQAccordion items={faqs} allowMultiple={false} />
        </ScrollReveal>
      </div>
    </section>
  )
}
