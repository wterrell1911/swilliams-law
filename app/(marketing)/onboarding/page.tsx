"use client"

import { FadeIn } from "@/components/animations/FadeIn"
import Script from "next/script"

export default function OnboardingPage() {
  return (
    <>
      {/* Hero Section - Dark */}
      <section className="relative min-h-screen flex flex-col bg-gradient-to-b from-navy-950 via-navy-900 to-navy-900 pt-32 pb-16">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(250, 250, 249, 0.3) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
        </div>

        {/* Gradient Orbs */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-gold-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-electric-500/20 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl relative z-10">
          {/* Header Section */}
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            {/* Eyebrow */}
            <FadeIn>
              <p className="uppercase text-xs sm:text-[13px] tracking-[0.2em] text-gold-500/50 mb-6">
                CLIENT ONBOARDING
              </p>
            </FadeIn>

            {/* Headline */}
            <FadeIn delay={0.1}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-warmWhite mb-6 leading-tight">
                {/* TODO: Phase 3 — read firm name from firmConfig */}
                Welcome to Our Firm
              </h1>
            </FadeIn>

            {/* Subheadline */}
            <FadeIn delay={0.2}>
              <p className="text-base sm:text-lg text-warmWhite/70 leading-relaxed max-w-[700px] mx-auto">
                Complete the form below to get started. It takes about 10 minutes.
                After you submit, we&apos;ll schedule a quick kickoff call to review everything.
              </p>
            </FadeIn>
          </div>

          {/* Form Container */}
          <FadeIn delay={0.3}>
            <div className="w-full max-w-[800px] mx-auto px-4 sm:px-0">
              <iframe
                data-tally-src="https://tally.so/embed/jaybxa?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
                loading="eager"
                width="100%"
                height="500"
                frameBorder="0"
                marginHeight={0}
                marginWidth={0}
                title="Client Onboarding"
                className="w-full"
              />
            </div>
          </FadeIn>

          {/* Footer Text */}
          <FadeIn delay={0.4}>
            <p className="text-center text-warmWhite/50 text-sm mt-12">
              Questions?{" "}
              {/* TODO: Phase 3 — read contact email from firmConfig */}
              <a
                href="mailto:info@yourfirm.com"
                className="text-gold-500/70 hover:text-gold-500 transition-colors"
              >
                Email info@yourfirm.com
              </a>
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Tally Embed Script */}
      <Script id="tally-embed" strategy="afterInteractive">
        {`
          var d=document,w="https://tally.so/widgets/embed.js",
          v=function(){"undefined"!=typeof Tally?Tally.loadEmbeds():
          d.querySelectorAll("iframe[data-tally-src]:not([src])").forEach((function(e){e.src=e.dataset.tallySrc}))};
          if("undefined"!=typeof Tally)v();
          else if(d.querySelector('script[src="'+w+'"]')==null){var s=d.createElement("script");
          s.src=w;s.onload=v;s.onerror=v;d.body.appendChild(s)}
        `}
      </Script>
    </>
  )
}
