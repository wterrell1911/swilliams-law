"use client"

import { useState } from "react"
import { Sidebar } from "@/components/portal/Sidebar"
import { PortalHeader } from "@/components/portal/PortalHeader"
import type { Profile } from "@/lib/types/portal"

// Hardcoded admin profile for simple auth
const adminProfile: Profile = {
  id: "admin",
  role: "admin",
  // TODO: Phase 3 — read from firmConfig
  firm_name: "Admin Portal",
  contact_name: "Admin",
  email: "",
  phone: null,
  dropbox_folder: null,
  created_at: new Date().toISOString(),
}

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen bg-navy-950 overflow-hidden">
      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <Sidebar profile={adminProfile} />
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="fixed inset-0 bg-black/60"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 z-50 w-64">
            <Sidebar profile={adminProfile} onClose={() => setSidebarOpen(false)} />
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        <PortalHeader
          profile={adminProfile}
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
        />
        <main id="main-content" className="flex-1 overflow-y-auto p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
