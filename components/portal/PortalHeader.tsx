"use client"

import { useRouter } from "next/navigation"
import type { Profile } from "@/lib/types/portal"

interface PortalHeaderProps {
  profile: Profile | null
  onMenuToggle: () => void
}

export function PortalHeader({ profile, onMenuToggle }: PortalHeaderProps) {
  const router = useRouter()

  async function handleSignOut() {
    await fetch("/api/admin/auth/logout", { method: "POST" })
    router.push("/portal/login")
    router.refresh()
  }

  return (
    <header className="h-16 bg-navy-950 border-b border-navy-800 flex items-center justify-between px-4 lg:px-6">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuToggle}
          className="lg:hidden p-2 text-warmWhite/70 hover:text-warmWhite transition-colors"
          aria-label="Toggle menu"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
        <div>
          <h2 className="text-sm font-medium text-warmWhite">
            {profile?.firm_name || "Portal"}
          </h2>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {profile?.role === "admin" && (
          <span className="hidden sm:inline-block text-[10px] font-semibold uppercase tracking-wider bg-gold-500/10 text-gold-500 px-2 py-1 rounded">
            Admin
          </span>
        )}
        <button
          onClick={handleSignOut}
          className="text-sm text-warmWhite/60 hover:text-warmWhite transition-colors"
        >
          Sign out
        </button>
      </div>
    </header>
  )
}
