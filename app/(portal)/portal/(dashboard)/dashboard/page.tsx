"use client"

import { useEffect, useState } from "react"
import { StatCard } from "@/components/portal/StatCard"
import { StatusBadge } from "@/components/portal/StatusBadge"
import { TypeBadge } from "@/components/portal/TypeBadge"
import { StatCardSkeleton, CardSkeleton } from "@/components/portal/LoadingSkeleton"
import type { Deliverable, Prospect } from "@/lib/types/portal"
import Link from "next/link"

export default function DashboardPage() {
  const [deliverables, setDeliverables] = useState<Deliverable[]>([])
  const [prospects, setProspects] = useState<Prospect[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const [delRes, prospRes] = await Promise.all([
          fetch("/api/portal/deliverables").then(r => r.json()),
          fetch("/api/portal/prospects").then(r => r.json()),
        ])

        if (delRes.data) setDeliverables(delRes.data)
        if (prospRes.data) setProspects(prospRes.data)
      } catch (error) {
        console.error("Error fetching dashboard data:", error)
      }
      setLoading(false)
    }
    fetchData()
  }, [])

  const activeCount = deliverables.filter(
    (d) => !["published", "rejected"].includes(d.status)
  ).length

  const now = new Date()
  const publishedThisMonth = deliverables.filter((d) => {
    if (d.status !== "published" || !d.published_date) return false
    const pub = new Date(d.published_date)
    return pub.getMonth() === now.getMonth() && pub.getFullYear() === now.getFullYear()
  }).length

  const pipelineValue = prospects
    .filter(p => !["won", "lost"].includes(p.status))
    .reduce((sum, p) => sum + (p.estimated_value || 0), 0)

  const activeProspects = prospects.filter(p => !["won", "lost"].includes(p.status)).length

  if (loading) {
    return (
      <div>
        <div className="mb-8">
          <div className="h-8 w-64 bg-navy-800 rounded animate-pulse mb-2" />
          <div className="h-5 w-48 bg-navy-800 rounded animate-pulse" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
          <StatCardSkeleton />
          <StatCardSkeleton />
          <StatCardSkeleton />
          <StatCardSkeleton />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CardSkeleton />
          <CardSkeleton />
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-display font-bold text-warmWhite">
          Welcome back
        </h1>
        <p className="text-warmWhite/60 mt-1">
          {/* TODO: Phase 3 — read firm name from firmConfig */}
          Dashboard
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Active Content" value={activeCount} />
        <StatCard label="Published This Month" value={publishedThisMonth} />
        <StatCard label="Active Prospects" value={activeProspects} />
        <StatCard label="Pipeline Value" value={`$${pipelineValue.toLocaleString()}/mo`} />
      </div>

      {/* Recent Content & Prospects */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Content */}
        <div className="bg-navy-900 border border-navy-700 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-semibold text-warmWhite">Recent Content</h2>
            <Link
              href="/portal/content"
              className="text-xs text-gold-500 hover:text-gold-400 transition-colors"
            >
              View all
            </Link>
          </div>
          {deliverables.length === 0 ? (
            <p className="text-warmWhite/40 text-sm">No content yet</p>
          ) : (
            <div className="space-y-3">
              {deliverables.slice(0, 5).map((d) => (
                <div
                  key={d.id}
                  className="flex items-center justify-between py-2 border-b border-navy-800 last:border-0"
                >
                  <div className="flex-1 min-w-0 mr-4">
                    <p className="text-sm text-warmWhite truncate">{d.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <TypeBadge type={d.type} />
                    </div>
                  </div>
                  <StatusBadge status={d.status} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Prospects */}
        <div className="bg-navy-900 border border-navy-700 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-semibold text-warmWhite">Recent Prospects</h2>
            <Link
              href="/portal/admin/prospects"
              className="text-xs text-gold-500 hover:text-gold-400 transition-colors"
            >
              View all
            </Link>
          </div>
          {prospects.length === 0 ? (
            <p className="text-warmWhite/40 text-sm">No prospects yet</p>
          ) : (
            <div className="space-y-3">
              {prospects.slice(0, 5).map((p) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between py-2 border-b border-navy-800 last:border-0"
                >
                  <div className="flex-1 min-w-0 mr-4">
                    <p className="text-sm text-warmWhite truncate">{p.firm_name}</p>
                    {p.contact_name && (
                      <p className="text-xs text-warmWhite/50">{p.contact_name}</p>
                    )}
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-warmWhite/60 capitalize">{p.status.replace("_", " ")}</span>
                    {p.estimated_value ? (
                      <p className="text-xs text-gold-500">${p.estimated_value.toLocaleString()}/mo</p>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
