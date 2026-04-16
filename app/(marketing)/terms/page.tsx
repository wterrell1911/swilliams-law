"use client"

import { useState } from "react"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { PhoneNumber } from "@/components/PhoneNumber"

export default function TermsPage() {
  const [agreed, setAgreed] = useState(false)
  const [agreementRecord, setAgreementRecord] = useState<{
    name: string
    email: string
    timestamp: string
  } | null>(null)
  const [formData, setFormData] = useState({ name: "", email: "" })
  const [showForm, setShowForm] = useState(false)

  const handleAgree = () => {
    if (!formData.name || !formData.email) {
      setShowForm(true)
      return
    }
    const record = {
      name: formData.name,
      email: formData.email,
      timestamp: new Date().toLocaleString("en-US", {
        dateStyle: "full",
        timeStyle: "long",
      }),
    }
    setAgreementRecord(record)
    setAgreed(true)
    // In production, this would POST to an API endpoint
  }

  return (
    <>
      {/* TODO: Phase 3 — read all firm identity from firmConfig */}
      <Header />
      <main className="min-h-screen bg-warmWhite pt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl py-12 lg:py-16">
          <h1 className="text-3xl md:text-4xl font-bold text-navy-900 mb-8">
            Terms of Service
          </h1>

          <div className="prose prose-navy max-w-none">
            <p className="text-lg text-navy-600 mb-8">
              Welcome to [Firm Name]. By using our website at [firm website] (the &ldquo;Site&rdquo;) or engaging our services, 
              you agree to these Terms of Service (&ldquo;Terms&rdquo;). If you don&apos;t agree, please don&apos;t use our Site or services.
            </p>
            <p className="text-navy-700 mb-8">
              These Terms are a legal agreement between you and [Firm Legal Name] (&ldquo;Company,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;), 
              a Tennessee Limited Liability Company. <strong>By using this Site, you confirm that you are at least 18 years old and can enter into a binding contract.</strong>
            </p>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-navy-900 mb-4">1. What We Do</h2>
              <p className="text-navy-700 mb-2">[Firm Name] provides digital marketing consulting services, including:</p>
              <ul className="list-disc pl-6 text-navy-700 space-y-1">
                <li>Search Engine Optimization (SEO) audits, strategy, and implementation</li>
                <li>Generative Engine Optimization (GEO) for AI search visibility</li>
                <li>Website design, development, and maintenance</li>
                <li>AI chatbot implementation and automation solutions</li>
                <li>Content strategy and digital marketing consulting</li>
              </ul>
              <p className="text-navy-700 mt-2">We primarily serve professional service firms, including law firms and legal professionals.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-navy-900 mb-4">2. Using the Site</h2>
              <h3 className="text-lg font-medium text-navy-800 mb-2">What You Can Do</h3>
              <ul className="list-disc pl-6 text-navy-700 space-y-1 mb-4">
                <li>Learn about our services</li>
                <li>Request consultations or quotes</li>
                <li>Access client resources (if applicable)</li>
                <li>Contact us</li>
              </ul>
              <h3 className="text-lg font-medium text-navy-800 mb-2">What You Can&apos;t Do</h3>
              <ul className="list-disc pl-6 text-navy-700 space-y-1 mb-4">
                <li>Use the Site for anything illegal</li>
                <li>Try to access parts of the Site you shouldn&apos;t</li>
                <li>Interfere with how the Site works</li>
                <li>Upload viruses or malicious code</li>
                <li>Scrape or data mine the Site without permission</li>
                <li>Pretend to be someone else</li>
                <li>Send spam through the Site</li>
                <li>Copy our content for commercial use without permission</li>
              </ul>
              <h3 className="text-lg font-medium text-navy-800 mb-2">Information You Submit</h3>
              <p className="text-navy-700">When you submit information through the Site (contact forms, etc.), you&apos;re saying that the information is accurate, you have the right to submit it, and it doesn&apos;t violate anyone else&apos;s rights.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-navy-900 mb-4">3. Intellectual Property</h2>
              <p className="text-navy-700 mb-2">
                Everything on the Site—text, graphics, logos, images, software—belongs to [Firm Name] or our licensors and is protected by copyright, trademark, and other laws.
              </p>
              <p className="text-navy-700 mb-2">
                &ldquo;[Firm Name]&rdquo; and our logo are our trademarks. Don&apos;t use them without permission.
              </p>
              <p className="text-navy-700">
                You can access and use the Site for personal, non-commercial purposes. You can&apos;t modify, copy, or redistribute our materials, or remove copyright notices.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-navy-900 mb-4">4. Client Services</h2>
              <p className="text-navy-700 mb-2">
                <strong>Separate Agreements:</strong> If you become a client, our consulting services are governed by a separate Statement of Work and/or Master Service Agreement. These Terms govern the Site; client work has its own contract.
              </p>
              <p className="text-navy-700 mb-2">
                <strong>No Guaranteed Results:</strong> We don&apos;t guarantee specific search engine rankings, traffic, leads, or revenue. Digital marketing results depend on many factors we can&apos;t control—algorithm changes, competition, market conditions.
              </p>
              <p className="text-navy-700">
                <strong>We&apos;re Not Lawyers:</strong> We serve law firms, but we&apos;re a marketing company, not a law firm. We don&apos;t provide legal advice. Clients are responsible for complying with their own professional responsibility rules, including attorney advertising regulations.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-navy-900 mb-4">5. Disclaimers</h2>
              <p className="text-navy-700 mb-2">
                The Site and all content are provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo; without any warranties.
              </p>
              <p className="text-navy-700 mb-2">
                We disclaim all warranties, express or implied, including warranties of merchantability, fitness for a particular purpose, and non-infringement.
              </p>
              <p className="text-navy-700 mb-2">
                We don&apos;t promise the Site will always be available, secure, or error-free. We may change or discontinue it at any time.
              </p>
              <p className="text-navy-700">
                The Site may link to other websites. We&apos;re not responsible for their content or privacy practices.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-navy-900 mb-4">6. Limitation of Liability</h2>
              <p className="text-navy-700 mb-2">
                <strong>Maximum Liability:</strong> Our total liability for any claims from your use of the Site is limited to $100.
              </p>
              <p className="text-navy-700">
                <strong>No Indirect Damages:</strong> We&apos;re not liable for indirect, incidental, special, consequential, or punitive damages—including lost profits, data, or business interruption—from your use (or inability to use) the Site, unauthorized access to your data, third-party conduct on the Site, or anything else related to the Site.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-navy-900 mb-4">7. Indemnification</h2>
              <p className="text-navy-700">
                You agree to protect [Firm Name] from any claims, damages, or expenses (including legal fees) arising from your use of the Site, your violation of these Terms, your violation of anyone&apos;s rights, or information you submit through the Site.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-navy-900 mb-4">8. Governing Law and Disputes</h2>
              <p className="text-navy-700 mb-2">
                These Terms are governed by <strong>Tennessee law</strong>.
              </p>
              <p className="text-navy-700 mb-2">
                <strong>How We&apos;ll Resolve Disputes:</strong>
              </p>
              <ol className="list-decimal pl-6 text-navy-700 space-y-1 mb-2">
                <li><strong>Talk first:</strong> Contact us at [firm email] to try to resolve it informally.</li>
                <li><strong>Mediation:</strong> If that doesn&apos;t work within 30 days, we&apos;ll try mediation in Memphis, Tennessee.</li>
                <li><strong>Court:</strong> If mediation fails, any lawsuit must be filed in Shelby County, Tennessee courts.</li>
              </ol>
              <p className="text-navy-700 mb-2">
                You agree to bring claims only in your individual capacity, not as part of any class action.
              </p>
              <p className="text-navy-700">
                Any claim related to these Terms or the Site must be filed within one (1) year.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-navy-900 mb-4">9. Cancellation</h2>
              <p className="text-navy-700 mb-2">
                <strong>Service Cancellation:</strong> Either party may cancel services at any time with written notice. Fees are due for services already rendered up to the cancellation date.
              </p>
              <p className="text-navy-700">
                <strong>Site Access:</strong> We may suspend or terminate your access to the Site at any time, for any reason, without notice.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-navy-900 mb-4">10. Changes to Terms</h2>
              <p className="text-navy-700">
                We may update these Terms at any time. Changes take effect when posted with a new &ldquo;Last Updated&rdquo; date. Continued use of the Site means you accept the updated Terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-navy-900 mb-4">11. Severability</h2>
              <p className="text-navy-700">
                If any part of these Terms is unenforceable, the rest remains in effect.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-navy-900 mb-4">12. Entire Agreement</h2>
              <p className="text-navy-700">
                These Terms, plus our <a href="/privacy" className="text-gold-600 hover:text-gold-700 underline">Privacy Policy</a>, are the complete agreement between you and [Firm Name] for Site use.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-navy-900 mb-4">13. Contact Us</h2>
              <p className="text-navy-700">
                Questions about these Terms? Contact us:
              </p>
              <p className="text-navy-700 mt-2">
                <strong>[Firm Legal Name]</strong><br />
                Email: <a href="mailto:[firm email]" className="text-gold-600 hover:text-gold-700">[firm email]</a><br />
                Phone: <PhoneNumber plain className="text-gold-600 hover:text-gold-700" /><br />
                Website: [firm website]
              </p>
            </section>

            <div className="mt-12 p-6 bg-navy-50 rounded-lg border border-navy-200">
              {agreed && agreementRecord ? (
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-navy-900 mb-2">Agreement Accepted</h3>
                  <p className="text-navy-600 mb-4">Thank you for agreeing to our terms of service.</p>
                  <div className="text-sm text-navy-500 space-y-1">
                    <p><strong>Signed by:</strong> {agreementRecord.name}</p>
                    <p><strong>Email:</strong> {agreementRecord.email}</p>
                    <p><strong>Date:</strong> {agreementRecord.timestamp}</p>
                  </div>
                </div>
              ) : (
                <div>
                  <h3 className="text-xl font-semibold text-navy-900 mb-4">Accept Terms of Service</h3>
                  <p className="text-navy-600 mb-4">
                    By clicking &ldquo;I Agree&rdquo; below, you confirm that you have read, understand, and agree to be bound by these terms.
                  </p>
                  
                  {showForm && (
                    <div className="space-y-4 mb-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-navy-700 mb-1">
                          Full Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-2 border border-navy-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                          placeholder="John Smith"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-navy-700 mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-2 border border-navy-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                          placeholder="john@lawfirm.com"
                        />
                      </div>
                    </div>
                  )}
                  
                  <button
                    onClick={handleAgree}
                    className="w-full sm:w-auto px-8 py-3 bg-gold-500 hover:bg-gold-600 text-navy-900 font-semibold rounded-lg transition-colors"
                  >
                    I Agree to the Terms of Service
                  </button>
                </div>
              )}
            </div>

            <p className="text-sm text-navy-500 mt-8">
              Last updated: February 16, 2026 · Questions? Email{" "}
              <a href="mailto:[firm email]" className="text-gold-600 hover:text-gold-700">
                [firm email]
              </a>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
