"use client"

import Image from "next/image"
import Link from "next/link"
import { ScrollReveal, ScrollRevealItem } from "@/components/animations/ScrollReveal"
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"

const pillars = [
  {
    category: "GET TIME BACK",
    image: "/images/homepage/practice-automation.jpg",
    title: "Practice Automation",
    description: "We map your intake, scheduling, follow-up, and billing workflows, then build automation that runs them without you. Built around your practice management software. Not templates.",
    price: "From $1,250/mo",
    href: "/services/automation",
    primary: true,
  },
  {
    category: "GET A SIDEKICK",
    image: "/images/homepage/ai-assistant.jpg",
    title: "AI Assistant",
    description: "A custom AI assistant trained on your practice areas and intake process. It handles after-hours inquiries, qualifies leads, and captures intake data. Built with attorney-client confidentiality as a hard requirement.",
    price: "From $1,000/mo",
    href: "/services/ai-assistant",
    primary: true,
  },
  {
    category: "LOOK PRO",
    image: "/images/homepage/website-redesign.jpg",
    title: "Website Redesign",
    description: "Fast, clean, and built to convert visitors into consultations. Not a template. Designed for your practice area and your market. Delivered in 30 days.",
    price: "$500 base (requires another service)",
    href: "/services/websites",
    primary: true,
  },
  {
    category: "GET FOUND",
    image: "/images/homepage/digital-marketing-seo.jpg",
    title: "Digital Visibility",
    description: "AI-powered local SEO and generative search optimization. Get found on Google and in AI tools like ChatGPT and Perplexity. Add-on service for clients who want to build visibility alongside their automation stack.",
    price: "From $597/mo",
    href: "/services/marketing",
    primary: false,
  },
]

export function ThreePillarsSection() {
  return (
    <section className="py-20 bg-navy-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <ScrollReveal className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-warmWhite mb-4">
            Four ways we help your practice run better.
          </h2>
          <p className="text-lg text-warmWhite/60 max-w-2xl mx-auto">
            Pick one, start there. Most clients add more over time.
          </p>
        </ScrollReveal>

        <ScrollReveal stagger staggerDelay={0.15}>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pillar) => (
              <ScrollRevealItem key={pillar.title}>
                <Card 
                  variant="bordered" 
                  className={`p-6 h-full flex flex-col hover:border-gold-500/50 transition-colors overflow-hidden ${
                    pillar.primary 
                      ? "bg-navy-800/50 border-navy-700" 
                      : "bg-navy-800/30 border-navy-700/50 opacity-90"
                  }`}
                >
                  <p className="text-xs font-bold uppercase tracking-wider text-gold-500 mb-4">
                    {pillar.category}
                  </p>
                  <div className="relative w-full h-40 mb-4 rounded-lg overflow-hidden">
                    <Image
                      src={pillar.image}
                      alt={pillar.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-warmWhite mb-3">{pillar.title}</h3>
                  <p className="text-warmWhite/60 mb-4 flex-grow text-sm">{pillar.description}</p>
                  <p className="text-lg font-semibold text-gold-500 mb-4">{pillar.price}</p>
                  <Link href={pillar.href}>
                    <Button variant="outline" className="w-full">
                      Learn More
                    </Button>
                  </Link>
                </Card>
              </ScrollRevealItem>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
