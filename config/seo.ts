// TODO: Phase 3 — replace hardcoded titles with reads from firm.config.ts

export const seoKeywords = {
  primary: [
    "law firm",
    "attorney",
    "legal services",
    "lawyer",
  ],
  secondary: [
    "personal injury attorney",
    "legal consultation",
    "free case evaluation",
  ],
}

export const defaultSEO = {
  title: "[Firm Name] | Attorneys at Law",
  description:
    "Experienced attorneys serving your community. Contact us for a free consultation.",
  keywords: [...seoKeywords.primary, ...seoKeywords.secondary],
}

export const pageMetadata = {
  home: {
    title: "[Firm Name] | Attorneys at Law",
    description:
      "Experienced attorneys serving your community. Contact us for a free consultation.",
    keywords: [
      "law firm",
      "attorney",
      "legal services",
      "free consultation",
    ],
  },
  pricing: {
    title: "Our Services | [Firm Name]",
    description:
      "Learn about our legal services and practice areas. Free initial consultation available.",
    keywords: [
      "legal services",
      "practice areas",
      "free consultation",
    ],
  },
  blog: {
    title: "Legal Insights | [Firm Name] Blog",
    description:
      "Expert legal insights and updates from our attorneys.",
    keywords: [
      "legal blog",
      "attorney insights",
      "legal updates",
    ],
  },
  contact: {
    title: "Contact Us | [Firm Name]",
    description:
      "Contact our attorneys for a free consultation. We're here to help with your legal needs.",
    keywords: ["contact attorney", "free consultation", "legal help"],
  },
  onboard: {
    title: "Client Onboarding | [Firm Name]",
    description:
      "Complete your client onboarding to get started with our firm.",
    keywords: ["client onboarding", "new client"],
  },
}
