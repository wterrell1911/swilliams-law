import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/Button"
import { PhoneNumber } from "@/components/PhoneNumber"

// TODO: Phase 3 — read from firmConfig
export const metadata: Metadata = {
  title: "About Our Firm | Law Firm Automation and AI Built by Legal Professionals",
  description:
    "Built by legal professionals who understand your workflows. Practice automation, AI assistants, and websites designed for how law firms actually operate.",
  keywords: [
    "law firm automation",
    "legal AI assistant",
    "law firm technology",
    "practice automation for attorneys",
    "legal workflow automation",
    "solo attorney tools",
    "law firm AI tools",
  ],
}

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Section 1: Hero */}
      <section className="bg-navy-950 pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="uppercase text-xs tracking-[0.2em] text-gold-500 mb-6">
            For lawyers. By lawyers.
          </p>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-warmWhite mb-8">
            Solo should not mean outgunned.
          </h1>
          <div className="text-warmWhite/70 leading-relaxed space-y-4 text-left max-w-2xl mx-auto mb-10">
            <p>
              Your CRM does not talk to your lead sources. Your calendar does not know what your intake system knows. Your billing platform does not connect to anything. A client calls while you are in court. Your answering service takes a message. The client waits. Maybe they call someone else.
            </p>
            <p>
              Large firms have paralegals, associates, and support staff to handle this. You have yourself and a stack of tools that do not work together.
            </p>
            <p className="text-gold-500 font-medium">
              We built this firm to change that.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            <Link href="/about">
              <Button variant="primary" size="lg">
                See How It Works
              </Button>
            </Link>
            {/* TODO: Phase 3 — read booking link from firmConfig */}
            <Link href="/contact">
              <Button variant="outline" size="lg">
                Book a Free Call
              </Button>
            </Link>
          </div>
          <p className="text-warmWhite/50 text-sm">
            No contracts. Cancel anytime. Built by attorneys who have been in your shoes.
          </p>
        </div>
      </section>

      {/* Section 2: Origin Story */}
      <section className="bg-gray-100 py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="prose prose-lg max-w-none text-navy-900 leading-relaxed space-y-6">
            <p>
              We watched our friends work themselves into the ground. Solo practitioners. Small firm partners. Smart, capable attorneys who could not catch a break.
            </p>
            <p>
              No real days off. Vacations spent checking email. A client calls while they are in court. The answering service picks up and takes a message. The client has a question that needs an answer. The answering service cannot help. So the client waits. Or they do not wait.
            </p>
            <p>
              These attorneys tried to fix it. They bought tools. Practice management software. Lead capture systems. Google Ads. LawPay. Email. Calendar apps. Good tools. But the tools do not talk to each other. The CRM does not talk to the referral system. The referral system does not talk to Google Ads. Google Ads does not talk to LawPay. LawPay does not talk to the calendar. Every tool is another tab. Another login. Another thing that breaks on a Friday afternoon.
            </p>
            <p>
              Large firms do not have this problem. They have paralegals, junior associates, IT staff, and operations managers. They are not more capable. They just have more people.
            </p>
            <p className="font-semibold">
              We asked a simple question: why can&apos;t solo practitioners have the same advantages?
            </p>
            <p>
              A well-built AI assistant can answer client questions at 11pm and actually help them. Automation can move a lead from ad to CRM to calendar without you touching it. Integrations can make your tools work together. One attorney with the right systems can operate like a firm with a full support staff.
            </p>
            <p>
              There is one catch. AI in legal practice has rules. We know them because we are also lawyers. We know what creates unauthorized practice exposure. We know how attorney-client privilege applies to AI-assisted intake. We build tools that work for lawyers because we have been lawyers.
            </p>
            <p className="text-gold-500 font-semibold text-xl">
              For lawyers. By lawyers.
            </p>
            <p>
              Not a marketing agency that added a legal vertical. Not a tech vendor that skimmed a few bar guidelines. Attorneys who lived this problem and built the tools to fix it.
            </p>
          </div>
        </div>
      </section>

      {/* Section 3: Stat Block */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="overflow-x-auto">
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
          <p className="text-center text-navy-900 font-semibold mt-8 text-lg">
            The gap is real. But it does not have to stay that way.
          </p>
          <p className="text-center text-navy-500 text-sm mt-2">
            Source: ABA 2024 Legal Technology Survey Report
          </p>
        </div>
      </section>

      {/* Section 4: What We Do */}
      <section className="bg-navy-950 py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-display font-bold text-warmWhite mb-4 text-center">
            What We Actually Do
          </h2>
          <p className="text-warmWhite/60 text-center mb-12">
            Three things. We do them every day. We do them for law firms.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="bg-navy-900/50 border border-navy-700 rounded-2xl p-8">
              <div className="text-gold-500 font-display font-bold text-2xl mb-2">01</div>
              <h3 className="text-xl font-display font-semibold text-warmWhite mb-4">
                Practice Automation
              </h3>
              <p className="text-warmWhite/70 leading-relaxed mb-4">
                We map how your firm works. Intake, scheduling, follow-up, document collection, billing reminders. Then we build systems that run those steps without you touching them. Built around your practice management software and your intake process. Not templates. Not generic tools with a legal label.
              </p>
              <p className="text-warmWhite/50 text-sm italic">
                The result: 10 to 20 hours back each month. Fewer dropped leads. Faster intake.
              </p>
            </div>

            {/* Service 2 */}
            <div className="bg-navy-900/50 border border-navy-700 rounded-2xl p-8">
              <div className="text-gold-500 font-display font-bold text-2xl mb-2">02</div>
              <h3 className="text-xl font-display font-semibold text-warmWhite mb-4">
                AI Assistant
              </h3>
              <p className="text-warmWhite/70 leading-relaxed mb-4">
                A custom AI assistant trained on your practice areas, your FAQs, and your intake process. It handles after-hours inquiries, qualifies leads before they reach you, and captures intake data on its own. Built with attorney-client confidentiality as a hard requirement, not a checkbox.
              </p>
              <p className="text-warmWhite/50 text-sm italic">
                The result: Qualified leads captured at 11pm. Intake that does not wait for you.
              </p>
            </div>

            {/* Service 3 */}
            <div className="bg-navy-900/50 border border-navy-700 rounded-2xl p-8">
              <div className="text-gold-500 font-display font-bold text-2xl mb-2">03</div>
              <h3 className="text-xl font-display font-semibold text-warmWhite mb-4">
                Website Redesign
              </h3>
              <p className="text-warmWhite/70 leading-relaxed mb-4">
                A fast, clean site built for your practice area and your market. Not a theme. Not a template. Designed to turn visitors into consultation requests. Delivered in 30 days.
              </p>
              <p className="text-warmWhite/50 text-sm italic">
                The result: A site that earns trust before a client picks up the phone.
              </p>
            </div>
          </div>

          {/* SEO/GEO Add-on Callout */}
          <div className="mt-8 text-center">
            <p className="text-warmWhite/60 text-sm">
              We also offer AI-powered local SEO and GEO optimization as an add-on. From $597/mo.
            </p>
          </div>
        </div>
      </section>

      {/* Section 5: What Makes Us Different */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-display font-bold text-navy-900 mb-12 text-center">
            What Makes Us Different
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-200 rounded-2xl p-8 border-t-4 border-t-navy-900">
              <h3 className="text-xl font-display font-semibold text-gold-500 mb-3">
                Legal background, not just legal clients
              </h3>
              <p className="text-navy-700 leading-relaxed">
                We do not have a law firm vertical. We have a law firm foundation. Our AI assistants, automation workflows, and websites are built for attorneys from the start. Not adapted from generic tools and rebranded for legal.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-8 border-t-4 border-t-navy-900">
              <h3 className="text-xl font-display font-semibold text-gold-500 mb-3">
                AI built with ethics in mind
              </h3>
              <p className="text-navy-700 leading-relaxed">
                Attorney-client privilege is not a checkbox. Every workflow we build protects client confidentiality, avoids unauthorized practice exposure, and stays within your bar&apos;s rules. We know those rules because we have practiced under them.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-8 border-t-4 border-t-navy-900">
              <h3 className="text-xl font-display font-semibold text-gold-500 mb-3">
                Automation that fits your practice
              </h3>
              <p className="text-navy-700 leading-relaxed">
                We have seen the tools firms buy and never use. Our automation is built around how you work. Your practice management software, your intake criteria, your billing cycles. You do not change your process to use our tools. Our tools adapt to yours.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-8 border-t-4 border-t-navy-900">
              <h3 className="text-xl font-display font-semibold text-gold-500 mb-3">
                We report on outcomes, not activity
              </h3>
              <p className="text-navy-700 leading-relaxed">
                We do not send reports full of impressions and click rates. We report on hours saved, leads captured, and consults booked. If we cannot show you the return in plain numbers, we have not done our job.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: The Window */}
      <section className="bg-gray-100 py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="space-y-4 text-navy-900 leading-relaxed">
            <p>
              In 1999, some firms built websites. Others kept the Yellow Pages ad. Within a decade, the firms that waited were scrambling to catch up.
            </p>
            <p>
              AI is that moment for legal practice. Firms that build automation now will compound that advantage each year. Faster intake, more capacity, better client experience, lower overhead. Firms that wait will wonder what changed.
            </p>
            <p className="font-semibold text-lg">
              Only 18% of solo attorneys use AI today. That is not a warning. It is a window.
            </p>
            <p>
              The firms that move now will not just keep up with larger competitors. They will pass them. We built this firm so solo practitioners are not the ones left behind.
            </p>
          </div>
        </div>
      </section>

      {/* Section 7: Commitment */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="bg-gold-300/20 border border-gold-300 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-display font-semibold text-navy-900 mb-2">
              Our Commitment
            </h3>
            <p className="text-gold-500 font-medium mb-4">
              How we work with every client
            </p>
            <p className="text-navy-700 leading-relaxed mb-4">
              We will never recommend a service you do not need. We will never lock you into a contract that protects us instead of you. We will never hide results behind vanity metrics.
            </p>
            <p className="text-navy-900 font-semibold">
              No contracts. Cancel any month. Our business only works if yours does. That is the only model we run.
            </p>
          </div>
        </div>
      </section>

      {/* Section 8: CTA */}
      <section className="bg-navy-950 py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-display font-bold text-warmWhite mb-4">
            Not sure where AI fits in your practice? Start here.
          </h2>
          <p className="text-lg text-warmWhite/60 mb-8 max-w-xl mx-auto">
            Free 30-minute call. We will walk through your current workflows, show you where automation has the most impact, and give you an honest answer on whether we are the right fit. No pitch. No pressure.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            <Link href="/about">
              <Button variant="primary" size="lg">
                See How It Works
              </Button>
            </Link>
            {/* TODO: Phase 3 — read booking link from firmConfig */}
            <Link href="/contact">
              <Button variant="outline" size="lg">
                Book a Free Call
              </Button>
            </Link>
          </div>
          <p className="text-warmWhite/60 mb-4">
            Or call directly
          </p>
          <PhoneNumber className="text-warmWhite hover:text-gold-500 transition-colors font-medium text-xl" />
          <p className="text-gold-500 font-medium mt-8">
            For lawyers. By lawyers.
          </p>
        </div>
      </section>
    </div>
  )
}
