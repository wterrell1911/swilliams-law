"use client"

import { ScrollReveal, ScrollRevealItem } from "@/components/animations/ScrollReveal"
import { Card } from "@/components/ui/Card"

export function HowItWorksSection() {
  return (
    <section className="py-24 sm:py-32 bg-navy-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <ScrollReveal className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-warmWhite mb-4">
            One Idea Becomes <span className="text-gradient">Everywhere</span>
          </h2>
          <p className="text-xl text-warmWhite/70 max-w-2xl mx-auto">
            We multiply your expertise across every channel. You share one insight, we turn it into a comprehensive campaign.
          </p>
        </ScrollReveal>

        {/* Content Multiplication Flow */}
        <ScrollReveal>
          <div className="max-w-4xl mx-auto">
            {/* Your Input */}
            <div className="text-center mb-8">
              <Card variant="bordered" className="inline-block p-6 bg-gradient-to-br from-gold-500/20 to-electric-500/20 border-gold-500/50">
                <div className="flex items-center gap-4">
                  <svg className="w-10 h-10 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  <div className="text-left">
                    <div className="text-sm text-warmWhite/60 mb-1">You Share</div>
                    <div className="text-lg font-semibold text-warmWhite">One Case Insight or Question</div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Arrow Down */}
            <div className="flex justify-center mb-8">
              <svg className="w-8 h-8 text-gold-500 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>

            {/* Outputs */}
            <ScrollReveal stagger staggerDelay={0.1}>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                <ScrollRevealItem>
                  <Card variant="bordered" className="p-6 bg-navy-800/50 border-navy-700 hover:border-gold-500/50 transition-colors">
                    <div className="w-12 h-12 rounded-lg bg-gold-500/20 flex items-center justify-center mb-4">
                      <svg className="w-6 h-6 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div className="text-warmWhite font-semibold mb-2">SEO Blog Post</div>
                    <div className="text-sm text-warmWhite/60">Ranks for relevant searches</div>
                  </Card>
                </ScrollRevealItem>

                <ScrollRevealItem>
                  <Card variant="bordered" className="p-6 bg-navy-800/50 border-navy-700 hover:border-gold-500/50 transition-colors">
                    <div className="w-12 h-12 rounded-lg bg-electric-500/20 flex items-center justify-center mb-4">
                      <svg className="w-6 h-6 text-electric-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="text-warmWhite font-semibold mb-2">Video Content</div>
                    <div className="text-sm text-warmWhite/60">Polished and branded</div>
                  </Card>
                </ScrollRevealItem>

                <ScrollRevealItem>
                  <Card variant="bordered" className="p-6 bg-navy-800/50 border-navy-700 hover:border-gold-500/50 transition-colors">
                    <div className="w-12 h-12 rounded-lg bg-gold-500/20 flex items-center justify-center mb-4">
                      <svg className="w-6 h-6 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                      </svg>
                    </div>
                    <div className="text-warmWhite font-semibold mb-2">Social Posts</div>
                    <div className="text-sm text-warmWhite/60">Multiple platforms</div>
                  </Card>
                </ScrollRevealItem>

                <ScrollRevealItem>
                  <Card variant="bordered" className="p-6 bg-navy-800/50 border-navy-700 hover:border-gold-500/50 transition-colors">
                    <div className="w-12 h-12 rounded-lg bg-electric-500/20 flex items-center justify-center mb-4">
                      <svg className="w-6 h-6 text-electric-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="text-warmWhite font-semibold mb-2">Email Newsletter</div>
                    <div className="text-sm text-warmWhite/60">Nurture your list</div>
                  </Card>
                </ScrollRevealItem>

                <ScrollRevealItem>
                  <Card variant="bordered" className="p-6 bg-navy-800/50 border-navy-700 hover:border-gold-500/50 transition-colors">
                    <div className="w-12 h-12 rounded-lg bg-gold-500/20 flex items-center justify-center mb-4">
                      <svg className="w-6 h-6 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                    </div>
                    <div className="text-warmWhite font-semibold mb-2">Google Posts</div>
                    <div className="text-sm text-warmWhite/60">Boost local visibility</div>
                  </Card>
                </ScrollRevealItem>

                <ScrollRevealItem>
                  <Card variant="bordered" className="p-6 bg-navy-800/50 border-navy-700 hover:border-gold-500/50 transition-colors">
                    <div className="w-12 h-12 rounded-lg bg-electric-500/20 flex items-center justify-center mb-4">
                      <svg className="w-6 h-6 text-electric-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    </div>
                    <div className="text-warmWhite font-semibold mb-2">Paid Ads</div>
                    <div className="text-sm text-warmWhite/60">Targeted campaigns</div>
                  </Card>
                </ScrollRevealItem>

                <ScrollRevealItem>
                  <Card variant="bordered" className="p-6 bg-navy-800/50 border-navy-700 hover:border-gold-500/50 transition-colors">
                    <div className="w-12 h-12 rounded-lg bg-gold-500/20 flex items-center justify-center mb-4">
                      <svg className="w-6 h-6 text-gold-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0v-1H3a1 1 0 010-2h1v-1a1 1 0 011-1zm7-10a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" />
                      </svg>
                    </div>
                    <div className="text-warmWhite font-semibold mb-2">AI Optimization</div>
                    <div className="text-sm text-warmWhite/60">Get cited by AI</div>
                  </Card>
                </ScrollRevealItem>
              </div>
            </ScrollReveal>

            {/* Bottom Message */}
            <ScrollReveal delay={0.4} className="mt-12 text-center">
              <Card variant="bordered" className="inline-block px-8 py-6 bg-navy-800/30 border-gold-500/30">
                <p className="text-lg text-warmWhite/90">
                  <span className="font-semibold text-gold-500">Your minimal effort.</span>{" "}
                  Our complete execution.
                </p>
              </Card>
            </ScrollReveal>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
