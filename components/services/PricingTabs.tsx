"use client"

import Image from "next/image"
import Link from "next/link"
import { ScrollReveal, ScrollRevealItem } from "@/components/animations/ScrollReveal"
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { cn } from "@/lib/utils"

interface PricingTier {
  name: string
  price: string
  period: string
  description: string
  features: string[]
  cta: string
  highlight: boolean
  badge?: string
  note?: string
  image?: string
  paymentLink?: string
}

function PricingCard({ tier }: { tier: PricingTier }) {
  return (
    <Card
      variant="bordered"
      className={cn(
        "p-6 h-full relative flex flex-col",
        tier.highlight
          ? "border-2 border-gold-500 bg-navy-800"
          : "bg-navy-800/50"
      )}
    >
      {tier.badge && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold-500 text-navy-950 text-xs font-bold px-3 py-1 rounded-full uppercase">
          {tier.badge}
        </span>
      )}
      {tier.image && (
        <div className="relative w-full h-32 mb-4 rounded-lg overflow-hidden">
          <Image
            src={tier.image}
            alt={tier.name}
            fill
            className="object-cover"
          />
        </div>
      )}
      <div className="text-center mb-6">
        <h3 className="text-lg font-bold text-warmWhite mb-2">{tier.name}</h3>
        <div className="text-3xl font-display font-bold text-gold-500">
          {tier.price}
          <span className="text-base text-warmWhite/60 ml-1">{tier.period}</span>
        </div>
        <p className="text-sm text-warmWhite/60 mt-1">{tier.description}</p>
      </div>
      <ul className="space-y-2 mb-6 flex-grow">
        {tier.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2 text-sm text-warmWhite/80">
            <svg className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            {feature}
          </li>
        ))}
      </ul>
      {tier.note && (
        <p className="text-xs text-warmWhite/50 text-center mb-4">{tier.note}</p>
      )}
      <Link href={tier.paymentLink || "/contact"} target="_blank" rel="noopener noreferrer">
        <Button variant={tier.highlight ? "primary" : "outline"} className="w-full">
          {tier.cta}
        </Button>
      </Link>
    </Card>
  )
}

// Website Pricing
const websitePricing: PricingTier = {
  name: "Website Redesign",
  price: "$500",
  period: "flat rate",
  description: "A fast, professional site that converts",
  features: [
    "Custom design (not a template)",
    "Up to 7 pages: Home, About, Practice Areas, Contact, Blog",
    "Mobile-optimized and fast-loading",
    "Contact form + consult booking integration",
    "Basic on-page SEO setup",
    "30 days of edits included",
  ],
  cta: "Get Started",
  highlight: true,
  image: "/images/pricing/website-redesign.jpg",
  note: "Available as add-on with any monthly retainer",
  paymentLink: "/contact",
}

// AI Services Pricing
const aiServicesPricing: PricingTier[] = [
  {
    name: "AI Compliance Kit",
    price: "$497",
    period: "one-time",
    description: "Use AI ethically, starting tomorrow",
    features: [
      "AI waiver for engagement letters",
      "Data handling documentation",
      "Client consent template",
      "30-min setup consultation",
    ],
    cta: "Get Started",
    highlight: false,
    image: "/images/pricing/ai-compliance.jpg",
    paymentLink: "/contact",
  },
  {
    name: "Practice Skills Package",
    price: "$1,497",
    period: "one-time",
    description: "Your judgment, encoded",
    features: [
      "3-5 custom AI skill files",
      "90-min judgment extraction session",
      "Contract review, comms, research",
      "Claude-ready instruction files",
    ],
    cta: "Build My Skills",
    highlight: true,
    badge: "Popular for AI",
    image: "/images/pricing/practice-skills.jpg",
    paymentLink: "/contact",
  },
  {
    name: "Skills + Training",
    price: "$2,497",
    period: "one-time",
    description: "Learn to fish",
    features: [
      "Everything in Practice Skills",
      "2-hour prompting workshop",
      "Reference guide (Chat/Cowork/Code)",
      "30-day email support",
    ],
    cta: "Learn More",
    highlight: false,
    image: "/images/pricing/skills-training.jpg",
    paymentLink: "/contact",
  },
]

// Monthly Services Pricing
const monthlyPricing: PricingTier[] = [
  {
    name: "AI Automation",
    price: "$1,250",
    period: "/mo",
    description: "Your entire practice, automated",
    features: [
      "Clio, MyCase, Lawmatics integration",
      "Google Workspace automation (email, calendar, Drive)",
      "AI email triage + deadline extraction",
      "Intake → case folder + PM software sync",
      "Claude Code Desktop setup + training",
      "Weekly AI-generated activity reports",
    ],
    cta: "Get Started",
    highlight: true,
    badge: "Most Popular",
    note: "+ $1,500 one-time setup",
    image: "/images/pricing/ai-automation.jpg",
    paymentLink: "/contact",
  },
]

// Add-ons
const addOnPricing: PricingTier[] = [
  {
    name: "SEO + GEO",
    price: "$597",
    period: "/mo",
    description: "Get found on Google and AI search",
    features: [
      "On-page SEO optimization",
      "Google Business Profile management",
      "GEO optimization for ChatGPT, Perplexity, AI Overviews",
      "2 SEO-optimized blog posts per month",
      "Monthly ranking and visibility report",
      "Local citation building",
    ],
    cta: "Add to Plan",
    highlight: true,
    badge: "Add-On",
    image: "/images/pricing/seo-essentials.jpg",
    paymentLink: "/contact",
  },
  {
    name: "Skill Maintenance",
    price: "$297",
    period: "/mo",
    description: "Keep your AI skills sharp",
    features: [
      "Ongoing skill refinement",
      "New skills as needed (1-2/qtr)",
      "Priority support",
    ],
    cta: "Add to Plan",
    highlight: false,
    image: "/images/pricing/skill-maintenance.jpg",
    paymentLink: "/contact",
  },
]

export function PricingTabs() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 bg-gradient-to-b from-navy-950 via-navy-900 to-navy-900 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <Image
            src="/images/pricing/hero.jpg"
            alt="Digital transformation for law firms"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy-950/80 via-navy-900/90 to-navy-900" />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <ScrollReveal className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-warmWhite mb-6">
              Transparent pricing. No surprises. No contracts.
            </h1>
            <p className="text-lg text-warmWhite/70 mb-4">
              Every service is month-to-month. You stay because it&apos;s working, not because you&apos;re locked in.
            </p>
            <p className="text-gold-500 font-semibold">
              90-Day Results Guarantee: See improvement or your second month is free.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Website Section */}
      <section className="py-16 bg-navy-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <ScrollReveal className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-warmWhite mb-4">
              Website
            </h2>
            <p className="text-warmWhite/60">
              A modern, conversion-focused website built for your firm
            </p>
          </ScrollReveal>
          <div className="max-w-md mx-auto">
            <ScrollReveal>
              <PricingCard tier={websitePricing} />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* AI Services Section */}
      <section className="py-16 bg-navy-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <ScrollReveal className="text-center mb-12">
            <div className="relative w-full h-48 mb-8 rounded-xl overflow-hidden max-w-3xl mx-auto">
              <Image
                src="/images/pricing/ai-services.jpg"
                alt="AI Services"
                fill
                className="object-cover"
              />
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-warmWhite mb-4">
              AI Services
            </h2>
            <p className="text-warmWhite/60">
              Get set up to use AI ethically and effectively
            </p>
          </ScrollReveal>
          <ScrollReveal stagger staggerDelay={0.1}>
            <div className="grid md:grid-cols-3 gap-6">
              {aiServicesPricing.map((tier) => (
                <ScrollRevealItem key={tier.name}>
                  <PricingCard tier={tier} />
                </ScrollRevealItem>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Monthly Services Section */}
      <section className="py-16 bg-navy-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <ScrollReveal className="text-center mb-12">
            <div className="relative w-full h-48 mb-8 rounded-xl overflow-hidden max-w-3xl mx-auto">
              <Image
                src="/images/pricing/monthly-services.jpg"
                alt="Monthly Services"
                fill
                className="object-cover"
              />
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-warmWhite mb-4">
              Practice Automation
            </h2>
            <p className="text-warmWhite/60">
              Your entire practice, running on autopilot
            </p>
          </ScrollReveal>
          <div className="max-w-md mx-auto">
            {monthlyPricing.map((tier) => (
              <ScrollReveal key={tier.name}>
                <PricingCard tier={tier} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Full Stack Bundle */}
      <section className="py-16 bg-navy-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <ScrollReveal className="text-center">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-warmWhite mb-4">
              The Full Stack
            </h2>
            <p className="text-warmWhite/60 mb-8 max-w-2xl mx-auto">
              Everything your firm needs to get found, convert leads, and save time — in one package.
            </p>
            <Card variant="bordered" className="p-8 bg-navy-800 border-2 border-gold-500 overflow-hidden">
              <div className="relative w-full h-48 -mx-8 -mt-8 mb-6">
                <Image
                  src="/images/pricing/full-stack.jpg"
                  alt="The Full Stack"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="inline-block bg-gold-500 text-navy-950 text-xs font-bold px-3 py-1 rounded-full uppercase mb-4">
                Best Value
              </span>
              <p className="text-warmWhite/70 mb-2">AI Automation + Website + SEO/GEO — the complete package</p>
              <div className="text-4xl font-display font-bold text-warmWhite mb-2">
                $1,997<span className="text-lg text-warmWhite/60">/mo</span>
              </div>
              <p className="text-warmWhite/60 mb-2">+ $1,500 one-time setup (includes website)</p>
              <p className="text-green-400 font-semibold mb-6">Save $350/mo vs. à la carte</p>
              
              <div className="grid md:grid-cols-3 gap-6 text-left text-sm text-warmWhite/80 mb-8">
                <div>
                  <div className="font-semibold text-warmWhite mb-2">AI AUTOMATION</div>
                  <ul className="space-y-1">
                    <li>✓ 24/7 AI Client Assistant</li>
                    <li>✓ Smart Lead Routing</li>
                    <li>✓ Intake Automation</li>
                    <li>✓ Billing Reminders</li>
                  </ul>
                </div>
                <div>
                  <div className="font-semibold text-warmWhite mb-2">WEBSITE</div>
                  <ul className="space-y-1">
                    <li>✓ Custom design</li>
                    <li>✓ Mobile-optimized</li>
                    <li>✓ Consult booking</li>
                    <li>✓ 30 days of edits</li>
                  </ul>
                </div>
                <div>
                  <div className="font-semibold text-warmWhite mb-2">SEO + GEO</div>
                  <ul className="space-y-1">
                    <li>✓ On-page SEO</li>
                    <li>✓ AI search optimization</li>
                    <li>✓ Google Business Profile</li>
                    <li>✓ Monthly reporting</li>
                  </ul>
                </div>
              </div>
              <Link href="/contact" target="_blank" rel="noopener noreferrer">
                <Button variant="primary" size="lg">
                  Get The Full Stack
                </Button>
              </Link>
            </Card>
          </ScrollReveal>
        </div>
      </section>

      {/* Add-Ons Section */}
      <section className="py-16 bg-navy-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <ScrollReveal className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-warmWhite mb-4">
              Add-Ons
            </h2>
            <p className="text-warmWhite/60">
              Enhance any service with these optional additions
            </p>
          </ScrollReveal>
          <ScrollReveal stagger staggerDelay={0.1}>
            <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {addOnPricing.map((tier) => (
                <ScrollRevealItem key={tier.name}>
                  <PricingCard tier={tier} />
                </ScrollRevealItem>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Free Audit CTA */}
      <section className="py-16 bg-gradient-to-b from-navy-900 to-navy-950 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <ScrollReveal>
            <Card variant="bordered" className="p-8 bg-navy-800/50 text-center overflow-hidden">
              <div className="relative w-full h-48 -mx-8 -mt-8 mb-6">
                <Image
                  src="/images/pricing/free-audit.jpg"
                  alt="Free Audit"
                  fill
                  className="object-cover"
                />
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-warmWhite mb-4">
                Not sure where to start?
              </h2>
              <p className="text-warmWhite/60 mb-8 max-w-xl mx-auto">
                Get a free audit of your website and workflow. We&apos;ll show you exactly what to fix first.
              </p>
              <Link href="/contact" target="_blank" rel="noopener noreferrer">
                <Button variant="primary" size="lg">
                  Get Your Free Audit
                </Button>
              </Link>
            </Card>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
