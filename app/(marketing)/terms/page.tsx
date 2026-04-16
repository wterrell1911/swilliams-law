import { Metadata } from "next"
import { PhoneNumber } from "@/components/PhoneNumber"

export const metadata: Metadata = {
  title: "Terms of Service | S. Williams Law Firm",
  description: "Terms of service for S. Williams Law Firm website.",
}

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-warmWhite pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl py-12 lg:py-16">
        <h1 className="text-3xl md:text-4xl font-bold text-navy-900 mb-8">
          Terms of Service
        </h1>

        <div className="prose prose-navy max-w-none">
          <p className="text-lg text-navy-600 mb-8">
            Welcome to swilliamslawfirm.com (the &ldquo;Site&rdquo;), operated by S. Williams Law Firm, LLC. By accessing or using this Site, you agree to these Terms of Service.
          </p>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-navy-900 mb-4">1. No Attorney-Client Relationship</h2>
            <p className="text-navy-700">
              The information on this website is for general information purposes only. Nothing on this Site should be taken as legal advice for any individual case or situation. This information is not intended to create, and receipt or viewing does not constitute, an attorney-client relationship. An attorney-client relationship is only formed when you have signed a written engagement agreement with S. Williams Law Firm, LLC.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-navy-900 mb-4">2. No Legal Advice</h2>
            <p className="text-navy-700">
              The content on this Site, including blog posts, practice area descriptions, and FAQ answers, is provided for informational purposes only and should not be relied upon as legal advice. Every legal situation is unique, and you should consult with a qualified attorney regarding your specific circumstances.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-navy-900 mb-4">3. Case Results Disclaimer</h2>
            <p className="text-navy-700">
              Prior results do not guarantee a similar outcome. Each case is unique and must be evaluated on its own merits. The case results displayed on this Site are not a guarantee or prediction of the outcome of any other case.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-navy-900 mb-4">4. Use of This Site</h2>
            <p className="text-navy-700 mb-2">You agree to use this Site only for lawful purposes and in accordance with these Terms. You agree not to:</p>
            <ul className="list-disc pl-6 text-navy-700 space-y-1">
              <li>Use the Site in any way that violates applicable law</li>
              <li>Attempt to gain unauthorized access to any part of the Site</li>
              <li>Use the Site to transmit harmful or malicious content</li>
              <li>Interfere with the proper functioning of the Site</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-navy-900 mb-4">5. Intellectual Property</h2>
            <p className="text-navy-700">
              All content on this Site, including text, graphics, logos, and images, is the property of S. Williams Law Firm, LLC and is protected by copyright and other intellectual property laws. You may not reproduce, distribute, or create derivative works from this content without our express written permission.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-navy-900 mb-4">6. Third-Party Links</h2>
            <p className="text-navy-700">
              This Site may contain links to third-party websites. We are not responsible for the content or privacy practices of those sites. We encourage you to review the terms and privacy policies of any third-party sites you visit.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-navy-900 mb-4">7. Limitation of Liability</h2>
            <p className="text-navy-700">
              S. Williams Law Firm, LLC shall not be liable for any damages arising from your use of this Site, including but not limited to direct, indirect, incidental, or consequential damages.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-navy-900 mb-4">8. Changes to These Terms</h2>
            <p className="text-navy-700">
              We may update these Terms of Service at any time. Changes are effective when posted on this page. Your continued use of the Site after changes constitutes acceptance of the updated terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-navy-900 mb-4">9. Contact Us</h2>
            <p className="text-navy-700">
              Questions about these Terms? Contact us:
            </p>
            <p className="text-navy-700 mt-2">
              <strong>S. Williams Law Firm, LLC</strong><br />
              Email: <a href="mailto:contact@swilliamslawfirm.com" className="text-gold-500 hover:text-gold-400">contact@swilliamslawfirm.com</a><br />
              Phone: <PhoneNumber plain className="text-gold-500 hover:text-gold-400" />
            </p>
          </section>

          <p className="text-sm text-navy-500 mt-8">
            Last updated: April 16, 2026
          </p>
        </div>
      </div>
    </main>
  )
}
