"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { StatCard } from "@/components/portal/StatCard"
import { StatusBadge } from "@/components/portal/StatusBadge"
import { StatCardSkeleton, CardSkeleton } from "@/components/portal/LoadingSkeleton"
import { cn } from "@/lib/utils"
import type { Profile, DeliverableWithClient, DeliverableStatus } from "@/lib/types/portal"
import { DELIVERABLE_STATUS_LABELS } from "@/lib/types/portal"
import Link from "next/link"

const STATUS_ORDER: DeliverableStatus[] = ["draft", "in_review", "approved", "scheduled", "published"]

export default function AdminOverviewPage() {
  const supabase = createClient()
  const [clients, setClients] = useState<Profile[]>([])
  const [deliverables, setDeliverables] = useState<DeliverableWithClient[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      const [clientsRes, deliverablesRes] = await Promise.all([
        supabase.from("profiles").select("*").eq("role", "client").order("created_at", { ascending: false }),
        supabase.from("deliverables").select("*, profiles(firm_name, contact_name, email)").order("created_at", { ascending: false }),
      ])
      if (clientsRes.data) setClients(clientsRes.data as Profile[])
      if (deliverablesRes.data) setDeliverables(deliverablesRes.data as DeliverableWithClient[])
      setLoading(false)
    }
    fetchData()
  }, [supabase])

  const statusCounts = STATUS_ORDER.reduce<Record<string, number>>((acc, s) => {
    acc[s] = deliverables.filter((d) => d.status === s).length
    return acc
  }, {})

  const now = new Date()
  const overdue = deliverables.filter(
    (d) => d.due_date && new Date(d.due_date) < now && !["published", "rejected"].includes(d.status)
  )

  const threeDaysAgo = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000)
  const bottlenecks = deliverables.filter(
    (d) => new Date(d.updated_at) < threeDaysAgo && !["published", "rejected"].includes(d.status)
  )

  if (loading) {
    return (
      <div>
        <h1 className="text-2xl font-display font-bold text-warmWhite mb-6">Admin Overview</h1>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-8">
          {STATUS_ORDER.map((s) => <StatCardSkeleton key={s} />)}
        </div>
        <CardSkeleton />
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-2xl font-display font-bold text-warmWhite mb-6">Admin Overview</h1>

      {/* Pipeline counts */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-8">
        {STATUS_ORDER.map((status) => (
          <div key={status} className="bg-navy-900 border border-navy-700 rounded-xl p-4 text-center">
            <p className="text-2xl font-display font-bold text-warmWhite">{statusCounts[status] || 0}</p>
            <StatusBadge status={status} className="mt-1" />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Overdue items */}
        <div className="bg-navy-900 border border-navy-700 rounded-xl">
          <div className="p-4 border-b border-navy-700">
            <h2 className="text-sm font-semibold text-warmWhite flex items-center gap-2">
              Overdue
              {overdue.length > 0 && (
                <span className="bg-red-500/15 text-red-400 text-xs px-2 py-0.5 rounded-full">{overdue.length}</span>
              )}
            </h2>
          </div>
          <div className="divide-y divide-navy-800 max-h-64 overflow-y-auto">
            {overdue.length === 0 ? (
              <p className="p-4 text-sm text-warmWhite/40 text-center">No overdue items</p>
            ) : (
              overdue.map((d) => (
                <div key={d.id} className="p-3 flex items-center justify-between">
                  <div className="min-w-0">
                    <p className="text-sm text-warmWhite truncate">{d.title}</p>
                    <p className="text-xs text-warmWhite/40">{d.profiles?.firm_name}</p>
                  </div>
                  <span className="text-xs text-red-400 flex-shrink-0">
                    Due {new Date(d.due_date!).toLocaleDateString()}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Bottlenecks */}
        <div className="bg-navy-900 border border-navy-700 rounded-xl">
          <div className="p-4 border-b border-navy-700">
            <h2 className="text-sm font-semibold text-warmWhite flex items-center gap-2">
              Bottlenecks
              {bottlenecks.length > 0 && (
                <span className="bg-gold-500/15 text-gold-400 text-xs px-2 py-0.5 rounded-full">{bottlenecks.length}</span>
              )}
            </h2>
          </div>
          <div className="divide-y divide-navy-800 max-h-64 overflow-y-auto">
            {bottlenecks.length === 0 ? (
              <p className="p-4 text-sm text-warmWhite/40 text-center">No bottlenecks detected</p>
            ) : (
              bottlenecks.map((d) => (
                <div key={d.id} className="p-3 flex items-center justify-between">
                  <div className="min-w-0">
                    <p className="text-sm text-warmWhite truncate">{d.title}</p>
                    <p className="text-xs text-warmWhite/40">{d.profiles?.firm_name}</p>
                  </div>
                  <StatusBadge status={d.status} />
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Client list */}
      <div className="bg-navy-900 border border-navy-700 rounded-xl">
        <div className="p-4 border-b border-navy-700 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-warmWhite">Clients ({clients.length})</h2>
          <Link href="/portal/admin/clients" className="text-xs text-gold-500 hover:text-gold-400 transition-colors">
            Manage
          </Link>
        </div>
        <div className="divide-y divide-navy-800">
          {clients.map((c) => {
            const clientDeliverables = deliverables.filter((d) => d.client_id === c.id)
            const active = clientDeliverables.filter((d) => !["published", "rejected"].includes(d.status)).length
            return (
              <div key={c.id} className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-warmWhite">{c.firm_name || "Unnamed"}</p>
                  <p className="text-xs text-warmWhite/40">{c.contact_name} — {c.email}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={cn("text-xs font-medium", active > 0 ? "text-gold-400" : "text-warmWhite/30")}>
                    {active} active
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
