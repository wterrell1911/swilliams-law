import { PhoneNumber } from "@/components/PhoneNumber"
import { firmConfig } from "@/config/firm.config"

export const metadata = {
  title: "Privacy Policy | S. Williams Law Firm",
  description: "How S. Williams Law Firm collects, uses, and protects your information.",
}

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-warmWhite pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl py-12 lg:py-16">
        <h1 className="text-3xl md:text-4xl font-bold text-navy-900 mb-8">
          Privacy Policy
        </h1>

        <div className="prose prose-navy max-w-none">
          <p className="text-lg text-navy-600 mb-8">
            S. Williams Law Firm, LLC (&ldquo;Company,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) respects your privacy and is committed to protecting your personal information.
            This Privacy Policy explains how we collect, use, share, and protect your information when you visit swilliamslawfirm.com (the &ldquo;Site&rdquo;) or use our services.
          </p>
          <p className="text-navy-700 mb-8">
            By using the Site or our services, you agree to this Privacy Policy. If you don&apos;t agree, please don&apos;t use the Site.
          </p>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-navy-900 mb-4">1. Information We Collect</h2>

            <h3 className="text-lg font-medium text-navy-800 mb-2">Information You Give Us</h3>
            <p className="text-navy-700 mb-2">We collect information you provide directly:</p>
            <ul className="list-disc pl-6 text-navy-700 space-y-1 mb-4">
              <li><strong>Contact Information:</strong> Name, email, phone number, address</li>
              <li><strong>Case Information:</strong> Details about your injury, accident, or legal matter</li>
              <li><strong>Communications:</strong> Messages you send through contact forms, email, or phone</li>
            </ul>

            <h3 className="text-lg font-medium text-navy-800 mb-2">Information We Collect Automatically</h3>
            <p className="text-navy-700 mb-2">When you visit the Site, we may automatically collect:</p>
            <ul className="list-disc pl-6 text-navy-700 space-y-1 mb-4">
              <li><strong>Device Information:</strong> Browser type, operating system, device identifiers</li>
              <li><strong>Usage Data:</strong> Pages visited, time on pages, clicks, referring URLs</li>
              <li><strong>Location Data:</strong> General location based on IP address</li>
            </ul>

            <h3 className="text-lg font-medium text-navy-800 mb-2">Cookies and Tracking</h3>
            <p className="text-navy-700 mb-2">We use cookies and similar technologies to remember your preferences, understand how visitors use the Site, and improve your experience.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-navy-900 mb-4">2. How We Use Your Information</h2>
            <ul className="list-disc pl-6 text-navy-700 space-y-1 mb-4">
              <li>Respond to inquiries and evaluate potential cases</li>
              <li>Provide legal services to clients</li>
              <li>Communicate about your case or inquiry</li>
              <li>Improve our Site and services</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-navy-900 mb-4">3. How We Share Your Information</h2>
            <p className="text-navy-700 mb-4 font-semibold">We don&apos;t sell your personal information.</p>
            <p className="text-navy-700 mb-2">We may share information with service providers who help us operate (hosting, analytics, email services), as required by law, or with your consent.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-navy-900 mb-4">4. How We Protect Your Information</h2>
            <p className="text-navy-700">We use reasonable security measures including encryption (SSL/TLS), secure hosting, and access controls. No system is 100% secure, and we cannot guarantee absolute security.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-navy-900 mb-4">5. Your Privacy Rights</h2>
            <p className="text-navy-700 mb-2">You have the right to:</p>
            <ul className="list-disc pl-6 text-navy-700 space-y-1 mb-4">
              <li>Request a copy of your information</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Opt out of marketing communications</li>
            </ul>
            <p className="text-navy-700">To exercise your rights, contact us at <a href="mailto:contact@swilliamslawfirm.com" className="text-gold-500 hover:text-gold-400">contact@swilliamslawfirm.com</a>.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-navy-900 mb-4">6. Children&apos;s Privacy</h2>
            <p className="text-navy-700">Our Site and services are not for anyone under 18. We don&apos;t knowingly collect information from children under 18.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-navy-900 mb-4">7. Changes to This Policy</h2>
            <p className="text-navy-700">We may update this Privacy Policy. Changes are effective when posted with a new &ldquo;Last Updated&rdquo; date.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-navy-900 mb-4">8. Contact Us</h2>
            <p className="text-navy-700">
              Questions about this Privacy Policy? Contact us:
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
