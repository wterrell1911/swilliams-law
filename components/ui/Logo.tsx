import { cn } from "@/lib/utils"

// TODO: Phase 3 — replace SVG logo with firm logo from firmConfig.branding.logo
// This is a placeholder logo showing "LAW FIRM" text
export function Logo({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 60"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-14 w-auto", className)}
      aria-label="Firm Logo"
    >
      {/* Scale of justice icon */}
      <path d="M 30,8 L 30,48 M 20,48 L 40,48 M 18,18 L 42,18 M 18,18 L 14,30 Q 22,34 26,30 L 22,18 M 38,18 L 34,30 Q 38,34 46,30 L 42,18" fill="none" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Firm name placeholder */}
      <text x="55" y="28" fontFamily="'Inter', 'Helvetica Neue', Arial, sans-serif" fontSize="18" fill="currentColor" fontWeight="700">LAW FIRM</text>
      <text x="55" y="46" fontFamily="'Inter', 'Helvetica Neue', Arial, sans-serif" fontSize="10" fill="currentColor" fillOpacity="0.6" letterSpacing="2" fontWeight="400">TEMPLATE</text>
    </svg>
  )
}

export function LogoIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 50 50"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-10 w-auto", className)}
      aria-label="Firm Logo"
    >
      {/* Scale of justice icon */}
      <path d="M 25,5 L 25,42 M 17,42 L 33,42 M 13,15 L 37,15 M 13,15 L 9,27 Q 17,31 21,27 L 17,15 M 33,15 L 29,27 Q 33,31 41,27 L 37,15" fill="none" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}
