import Link from "next/link"
import { Logo } from "@/components/ui/Logo"
import { siteConfig } from "@/config/site"
import { PhoneNumber } from "@/components/PhoneNumber"
import { firmConfig } from "@/config/firm.config"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-navy-950 border-t border-navy-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <Logo className="h-14 w-auto text-warmWhite" />
            </Link>
            <p className="text-warmWhite/70 text-sm mb-4 max-w-sm">
              Personal injury and workers&apos; compensation attorneys serving Georgia and Mississippi. No fee unless we win.
            </p>
            <p className="text-warmWhite/50 text-xs">Se Habla Espa&ntilde;ol</p>
          </div>

          {/* Practice Areas Column */}
          <div>
            <h3 className="font-semibold text-warmWhite mb-4">Practice Areas</h3>
            <ul className="space-y-2">
              {firmConfig.practiceAreas.map((area) => (
                <li key={area.slug}>
                  <Link
                    href={`/practice-areas/${area.slug}`}
                    className="text-sm text-warmWhite/70 hover:text-gold-500 transition-colors"
                  >
                    {area.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Offices Column */}
          <div>
            <h3 className="font-semibold text-warmWhite mb-4">Offices</h3>
            <ul className="space-y-4">
              {firmConfig.locations.map((loc) => (
                <li key={loc.slug}>
                  <Link
                    href={`/locations/${loc.slug}`}
                    className="text-sm text-warmWhite/70 hover:text-gold-500 transition-colors block"
                  >
                    <span className="font-medium text-warmWhite">{loc.name}</span>
                    <br />
                    {loc.streetAddress}
                    <br />
                    {loc.city}, {loc.state} {loc.postalCode}
                    <br />
                    {loc.phone}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="font-semibold text-warmWhite mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm text-warmWhite/70 hover:text-gold-500 transition-colors">
                  About the Firm
                </Link>
              </li>
              <li>
                <Link href="/testimonials" className="text-sm text-warmWhite/70 hover:text-gold-500 transition-colors">
                  Testimonials
                </Link>
              </li>
              <li>
                <Link href="/community" className="text-sm text-warmWhite/70 hover:text-gold-500 transition-colors">
                  Community
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm text-warmWhite/70 hover:text-gold-500 transition-colors">
                  Legal Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-warmWhite/70 hover:text-gold-500 transition-colors">
                  Free Case Evaluation
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-warmWhite/70 hover:text-gold-500 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-warmWhite/70 hover:text-gold-500 transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-12 pt-8 border-t border-navy-800">
          <p className="text-warmWhite/40 text-xs leading-relaxed max-w-4xl">
            {firmConfig.legal.footerDisclaimer}
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="mt-6 pt-6 border-t border-navy-800 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <p className="text-sm text-warmWhite/70">
            &copy; {currentYear} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-warmWhite/70">
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="hover:text-gold-500 transition-colors"
            >
              {siteConfig.contact.email}
            </a>
            <span className="text-warmWhite/30">|</span>
            <PhoneNumber className="hover:text-gold-500 transition-colors" />
          </div>
        </div>
      </div>
    </footer>
  )
}
