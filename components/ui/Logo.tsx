import { cn } from "@/lib/utils"
import Image from "next/image"

export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      {/* Scales of Justice Icon */}
      <svg
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-10 w-10 flex-shrink-0"
      >
        <circle cx="20" cy="20" r="19" stroke="#C9A227" strokeWidth="2" />
        <path
          d="M20 8v24M14 12h12M10 18l4-6M26 12l4 6M10 18c0 2.5 1.8 4 4 4s4-1.5 4-4M22 18c0 2.5 1.8 4 4 4s4-1.5 4-4"
          stroke="#C9A227"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="20" cy="8" r="2" fill="#C9A227" />
      </svg>
      <div className="flex flex-col leading-tight">
        <span className="text-sm font-display font-bold tracking-wide">S. WILLIAMS</span>
        <span className="text-[10px] tracking-[0.2em] opacity-70">LAW FIRM</span>
      </div>
    </div>
  )
}

export function LogoIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-8 w-8", className)}
    >
      <circle cx="20" cy="20" r="19" stroke="#C9A227" strokeWidth="2" />
      <path
        d="M20 8v24M14 12h12M10 18l4-6M26 12l4 6M10 18c0 2.5 1.8 4 4 4s4-1.5 4-4M22 18c0 2.5 1.8 4 4 4s4-1.5 4-4"
        stroke="#C9A227"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="20" cy="8" r="2" fill="#C9A227" />
    </svg>
  )
}
