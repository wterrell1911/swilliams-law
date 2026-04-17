"use client"

import { useState } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

const cities = [
  { slug: "atlanta", label: "Atlanta, GA" },
  { slug: "jackson", label: "Jackson, MS" },
]

const practiceAreas = [
  { slug: "personal-injury-lawyer", name: "Personal Injury Lawyer", description: "Full-service personal injury representation for accident victims." },
  { slug: "car-accident-lawyer", name: "Car Accident Lawyer", description: "Aggressive representation for auto accident victims." },
  { slug: "workers-compensation-lawyer", name: "Workers' Compensation Lawyer", description: "Fighting for full benefits when you're injured on the job." },
  { slug: "wrongful-death-attorney", name: "Wrongful Death Attorney", description: "Seeking justice and accountability for families who have lost a loved one." },
  { slug: "slip-and-fall-lawyer", name: "Slip & Fall Lawyer", description: "Premises liability claims against negligent property owners." },
]

export function PracticeAreaCityGrid() {
  const [activeCity, setActiveCity] = useState("atlanta")

  return (
    <div>
      {/* City Toggle */}
      <div className="flex items-center justify-center gap-2 mb-12">
        {cities.map((city) => (
          <button
            key={city.slug}
            onClick={() => setActiveCity(city.slug)}
            className={cn(
              "px-6 py-2.5 rounded-md text-sm font-medium transition-all",
              activeCity === city.slug
                ? "bg-gold-500 text-navy-950 shadow-lg shadow-gold-500/25"
                : "bg-white border border-navy-900/10 text-navy-700 hover:border-gold-500/30 hover:text-gold-500"
            )}
          >
            {city.label}
          </button>
        ))}
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {practiceAreas.map((area) => (
          <Link
            key={area.slug}
            href={`/${activeCity}/${area.slug}`}
            className="block group"
          >
            <div className="bg-white border border-navy-900/10 rounded-xl p-8 h-full hover:shadow-lg hover:border-gold-500/30 transition-all">
              <h2 className="text-2xl font-display font-bold text-navy-900 mb-3 group-hover:text-gold-500 transition-colors">
                {area.name}
              </h2>
              <p className="text-navy-700 leading-relaxed mb-4">
                {area.description}
              </p>
              <span className="text-gold-500 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                Learn More
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
