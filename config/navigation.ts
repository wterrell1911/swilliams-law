export interface NavItem {
  name: string
  href: string
  description?: string
}

export interface NavDropdown {
  name: string
  items: NavDropdownSection[]
}

export interface NavDropdownSection {
  title: string
  items: NavDropdownItem[]
}

export interface NavDropdownItem {
  name: string
  href: string
  description: string
  price?: string
  badge?: string
}

export type NavEntry = NavItem | NavDropdown

export function isDropdown(entry: NavEntry): entry is NavDropdown {
  return "items" in entry
}

// TODO: Phase 3 — populate from firm.config.ts practice areas
export const mainNavigation: NavEntry[] = [
  {
    name: "Practice Areas",
    href: "/practice-areas",
    description: "Our areas of legal expertise",
  },
  {
    name: "About",
    href: "/about",
    description: "Our firm and attorneys",
  },
  {
    name: "Blog",
    href: "/blog",
    description: "Legal insights and updates",
  },
  {
    name: "Contact",
    href: "/contact",
    description: "Get in touch",
  },
]

export const footerLinks = {
  practiceAreas: [
    // TODO: Phase 3 — populate from firm.config.ts practice areas
  ],
  resources: [
    { name: "Blog", href: "/blog" },
  ],
  company: [
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
  ],
}
