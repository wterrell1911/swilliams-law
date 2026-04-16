import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { PhoneNumber } from "@/components/PhoneNumber"

export const metadata = {
  title: "Privacy Policy | [Firm Name]",
  description: "How we collect, use, and protect your information.",
}

export default function PrivacyPage() {
  return (
    <>
      {/* TODO: Phase 3 — read all firm identity from firmConfig */}
      <Header />
      <main className="min-h-screen bg-warmWhite pt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl py-12 lg:py-16">
          <h1 className="text-3xl md:text-4xl font-bold text-navy-900 mb-8">
            Privacy Policy
          </h1>

          <div className="prose prose-navy max-w-none">
            <p className="text-lg text-navy-600 mb-8">
              [Firm Legal Name] (&ldquo;Company,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) respects your privacy and is committed to protecting your personal information. 
              This Privacy Policy explains how we collect, use, share, and protect your information when you visit [firm website] (the &ldquo;Site&rdquo;) or use our services.
            </p>
            <p className="text-navy-700 mb-8">
              By using the Site or our services, you agree to this Privacy Policy. If you don&apos;t agree, please don&apos;t use the Site.
            </p>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-navy-900 mb-4">1. Information We Collect</h2>
              
              <h3 className="text-lg font-medium text-navy-800 mb-2">Information You Give Us</h3>
              <p className="text-navy-700 mb-2">We collect information you provide directly:</p>
              <ul className="list-disc pl-6 text-navy-700 space-y-1 mb-4">
                <li><strong>Contact Information:</strong> Name, email, phone number, business name, address</li>
                <li><strong>Business Information:</strong> Details about your firm, practice areas, marketing needs</li>
                <li><strong>Communications:</strong> Messages you send through contact forms, email, or phone</li>
                <li><strong>Service Information:</strong> Details needed to provide our consulting services</li>
                <li><strong>Payment Information:</strong> Billing details for invoicing (processed through secure third-party processors)</li>
              </ul>
              
              <h3 className="text-lg font-medium text-navy-800 mb-2">Information We Collect Automatically</h3>
              <p className="text-navy-700 mb-2">When you visit the Site, we may automatically collect:</p>
              <ul className="list-disc pl-6 text-navy-700 space-y-1 mb-4">
                <li><strong>Device Information:</strong> Browser type, operating system, device identifiers</li>
                <li><strong>Usage Data:</strong> Pages visited, time on pages, clicks, referring URLs</li>
                <li><strong>Location Data:</strong> General location based on IP address</li>
                <li><strong>Log Data:</strong> IP address, access times, error logs</li>
              </ul>

              <h3 className="text-lg font-medium text-navy-800 mb-2">Cookies and Tracking</h3>
              <p className="text-navy-700 mb-2">We use cookies and similar technologies to:</p>
              <ul className="list-disc pl-6 text-navy-700 space-y-1">
                <li>Remember your preferences</li>
                <li>Understand how visitors use the Site</li>
                <li>Improve your experience</li>
              </ul>
              <p className="text-navy-700 mt-2">
                <strong>Types of Cookies:</strong> Essential (required for basic Site functions), Analytics (help us understand Site usage), Marketing (track visitors for advertising purposes).
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-navy-900 mb-4">2. How We Use Your Information</h2>
              
              <h3 className="text-lg font-medium text-navy-800 mb-2">To Provide Services</h3>
              <ul className="list-disc pl-6 text-navy-700 space-y-1 mb-4">
                <li>Respond to inquiries and consultations</li>
                <li>Deliver contracted services</li>
                <li>Communicate about projects</li>
                <li>Process payments and send invoices</li>
              </ul>

              <h3 className="text-lg font-medium text-navy-800 mb-2">To Operate the Site</h3>
              <ul className="list-disc pl-6 text-navy-700 space-y-1 mb-4">
                <li>Keep the Site running</li>
                <li>Improve functionality and user experience</li>
                <li>Analyze usage trends</li>
                <li>Detect and prevent security issues</li>
              </ul>

              <h3 className="text-lg font-medium text-navy-800 mb-2">To Communicate</h3>
              <ul className="list-disc pl-6 text-navy-700 space-y-1 mb-4">
                <li>Send service-related messages</li>
                <li>Answer your questions</li>
                <li>Send marketing communications (with your consent)</li>
                <li>Provide customer support</li>
              </ul>

              <h3 className="text-lg font-medium text-navy-800 mb-2">For Legal and Business Purposes</h3>
              <ul className="list-disc pl-6 text-navy-700 space-y-1">
                <li>Comply with legal requirements</li>
                <li>Enforce our Terms of Service</li>
                <li>Protect our rights</li>
                <li>Run our business</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-navy-900 mb-4">3. How We Share Your Information</h2>
              <p className="text-navy-700 mb-4 font-semibold">We don&apos;t sell your personal information.</p>
              <p className="text-navy-700 mb-2">We may share information with:</p>
              
              <h3 className="text-lg font-medium text-navy-800 mb-2">Service Providers</h3>
              <p className="text-navy-700 mb-2">Third parties that help us operate, including:</p>
              <ul className="list-disc pl-6 text-navy-700 space-y-1 mb-4">
                <li>Website hosting providers</li>
                <li>Analytics tools (like Google Analytics)</li>
                <li>Payment processors (like Stripe)</li>
                <li>Email services</li>
                <li>CRM tools</li>
              </ul>
              <p className="text-navy-700 mb-4">These providers must protect your information and use it only as we direct.</p>

              <h3 className="text-lg font-medium text-navy-800 mb-2">Business Transfers</h3>
              <p className="text-navy-700 mb-4">If we&apos;re involved in a merger, acquisition, or sale, your information may transfer as part of that transaction.</p>

              <h3 className="text-lg font-medium text-navy-800 mb-2">Legal Requirements</h3>
              <p className="text-navy-700 mb-2">We may disclose information if required by law or to:</p>
              <ul className="list-disc pl-6 text-navy-700 space-y-1 mb-4">
                <li>Respond to legal process (subpoenas, court orders)</li>
                <li>Respond to government requests</li>
                <li>Protect our legal rights</li>
                <li>Prevent fraud or illegal activity</li>
              </ul>

              <h3 className="text-lg font-medium text-navy-800 mb-2">With Your Consent</h3>
              <p className="text-navy-700">We may share information for other purposes if you give us permission.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-navy-900 mb-4">4. How Long We Keep Your Information</h2>
              <p className="text-navy-700 mb-2">We keep information as long as needed to:</p>
              <ul className="list-disc pl-6 text-navy-700 space-y-1 mb-4">
                <li>Provide services you requested</li>
                <li>Maintain our business relationship</li>
                <li>Comply with legal obligations</li>
                <li>Resolve disputes</li>
                <li>Enforce agreements</li>
              </ul>
              <p className="text-navy-700">
                <strong>Typical Retention:</strong> Contact form submissions: 3 years after last communication. Client records: 7 years after engagement ends (for legal/tax purposes). Analytics data: 26 months.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-navy-900 mb-4">5. How We Protect Your Information</h2>
              <p className="text-navy-700 mb-2">We use reasonable security measures, including:</p>
              <ul className="list-disc pl-6 text-navy-700 space-y-1 mb-4">
                <li>Encryption (SSL/TLS)</li>
                <li>Secure hosting</li>
                <li>Access controls</li>
                <li>Regular security reviews</li>
                <li>Employee training</li>
              </ul>
              <p className="text-navy-700"><strong>No system is 100% secure.</strong> We can&apos;t guarantee absolute security.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-navy-900 mb-4">6. Your Privacy Rights</h2>
              
              <h3 className="text-lg font-medium text-navy-800 mb-2">Everyone Has These Rights</h3>
              <ul className="list-disc pl-6 text-navy-700 space-y-1 mb-4">
                <li><strong>Access:</strong> Request a copy of your information</li>
                <li><strong>Correction:</strong> Request we fix inaccurate information</li>
                <li><strong>Deletion:</strong> Request we delete your information</li>
                <li><strong>Opt-Out:</strong> Unsubscribe from marketing emails</li>
              </ul>

              <h3 className="text-lg font-medium text-navy-800 mb-2">California Residents (CCPA/CPRA)</h3>
              <p className="text-navy-700 mb-2">If you&apos;re in California, you also have the right to:</p>
              <ul className="list-disc pl-6 text-navy-700 space-y-1 mb-4">
                <li>Know what personal information we collect and share</li>
                <li>Delete your personal information</li>
                <li>Correct inaccurate information</li>
                <li>Opt out of &ldquo;sales&rdquo; or &ldquo;sharing&rdquo; of personal information</li>
                <li>Limit use of sensitive information</li>
                <li>Not be discriminated against for exercising your rights</li>
              </ul>
              <p className="text-navy-700 mb-4">
                <strong>We don&apos;t sell personal information.</strong> To exercise your California rights, email [firm email] or call [firm phone].
              </p>

              <h3 className="text-lg font-medium text-navy-800 mb-2">EU/UK Residents (GDPR)</h3>
              <p className="text-navy-700 mb-2">If you&apos;re in the EU or UK, you have rights under GDPR including access, correction, deletion, restriction, portability, and objection.</p>
              <p className="text-navy-700 mb-4">
                <strong>Legal Basis for Processing:</strong> Consent (for marketing), Contract (to provide services), Legitimate interests (for analytics), Legal obligation (for compliance).
              </p>
              <p className="text-navy-700 mb-4">To exercise GDPR rights, email [firm email].</p>

              <h3 className="text-lg font-medium text-navy-800 mb-2">How to Exercise Your Rights</h3>
              <p className="text-navy-700">
                Contact us at <a href="mailto:[firm email]" className="text-gold-600 hover:text-gold-700">[firm email]</a> or call [firm phone]. We&apos;ll respond within 30 days (or as required by law).
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-navy-900 mb-4">7. Cookies</h2>
              <h3 className="text-lg font-medium text-navy-800 mb-2">What Are Cookies?</h3>
              <p className="text-navy-700 mb-4">Small text files stored on your device that help websites remember your preferences and understand usage.</p>
              
              <h3 className="text-lg font-medium text-navy-800 mb-2">Managing Cookies</h3>
              <p className="text-navy-700 mb-2">Control cookies through your browser settings:</p>
              <ul className="list-disc pl-6 text-navy-700 space-y-1 mb-4">
                <li><strong>Chrome:</strong> Settings &gt; Privacy and Security &gt; Cookies</li>
                <li><strong>Firefox:</strong> Options &gt; Privacy &amp; Security &gt; Cookies</li>
                <li><strong>Safari:</strong> Preferences &gt; Privacy &gt; Cookies</li>
                <li><strong>Edge:</strong> Settings &gt; Privacy &amp; Security &gt; Cookies</li>
              </ul>
              <p className="text-navy-700 mb-4">Disabling cookies may affect Site functionality.</p>

              <h3 className="text-lg font-medium text-navy-800 mb-2">Google Analytics</h3>
              <p className="text-navy-700">
                We use Google Analytics for Site analytics. Opt out with the{" "}
                <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-gold-600 hover:text-gold-700">
                  Google Analytics Opt-Out Add-on
                </a>.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-navy-900 mb-4">8. Children&apos;s Privacy</h2>
              <p className="text-navy-700">
                Our Site and services are not for anyone under 18. We don&apos;t knowingly collect information from children under 18. If we learn we have, we&apos;ll delete it promptly.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-navy-900 mb-4">9. Third-Party Links</h2>
              <p className="text-navy-700">
                The Site may link to other websites. We&apos;re not responsible for their privacy practices. Review their privacy policies before sharing information.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-navy-900 mb-4">10. Data Breaches</h2>
              <p className="text-navy-700 mb-2">If a breach affects your personal information, we will:</p>
              <ul className="list-disc pl-6 text-navy-700 space-y-1">
                <li>Investigate promptly</li>
                <li>Take steps to minimize harm</li>
                <li>Notify you as required by law</li>
                <li>Notify authorities as required</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-navy-900 mb-4">11. Changes to This Policy</h2>
              <p className="text-navy-700">
                We may update this Privacy Policy. Changes are effective when posted with a new &ldquo;Last Updated&rdquo; date. For significant changes, we may notify you by email or Site notice. Continued use of the Site after changes means you accept the updated policy.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-navy-900 mb-4">12. Contact Us</h2>
              <p className="text-navy-700">
                Questions about this Privacy Policy? Contact us:
              </p>
              <p className="text-navy-700 mt-2">
                <strong>[Firm Legal Name]</strong><br />
                Email: <a href="mailto:[firm email]" className="text-gold-600 hover:text-gold-700">[firm email]</a><br />
                Phone: <PhoneNumber plain className="text-gold-600 hover:text-gold-700" /><br />
                Website: [firm website]
              </p>
            </section>

            <p className="text-sm text-navy-500 mt-8">
              Last updated: February 16, 2026
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
