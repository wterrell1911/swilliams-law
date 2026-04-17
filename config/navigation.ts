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
        title: "Atlanta, GA",
        items: [
          { name: "Personal Injury Lawyer", href: "/atlanta/personal-injury-lawyer", description: "Full-service personal injury representation" },
          { name: "Car Accident Lawyer", href: "/atlanta/car-accident-lawyer", description: "Auto collision and car wreck cases" },
          { name: "Workers' Comp Lawyer", href: "/atlanta/workers-compensation-lawyer", description: "Workplace injuries and workers' comp claims" },
          { name: "Wrongful Death Attorney", href: "/atlanta/wrongful-death-attorney", description: "Fatal accident and wrongful death claims" },
          { name: "Slip & Fall Lawyer", href: "/atlanta/slip-and-fall-lawyer", description: "Premises liability and property owner negligence" },
        ],
      },
      {
        title: "Jackson, MS",
        items: [
          { name: "Personal Injury Lawyer", href: "/jackson/personal-injury-lawyer", description: "Full-service personal injury representation" },
          { name: "Car Accident Lawyer", href: "/jackson/car-accident-lawyer", description: "Auto collision and car wreck cases" },
          { name: "Workers' Comp Lawyer", href: "/jackson/workers-compensation-lawyer", description: "Workplace injuries and workers' comp claims" },
          { name: "Wrongful Death Attorney", href: "/jackson/wrongful-death-attorney", description: "Fatal accident and wrongful death claims" },
          { name: "Slip & Fall Lawyer", href: "/jackson/slip-and-fall-lawyer", description: "Premises liability and property owner negligence" },
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
