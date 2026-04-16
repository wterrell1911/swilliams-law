"use client"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

// Phone numbers keyed by type — extend as needed per client
const PHONE_NUMBERS: Record<string, { display: string; raw: string }> = {
  main: {
    display: siteConfig.contact.phone,
    raw: siteConfig.contact.phone.replace(/\D/g, ""),
  },
}

interface PhoneNumberProps {
  /** Which phone number to display: "main", "intake", "emergency" */
  type?: keyof typeof PHONE_NUMBERS
  /** Additional CSS classes */
  className?: string
  /** Show as a plain span (no link). Useful inside paragraphs. */
  plain?: boolean
}

/**
 * Reusable phone number component with CallRail DNI support.
 *
 * - Wraps the number in the `callrail-phone` class so CallRail's swap.js
 *   can dynamically replace it with a tracking number.
 * - Renders as a clickable `tel:` link by default (for mobile tap-to-call).
 * - Pass `plain` to render as a `<span>` instead (for inline text contexts).
 */
export function PhoneNumber({ type = "main", className, plain = false }: PhoneNumberProps) {
  const phone = PHONE_NUMBERS[type] || PHONE_NUMBERS.main

  if (plain) {
    return (
      <span className={cn("callrail-phone", className)}>
        {phone.display}
      </span>
    )
  }

  return (
    <a
      href={`tel:+1${phone.raw}`}
      className={cn("callrail-phone", className)}
    >
      {phone.display}
    </a>
  )
}
