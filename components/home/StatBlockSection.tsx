"use client"

import { ScrollReveal } from "@/components/animations/ScrollReveal"

export function StatBlockSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-navy-900 mb-4">
              The gap between solo and large firm tech adoption is not about capability.
            </h2>
            <p className="text-lg text-navy-700">
              It is about resources. We are here to close it.
            </p>
          </div>

          <div className="overflow-x-auto mb-8">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="text-left p-4 bg-navy-900 text-warmWhite font-display text-lg">Solo Practitioners</th>
                  <th className="text-left p-4 bg-gold-500 text-navy-950 font-display text-lg">100+ Attorney Firms</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="p-4 text-navy-900">
                    <span className="text-2xl font-bold">18%</span>
                    <span className="block text-sm text-navy-600">use AI in their practice</span>
                  </td>
                  <td className="p-4 text-navy-900">
                    <span className="text-2xl font-bold">46%</span>
                    <span className="block text-sm text-navy-600">use AI in their practice</span>
                  </td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="p-4 text-navy-900">
                    <span className="text-2xl font-bold">44%</span>
                    <span className="block text-sm text-navy-600">report burnout</span>
                  </td>
                  <td className="p-4 text-navy-900">
                    <span className="font-semibold">Support staff</span>
                    <span className="block text-sm text-navy-600">handles admin, intake, and scheduling</span>
                  </td>
                </tr>
                <tr>
                  <td className="p-4 text-navy-900">
                    <span className="text-2xl font-bold">73%</span>
                    <span className="block text-sm text-navy-600">worked on at least half their vacation days</span>
                  </td>
                  <td className="p-4 text-navy-900">
                    <span className="font-semibold">Operations teams</span>
                    <span className="block text-sm text-navy-600">keep the practice running when partners step away</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="text-center">
            <p className="text-navy-700 leading-relaxed mb-4">
              These are not personality problems. They are resource problems. Experienced legal counsel can make the difference.
            </p>
            <p className="text-navy-500 text-sm">
              Source: ABA 2024 Legal Technology Survey Report
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
