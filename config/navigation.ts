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

export const mainNavigation: NavEntry[] = [
  {
    name: "Practice Areas",
    items: [
      {
        title: "Our Practice Areas",
        items: [
          { name: "Car Accidents", href: "/practice-areas/car-accidents", description: "Auto collision and car wreck cases" },
          { name: "Truck Accidents", href: "/practice-areas/truck-accidents", description: "18-wheeler and commercial vehicle crashes" },
          { name: "Workers' Compensation", href: "/practice-areas/workers-compensation", description: "Workplace injuries and workers' comp claims" },
          { name: "Slip and Fall", href: "/practice-areas/slip-and-fall", description: "Premises liability and property owner negligence" },
          { name: "Wrongful Death", href: "/practice-areas/wrongful-death", description: "Fatal accident and wrongful death claims" },
        ],
      },
    ],
  },
  {
    name: "About",
    href: "/about",
    description: "Our firm and attorney",
  },
  {
    name: "Community",
    href: "/community",
    description: "Scholarships and community service",
  },
  {
    name: "Blog",
    href: "/blog",
    description: "Legal insights and resources",
  },
  {
    name: "Contact",
    href: "/contact",
    description: "Free case evaluation",
  },
]

export const footerLinks = {
  practiceAreas: [
    { name: "Car Accidents", href: "/practice-areas/car-accidents" },
    { name: "Truck Accidents", href: "/practice-areas/truck-accidents" },
    { name: "Workers' Compensation", href: "/practice-areas/workers-compensation" },
    { name: "Slip and Fall", href: "/practice-areas/slip-and-fall" },
    { name: "Wrongful Death", href: "/practice-areas/wrongful-death" },
  ],
  resources: [
    { name: "Blog", href: "/blog" },
    { name: "Testimonials", href: "/testimonials" },
  ],
  company: [
    { name: "About", href: "/about" },
    { name: "Community", href: "/community" },
    { name: "Contact", href: "/contact" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
  ],
}
