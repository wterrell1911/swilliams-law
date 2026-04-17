import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/Button"
import { PhoneNumber } from "@/components/PhoneNumber"

export const metadata: Metadata = {
  title: "Community Involvement | S. Williams Law Firm",
  description:
    "S. Williams Law Firm is committed to giving back through the S. Williams Scholarship Fund and community service across Georgia and Mississippi.",
  keywords: [
    "S. Williams Scholarship Fund",
    "S. Williams Law Firm community",
    "Atlanta attorney community involvement",
    "Suneisha Williams scholarship",
  ],
}

export default function CommunityPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-navy-950 pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="uppercase text-xs tracking-[0.2em] text-gold-500 mb-6">
            Giving Back
          </p>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-warmWhite mb-6">
            Community Involvement
          </h1>
          <p className="text-warmWhite/70 leading-relaxed max-w-2xl mx-auto">
            At S. Williams Law Firm, we believe in lifting up the communities that shaped us. From educational scholarships to hands-on service, giving back is at the heart of who we are.
          </p>
        </div>
      </section>

      {/* Scholarship Fund */}
      <section className="bg-warmWhite py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-5 gap-12 items-start">
            <div className="md:col-span-3">
              <p className="uppercase text-xs tracking-[0.2em] text-gold-500 mb-4">
                Education Initiative
              </p>
              <h2 className="text-3xl font-display font-bold text-navy-900 mb-6">
                S. Williams Scholarship Fund
              </h2>
              <div className="text-navy-700 leading-relaxed space-y-4">
                <p>
                  Attorney Suneisha L. Williams established the S. Williams Scholarship Fund to provide educational funding for graduating seniors from her former Mississippi high school. The scholarship is a reflection of her personal journey — from a small town in Mississippi to founding a multi-state law practice.
                </p>
                <p>
                  The fund supports students who demonstrate academic achievement, community involvement, and a commitment to making a difference. Attorney Williams believes that access to education is one of the most powerful tools for changing lives, and she is dedicated to helping the next generation reach their potential.
                </p>
              </div>
            </div>
            <div className="md:col-span-2">
              <div className="bg-navy-950 rounded-2xl p-8 text-center">
                <div className="text-gold-500 font-display font-bold text-5xl mb-2">
                  &hearts;
                </div>
                <h3 className="text-xl font-display font-semibold text-warmWhite mb-3">
                  Investing in the Future
                </h3>
                <p className="text-warmWhite/70 text-sm leading-relaxed">
                  Providing scholarships to graduating seniors pursuing higher education in Mississippi.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Service */}
      <section className="bg-navy-950 py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="uppercase text-xs tracking-[0.2em] text-gold-500 mb-4">
              Beyond the Courtroom
            </p>
            <h2 className="text-3xl font-display font-bold text-warmWhite mb-4">
              Serving Our Communities
            </h2>
            <p className="text-warmWhite/60 max-w-2xl mx-auto">
              Our commitment to Georgia and Mississippi extends far beyond legal representation.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-navy-900/50 border border-navy-700 rounded-2xl p-8">
              <div className="text-gold-500 mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-display font-semibold text-warmWhite mb-3">
                Educational Scholarships
              </h3>
              <p className="text-warmWhite/70 leading-relaxed">
                Funding educational opportunities for high school seniors in Mississippi through the S. Williams Scholarship Fund.
              </p>
            </div>

            <div className="bg-navy-900/50 border border-navy-700 rounded-2xl p-8">
              <div className="text-gold-500 mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-display font-semibold text-warmWhite mb-3">
                Community Sponsorships
              </h3>
              <p className="text-warmWhite/70 leading-relaxed">
                Sponsoring organizations and events in both Georgia and Mississippi that strengthen our communities and support local families.
              </p>
            </div>

            <div className="bg-navy-900/50 border border-navy-700 rounded-2xl p-8">
              <div className="text-gold-500 mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-display font-semibold text-warmWhite mb-3">
                Volunteer Services
              </h3>
              <p className="text-warmWhite/70 leading-relaxed">
                Donating resources and volunteering services to help those in need across the communities we serve in Georgia and Mississippi.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="bg-warmWhite py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="uppercase text-xs tracking-[0.2em] text-gold-500 mb-4">
            Our Philosophy
          </p>
          <h2 className="text-3xl font-display font-bold text-navy-900 mb-6">
            Where Clients Become Family
          </h2>
          <p className="text-navy-700 leading-relaxed text-lg mb-4">
            S. Williams Law Firm treats its clients like family by going above and beyond — not just in the courtroom, but in the community. Attorney Williams founded the firm on the belief that serving others doesn&apos;t end when a case is resolved.
          </p>
          <p className="text-navy-600 leading-relaxed">
            Whether it&apos;s fighting for fair compensation for an injury victim, funding a student&apos;s college education, or sponsoring a community event, our mission remains the same: to make a meaningful difference in people&apos;s lives.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy-900 py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-display font-bold text-warmWhite mb-4">
            Need Legal Help?
          </h2>
          <p className="text-lg text-warmWhite/60 mb-8 max-w-xl mx-auto">
            If you&apos;ve been injured, let the firm that treats clients like family fight for you.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            <Link href="/contact">
              <Button variant="primary" size="lg">
                Free Case Evaluation
              </Button>
            </Link>
            <PhoneNumber className="inline-flex items-center justify-center px-6 py-3 border border-gold-500/50 text-warmWhite hover:bg-gold-500/10 rounded-md transition-colors text-base font-medium" />
          </div>
          <p className="text-warmWhite/50 text-sm">
            No fee unless we win. Se Habla Espa&ntilde;ol.
          </p>
        </div>
      </section>
    </div>
  )
}
