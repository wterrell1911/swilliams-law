import { firmConfig } from "./firm.config"

export const siteConfig = {
  name: firmConfig.identity.name,
  description: firmConfig.identity.elevatorPitch,
  url: firmConfig.seo.siteUrl,
  ogImage: firmConfig.seo.defaultOgImage,
  links: {
    twitter: "",
    linkedin: "",
  },
  contact: {
    email: firmConfig.identity.email,
    phone: firmConfig.identity.phone,
    phoneTel: firmConfig.identity.phoneTel,
  },
  company: {
    legalName: firmConfig.identity.legalName,
    foundingYear: firmConfig.identity.foundedYear,
    address: {
      streetAddress: firmConfig.locations[0].streetAddress,
      city: firmConfig.locations[0].city,
      state: firmConfig.locations[0].state,
      postalCode: firmConfig.locations[0].postalCode,
      country: firmConfig.locations[0].country,
    },
  },
}
