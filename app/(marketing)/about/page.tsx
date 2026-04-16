import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/Button"
import { PhoneNumber } from "@/components/PhoneNumber"
import { firmConfig } from "@/config/firm.config"
import { JsonLd } from "@/components/seo/JsonLd"
import { generatePersonSchema } from "@/lib/structured-data"

export const metadata: Metadata = {
  title: "About S. Williams Law Firm | Atlanta Personal Injury Attorney",
  description:
    "Attorney Suneisha L. Williams founded S. Williams Law Firm to represent personal injury and workers' compensation victims across Georgia and Mississippi. Licensed in both states.",
  keywords: [
    "Suneisha Williams attorney",
    "Atlanta personal injury lawyer",
    "Georgia workers compensation attorney",
    "Mississippi personal injury lawyer",
    "S. Williams Law Firm",
  ],
}

export default function AboutPage() {
  const attorney = firmConfig.attorneys[0]
  const personSchema = generatePersonSchema(attorney)

  return (
    <div className="min-h-screen">
      <JsonLd data={personSchema} />
      {/* Section 1: Hero */}
      <section className="bg-navy-950 pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="uppercase text-xs tracking-[0.2em] text-gold-500 mb-6">
            About Our Firm
          </p>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-warmWhite mb-8">
            Where Clients Become Family
          </h1>
          <div className="text-warmWhite/70 leading-relaxed space-y-4 text-left max-w-2xl mx-auto mb-10">
            <p>
              S. Williams Law Firm was founded in 2013 by Attorney Suneisha L. Williams with a simple but powerful belief: every injury victim deserves an attorney who fights for them like family.
            </p>
            <p>
              Born in Chicago and raised in Mississippi, Attorney Williams knows what it feels like to be injured and overwhelmed by the legal system. At just 19 years old, she was involved in a serious car accident while attending the University of Mississippi. That experience — navigating insurance adjusters, medical bills, and legal complexities — became the driving force behind her legal career.
            </p>
            <p className="text-gold-500 font-medium">
              She became the lawyer she wished she had.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            <Link href="/contact">
              <Button variant="primary" size="lg">
                Free Case Evaluation
              </Button>
            </Link>
            <PhoneNumber className="inline-flex items-center justify-center px-6 py-3 border border-gold-500/50 text-warmWhite hover:bg-gold-500/10 rounded-md transition-colors text-base font-medium" />
          </div>
          <p className="text-warmWhite/50 text-sm">
            No fee unless we win. Offices in Atlanta, GA &amp; Jackson, MS.
          </p>
        </div>
      </section>

      {/* Section 2: Attorney Profile */}
      <section className="bg-warmWhite py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12 items-start">
            {/* Photo placeholder */}
            <div className="md:col-span-1">
              <div className="bg-navy-900/10 rounded-2xl aspect-[3/4] flex items-center justify-center">
                <div className="text-center text-navy-600/50">
                  <svg className="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <p className="text-sm">Attorney Photo</p>
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="md:col-span-2">
              <h2 className="text-3xl font-display font-bold text-navy-900 mb-2">
                {attorney.name}
              </h2>
              <p className="text-gold-500 font-medium mb-6">{attorney.title}</p>

              <div className="prose prose-navy max-w-none text-navy-700 leading-relaxed space-y-4">
                <p>
                  Attorney Suneisha L. Williams earned her Juris Doctor from the University of Mississippi School of Law, graduating cum laude. She also holds a Bachelor of Arts from the University of Mississippi, where she graduated magna cum laude.
                </p>
                <p>
                  Her courtroom presence has been described as &ldquo;aggressive yet charming and relatable&rdquo; — a combination that resonates with juries and puts clients at ease. She brings the same tenacity to settlement negotiations, consistently securing results that exceed initial offers from insurance companies.
                </p>
                <p>
                  Licensed to practice in both Georgia and Mississippi — including state and federal courts in both states — Attorney Williams founded S. Williams Law Firm to exclusively represent personal injury and workers&apos; compensation victims. Her dual-state practice means she can represent clients injured in either state, whether the case involves a car accident on I-285, a workplace injury at a construction site in Jackson, or a trucking collision on I-20.
                </p>
              </div>

              {/* Credentials */}
              <div className="mt-8 grid sm:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-navy-900 mb-2">Bar Admissions</h3>
                  <ul className="space-y-1 text-sm text-navy-700">
                    {attorney.barAdmissions.map((bar) => (
                      <li key={bar.state}>{bar.state} — {bar.courts}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-navy-900 mb-2">Education</h3>
                  <ul className="space-y-1 text-sm text-navy-700">
                    {attorney.education.map((edu) => (
                      <li key={edu.degree + edu.institution}>
                        {edu.degree}, {edu.institution}
                        {edu.honors && <span className="italic"> ({edu.honors})</span>}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-navy-900 mb-2">Awards</h3>
                  <ul className="space-y-1 text-sm text-navy-700">
                    {attorney.awards.map((award) => (
                      <li key={award.name}>
                        {award.name}
                        {"years" in award && <span> ({award.years})</span>}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-navy-900 mb-2">Memberships</h3>
                  <ul className="space-y-1 text-sm text-navy-700">
                    {attorney.memberships.map((m) => (
                      <li key={m}>{m}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6">
                <p className="text-navy-600 text-sm">
                  Languages: {attorney.languages.join(", ")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Our Approach */}
      <section className="bg-navy-950 py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-display font-bold text-warmWhite mb-4 text-center">
            Our Approach
          </h2>
          <p className="text-warmWhite/60 text-center mb-12 max-w-2xl mx-auto">
            We believe every client deserves aggressive representation combined with genuine compassion.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-navy-900/50 border border-navy-700 rounded-2xl p-8">
              <div className="text-gold-500 font-display font-bold text-2xl mb-2">01</div>
              <h3 className="text-xl font-display font-semibold text-warmWhite mb-4">
                We Listen First
              </h3>
              <p className="text-warmWhite/70 leading-relaxed">
                Every case starts with listening. We take the time to understand what happened to you, how it has affected your life, and what you need to recover. No rushed consultations. No dismissive responses.
              </p>
            </div>

            <div className="bg-navy-900/50 border border-navy-700 rounded-2xl p-8">
              <div className="text-gold-500 font-display font-bold text-2xl mb-2">02</div>
              <h3 className="text-xl font-display font-semibold text-warmWhite mb-4">
                We Prepare Thoroughly
              </h3>
              <p className="text-warmWhite/70 leading-relaxed">
                We prepare every case as if it&apos;s going to trial. We gather evidence, consult medical experts, reconstruct accidents, and build the strongest possible case for maximum compensation.
              </p>
            </div>

            <div className="bg-navy-900/50 border border-navy-700 rounded-2xl p-8">
              <div className="text-gold-500 font-display font-bold text-2xl mb-2">03</div>
              <h3 className="text-xl font-display font-semibold text-warmWhite mb-4">
                We Fight Relentlessly
              </h3>
              <p className="text-warmWhite/70 leading-relaxed">
                Insurance companies know which attorneys are willing to go to court. We negotiate aggressively, and if they won&apos;t offer fair compensation, we take them to trial. Our reputation for fighting gets results.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: CTA */}
      <section className="bg-navy-900 py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-display font-bold text-warmWhite mb-4">
            Injured? Let Us Fight for You.
          </h2>
          <p className="text-lg text-warmWhite/60 mb-8 max-w-xl mx-auto">
            Your free case evaluation is completely confidential. Tell us what happened and we&apos;ll let you know how we can help.
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
