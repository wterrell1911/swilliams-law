// S. Williams Law Firm — Central Configuration
// All firm-specific data lives here. Components read from this file.

export const firmConfig = {
  identity: {
    name: "S. Williams Law Firm, LLC",
    shortName: "S. Williams Law Firm",
    legalName: "S. Williams Law Firm, LLC",
    phone: "(404) 504-7027",
    phoneTel: "+14045047027",
    email: "contact@swilliamslawfirm.com",
    foundedYear: 2013,
    tagline: "Atlanta Personal Injury Lawyer | Where Clients Become Family",
    elevatorPitch:
      "S. Williams Law Firm, led by Attorney Suneisha L. Williams, exclusively represents personal injury and workers' compensation victims across Georgia and Mississippi. Licensed in both states with offices in Atlanta and Jackson. No fee unless we win.",
  },

  branding: {
    logo: {
      horizontal: "/images/swilliamslaw/logo.png",
      square: "/images/swilliamslaw/logo.png",
      favicon: "/favicon.ico",
    },
    colors: {
      primary: "#002A1A",
      primaryDark: "#001208",
      primaryLight: "#003D24",
      accent: "#C9A227",
      text: "#1a1a1a",
      textMuted: "#6b6b6b",
      background: "#ffffff",
      surface: "#f8f8f5",
      border: "#e5e5e0",
    },
    typography: {
      headingFont: "Playfair Display",
      bodyFont: "Inter",
    },
  },

  locations: [
    {
      slug: "atlanta",
      name: "Atlanta, GA",
      city: "Atlanta",
      state: "GA",
      streetAddress: "3355 Lenox Road, Suite 1000",
      addressLocality: "Atlanta",
      addressRegion: "GA",
      postalCode: "30326",
      country: "US",
      latitude: 33.8463,
      longitude: -84.3621,
      phone: "(404) 504-7027",
      hours: {
        monday: "09:00-17:00",
        tuesday: "09:00-17:00",
        wednesday: "09:00-17:00",
        thursday: "09:00-17:00",
        friday: "09:00-17:00",
      },
      hasLocationPage: true,
      servesAreas: [
        "Fulton County",
        "DeKalb County",
        "Cobb County",
        "Gwinnett County",
        "Buckhead",
        "Midtown Atlanta",
      ],
    },
    {
      slug: "jackson-ms",
      name: "Jackson, MS",
      city: "Jackson",
      state: "MS",
      streetAddress: "460 Briarwood Drive, Suite 400",
      addressLocality: "Jackson",
      addressRegion: "MS",
      postalCode: "39206",
      country: "US",
      latitude: 32.3547,
      longitude: -90.1609,
      phone: "(601) 882-0446",
      hours: {
        monday: "09:00-17:00",
        tuesday: "09:00-17:00",
        wednesday: "09:00-17:00",
        thursday: "09:00-17:00",
        friday: "09:00-17:00",
      },
      hasLocationPage: true,
      servesAreas: [
        "Hinds County",
        "Madison County",
        "Rankin County",
        "Tupelo",
        "Oxford",
        "DeSoto County",
        "Batesville",
        "Lee County",
        "Lafayette County",
        "Panola County",
      ],
    },
  ],

  seo: {
    siteUrl: "https://swilliamslawfirm.com",
    defaultOgImage: "/og/default.jpg",
    primaryServiceArea: "Georgia and Mississippi",
    languages: ["en-US"],
    noIndexPaths: ["/admin", "/portal"],
  },

  legal: {
    footerDisclaimer:
      "The information on this website is for general information purposes only. Nothing on this site should be taken as legal advice for any individual case or situation. This information is not intended to create, and receipt or viewing does not constitute, an attorney-client relationship.",
    caseResultsDisclaimer:
      "Prior results do not guarantee a similar outcome. Each case is unique and must be evaluated on its own merits.",
    privacyPolicyDate: "2026-04-16",
    termsDate: "2026-04-16",
  },

  integrations: {
    portalEnabled: false,
    paymentsEnabled: false,
    smsEnabled: false,
  },

  practiceAreas: [
    {
      slug: "car-accidents",
      name: "Car Accidents",
      shortDescription: "Aggressive representation for auto accident victims across Georgia and Mississippi.",
      icon: "car",
    },
    {
      slug: "truck-accidents",
      name: "Truck Accidents",
      shortDescription: "Holding trucking companies accountable for 18-wheeler and commercial vehicle collisions.",
      icon: "truck",
    },
    {
      slug: "workers-compensation",
      name: "Workers' Compensation",
      shortDescription: "Fighting for full benefits when you're injured on the job in Georgia or Mississippi.",
      icon: "hardhat",
    },
    {
      slug: "slip-and-fall",
      name: "Slip and Fall",
      shortDescription: "Premises liability claims against negligent property owners.",
      icon: "alert",
    },
    {
      slug: "wrongful-death",
      name: "Wrongful Death",
      shortDescription: "Seeking justice and accountability for families who have lost a loved one.",
      icon: "scale",
    },
  ],

  caseResults: [
    {
      headline: "$1.2M Settlement — Truck Accident",
      amount: 1200000,
      amountDisplay: "exact" as const,
      practiceAreaSlug: "truck-accidents",
      year: 2024,
      summary: "Multiple vehicle commercial truck collision resulting in serious injuries.",
      featured: true,
    },
    {
      headline: "$875K Settlement — Workers' Compensation",
      amount: 875000,
      amountDisplay: "exact" as const,
      practiceAreaSlug: "workers-compensation",
      year: 2024,
      summary:
        "Construction site injury resulting in permanent disability. Full benefits recovered.",
      featured: true,
    },
    {
      headline: "$650K Settlement — Car Accident",
      amount: 650000,
      amountDisplay: "exact" as const,
      practiceAreaSlug: "car-accidents",
      year: 2023,
      summary:
        "Rear-end collision causing spinal injuries requiring surgery and ongoing treatment.",
      featured: true,
    },
    {
      headline: "$425K Settlement — Slip and Fall",
      amount: 425000,
      amountDisplay: "exact" as const,
      practiceAreaSlug: "slip-and-fall",
      year: 2023,
      summary: "Grocery store negligence resulting in fall injuries.",
      featured: true,
    },
  ],

  testimonials: [
    {
      quote:
        "Won and done in only 6 months! Attorney Williams fought hard for me and got results faster than I ever expected.",
      clientName: "Former Client",
      caseType: "Workers' Compensation Client",
      rating: 5,
      source: "Google",
      featured: true,
    },
    {
      quote:
        "After my car accident, I didn't know where to turn. S. Williams Law Firm treated me like family and got me the compensation I deserved.",
      clientName: "Car Accident Client",
      caseType: "Car Accident Client",
      rating: 5,
      source: "Google",
      featured: true,
    },
    {
      quote:
        "Attorney Williams is truly in a league of her own. Professional, caring, and relentless. I can't recommend her enough.",
      clientName: "Personal Injury Client",
      caseType: "Personal Injury Client",
      rating: 5,
      source: "Google",
      featured: true,
    },
  ],

  faqs: [
    {
      question: "How long do I have to file a personal injury claim?",
      answer:
        "In Georgia, you generally have 2 years from the date of injury. In Mississippi, it's 3 years. However, some exceptions may shorten or lengthen this period. Contact us immediately to protect your rights.",
      category: "general",
      order: 1,
    },
    {
      question: "What compensation can I receive for my injuries?",
      answer:
        "You may be entitled to medical expenses (past and future), lost wages, pain and suffering, emotional distress, and in some cases, punitive damages. Every case is different, and we'll evaluate your specific situation.",
      category: "general",
      order: 2,
    },
    {
      question: "Do I really need a lawyer?",
      answer:
        "Insurance companies have teams of adjusters and attorneys working to minimize your claim. Having an experienced personal injury attorney levels the playing field and typically results in significantly higher compensation.",
      category: "general",
      order: 3,
    },
    {
      question: "How much does it cost to hire S. Williams Law Firm?",
      answer:
        "We work on a contingency fee basis for personal injury and workers' compensation cases. You pay nothing upfront and nothing unless we win your case. Our fee is a percentage of the recovery we obtain for you.",
      category: "pricing",
      order: 1,
    },
    {
      question: "Will my case go to trial?",
      answer:
        "Most cases settle without going to trial. However, we prepare every case as if it will go to trial, which often results in better settlement offers. If the insurance company won't offer fair compensation, we're ready to fight in court.",
      category: "process",
      order: 1,
    },
    {
      question: "How long will my case take?",
      answer:
        "Every case is different. Some settle in a few months; others take longer, especially if litigation is required. We work efficiently while ensuring we maximize your compensation. We'll keep you informed throughout the process.",
      category: "process",
      order: 2,
    },
  ],

  intake: {
    caseTypes: [
      { value: "car-accident", label: "Car Accident", practiceAreaSlug: "car-accidents" },
      { value: "truck-accident", label: "Truck Accident", practiceAreaSlug: "truck-accidents" },
      { value: "workers-comp", label: "Workers' Compensation", practiceAreaSlug: "workers-compensation" },
      { value: "slip-and-fall", label: "Slip and Fall", practiceAreaSlug: "slip-and-fall" },
      { value: "wrongful-death", label: "Wrongful Death", practiceAreaSlug: "wrongful-death" },
      { value: "other", label: "Other Personal Injury", practiceAreaSlug: "personal-injury" },
    ],
    commonFields: [
      { name: "firstName", label: "First Name", type: "text", required: true },
      { name: "lastName", label: "Last Name", type: "text", required: true },
      { name: "email", label: "Email", type: "email", required: true },
      { name: "phone", label: "Phone", type: "phone", required: true },
      { name: "caseType", label: "What happened?", type: "select", required: true },
      { name: "description", label: "Tell us about your case", type: "textarea", required: true },
    ],
    conditionalFields: {},
    notificationRecipients: ["contact@swilliamslawfirm.com"],
    sendAutoResponse: true,
  },

  attorneys: [
    {
      slug: "suneisha-williams",
      name: "Suneisha L. Williams, Esq.",
      title: "Owner and Managing Attorney",
      credentials: "JD",
      shortBio:
        "Attorney Suneisha L. Williams founded S. Williams Law Firm to exclusively represent personal injury and workers' compensation victims across Georgia and Mississippi. Her courtroom presence has been described as 'aggressive yet charming and relatable.'",
      photo: "/team/suneisha-williams.jpg",
      email: "contact@swilliamslawfirm.com",
      practiceAreaSlugs: [
        "car-accidents",
        "truck-accidents",
        "workers-compensation",
        "slip-and-fall",
        "wrongful-death",
      ],
      locationSlugs: ["atlanta", "jackson-ms"],
      barAdmissions: [
        { state: "Georgia", courts: "State and Federal Courts" },
        { state: "Mississippi", courts: "State and Federal Courts" },
      ],
      education: [
        { degree: "JD", institution: "University of Mississippi School of Law", honors: "cum laude" },
        { degree: "BA", institution: "University of Mississippi", honors: "magna cum laude" },
      ],
      memberships: [
        "Georgia State Bar",
        "Mississippi State Bar",
        "National Trial Lawyers Top 40 Under 40",
      ],
      awards: [
        { name: "Super Lawyers Rising Stars", years: "2022-2024", issuer: "Super Lawyers" },
        { name: "Top 40 Under 40", issuer: "National Trial Lawyers" },
      ],
      languages: ["English", "Spanish"],
    },
  ],
} as const

export type FirmConfig = typeof firmConfig
