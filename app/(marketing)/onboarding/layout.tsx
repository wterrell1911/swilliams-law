import type { Metadata } from "next"

export const metadata: Metadata = {
  // TODO: Phase 3 — read firm name from firmConfig
  title: "Client Onboarding | Your Law Firm",
  description: "Complete your client onboarding form to get started.",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
}

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
