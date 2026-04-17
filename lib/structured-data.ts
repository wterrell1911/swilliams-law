import { siteConfig } from "@/config/site"
import { firmConfig } from "@/config/firm.config"
import { WithContext, Organization, LocalBusiness, Service, Article, BreadcrumbList, FAQPage, Person } from "schema-dts"

export function generateOrganizationSchema(): WithContext<Organization> {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    legalName: siteConfig.company.legalName,
    url: siteConfig.url,
    logo: `${siteConfig.url}/images/swilliamslaw/logo.png`,
    foundingDate: siteConfig.company.foundingYear.toString(),
    description: siteConfig.description,
    email: siteConfig.contact.email,
    telephone: siteConfig.contact.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.company.address.streetAddress,
      addressLocality: siteConfig.company.address.city,
      addressRegion: siteConfig.company.address.state,
      postalCode: siteConfig.company.address.postalCode,
      addressCountry: siteConfig.company.address.country,
    },
    ...(siteConfig.links.twitter || siteConfig.links.linkedin
      ? { sameAs: [siteConfig.links.twitter, siteConfig.links.linkedin].filter(Boolean) }
      : {}),
  }
}

export function generateLocalBusinessSchema(): WithContext<LocalBusiness> {
  const primaryLocation = firmConfig.locations[0]

  return {
    "@context": "https://schema.org",
    "@type": "LegalService",
    "@id": siteConfig.url,
    name: siteConfig.name,
    image: `${siteConfig.url}/images/swilliamslaw/logo.png`,
    url: siteConfig.url,
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: primaryLocation.streetAddress,
      addressLocality: primaryLocation.city,
      addressRegion: primaryLocation.state,
      postalCode: primaryLocation.postalCode,
      addressCountry: primaryLocation.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: primaryLocation.latitude,
      longitude: primaryLocation.longitude,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "17:00",
    },
    priceRange: "Free Consultation",
    areaServed: [
      { "@type": "State", name: "Georgia" },
      { "@type": "State", name: "Mississippi" },
    ],
  } as WithContext<LocalBusiness>
}

export function generateServiceSchema(service: {
  name: string
  description: string
  areaServed?: string
  offers?: {
    price: string
    priceCurrency: string
  }
}): WithContext<Service> {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.name,
    provider: {
      "@type": "LegalService",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    description: service.description,
    areaServed: service.areaServed || "Georgia and Mississippi",
    offers: service.offers
      ? {
          "@type": "Offer",
          price: service.offers.price,
          priceCurrency: service.offers.priceCurrency,
        }
      : undefined,
  }
}

export function generateArticleSchema(article: {
  headline: string
  description: string
  image: string
  datePublished: string
  dateModified?: string
  author: string
  url: string
}): WithContext<Article> {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.headline,
    description: article.description,
    image: article.image,
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
    author: {
      "@type": "Person",
      name: article.author,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/images/swilliamslaw/logo.png`,
      },
    },
    url: article.url,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": article.url,
    },
  }
}

export function generateBreadcrumbSchema(
  items: Array<{ name: string; url: string }>
): WithContext<BreadcrumbList> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.url}`,
    })),
  }
}

export function generateFAQPageSchema(
  faqs: ReadonlyArray<{ readonly question: string; readonly answer: string }>
): WithContext<FAQPage> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question" as const,
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer" as const,
        text: faq.answer,
      },
    })),
  }
}

export function generateLocationSchema(location: {
  name: string
  streetAddress: string
  city: string
  state: string
  postalCode: string
  country: string
  latitude: number
  longitude: number
  phone: string
  slug: string
}): WithContext<LocalBusiness> {
  return {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: `${siteConfig.name} — ${location.name}`,
    image: `${siteConfig.url}/images/swilliamslaw/logo.png`,
    url: `${siteConfig.url}/locations/${location.slug}`,
    telephone: location.phone,
    email: siteConfig.contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: location.streetAddress,
      addressLocality: location.city,
      addressRegion: location.state,
      postalCode: location.postalCode,
      addressCountry: location.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: location.latitude,
      longitude: location.longitude,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "17:00",
    },
    priceRange: "Free Consultation",
    areaServed: [
      { "@type": "State", name: location.state === "GA" ? "Georgia" : "Mississippi" },
    ],
  } as WithContext<LocalBusiness>
}

export function generateLegalServicePageSchema(page: {
  practiceLabel: string
  cityName: string
  state: string
  description: string
  url: string
  location: {
    streetAddress: string
    city: string
    state: string
    postalCode: string
    country: string
    latitude: number
    longitude: number
    phone: string
  }
}): WithContext<LocalBusiness> {
  return {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: `${siteConfig.name} — ${page.practiceLabel} in ${page.cityName}`,
    image: `${siteConfig.url}/images/swilliamslaw/logo.png`,
    url: page.url,
    telephone: page.location.phone,
    email: siteConfig.contact.email,
    description: page.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: page.location.streetAddress,
      addressLocality: page.location.city,
      addressRegion: page.location.state,
      postalCode: page.location.postalCode,
      addressCountry: page.location.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: page.location.latitude,
      longitude: page.location.longitude,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "17:00",
    },
    priceRange: "Free Consultation",
    areaServed: {
      "@type": "State",
      name: page.state,
    },
  } as WithContext<LocalBusiness>
}

export function generatePersonSchema(attorney: {
  name: string
  title: string
  photo?: string
  education: ReadonlyArray<{ degree: string; institution: string; honors?: string }>
  barAdmissions: ReadonlyArray<{ state: string; courts: string }>
  awards: ReadonlyArray<{ name: string; issuer: string }>
  memberships: ReadonlyArray<string>
  languages: ReadonlyArray<string>
}): WithContext<Person> {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: attorney.name,
    jobTitle: attorney.title,
    image: attorney.photo ? `${siteConfig.url}${attorney.photo}` : undefined,
    url: `${siteConfig.url}/about`,
    worksFor: {
      "@type": "LegalService",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    alumniOf: attorney.education.map((edu) => ({
      "@type": "EducationalOrganization" as const,
      name: edu.institution,
    })),
    memberOf: attorney.memberships.map((m) => ({
      "@type": "Organization" as const,
      name: m,
    })),
    award: attorney.awards.map((a) => a.name),
    knowsLanguage: [...attorney.languages],
  }
}
