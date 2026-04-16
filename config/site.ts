// TODO: Phase 2 — replace with reads from firm.config.ts via @/lib/firm-config
export const siteConfig = {
  name: "[Firm Name]",
  description: "Law firm website powered by the lawfirm-template.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ogImage: "/og/default.jpg",
  links: {
    twitter: "",
    linkedin: "",
  },
  contact: {
    email: "contact@example.com",
    phone: "(555) 000-0000",
  },
  company: {
    legalName: "[Firm Legal Name]",
    foundingYear: 2020,
    address: {
      streetAddress: "123 Main Street",
      city: "Anytown",
      state: "ST",
      postalCode: "00000",
      country: "US",
    },
  },
}
