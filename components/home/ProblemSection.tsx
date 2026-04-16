"use client"

import { ScrollReveal, ScrollRevealItem } from "@/components/animations/ScrollReveal"
import { Card } from "@/components/ui/Card"

const painPoints = [
  { icon: "📧", text: "Chase leads who never call back" },
  { icon: "📅", text: "Manage your own calendar & scheduling" },
  { icon: "💰", text: "Send invoices at midnight" },
  { icon: "📁", text: "File documents manually" },
  { icon: "🔍", text: "Wonder why your website doesn&apos;t rank" },
  { icon: "📞", text: "Miss calls because you&apos;re in court" },
]

export function ProblemSection() {
  return (
    <section className="py-20 bg-stone-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <ScrollReveal className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-navy-900 mb-4">
            You didn&apos;t go to law school to...
          </h2>
        </ScrollReveal>

        <ScrollReveal stagger staggerDelay={0.1}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {painPoints.map((item) => (
              <ScrollRevealItem key={item.text}>
                <Card variant="bordered" className="p-5 bg-white flex items-center gap-4">
                  <span className="text-2xl">{item.icon}</span>
                  <span className="text-navy-900/80 font-medium">{item.text}</span>
                </Card>
              </ScrollRevealItem>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
