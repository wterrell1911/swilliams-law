"use client"

import { useEffect, useState } from "react"
import { StatusBadge } from "@/components/portal/StatusBadge"
import { TypeBadge } from "@/components/portal/TypeBadge"
import { EmptyState } from "@/components/portal/EmptyState"
import { CardSkeleton } from "@/components/portal/LoadingSkeleton"
import { cn } from "@/lib/utils"
import type { Deliverable, DeliverableType, DeliverableStatus } from "@/lib/types/portal"

function getWeekLabel(dateStr: string): string {
  const date = new Date(dateStr)
  const start = new Date(date)
  start.setDate(date.getDate() - date.getDay())
  const end = new Date(start)
  end.setDate(start.getDate() + 6)
  const fmt = (d: Date) => d.toLocaleDateString("en-US", { month: "short", day: "numeric" })
  return `${fmt(start)} — ${fmt(end)}`
}

function getWeekKey(dateStr: string): string {
  const date = new Date(dateStr)
  const start = new Date(date)
  start.setDate(date.getDate() - date.getDay())
  return start.toISOString().split("T")[0]
}

export default function SchedulePage() {
  const [deliverables, setDeliverables] = useState<Deliverable[]>([])
  const [loading, setLoading] = useState(true)
  const [typeFilter, setTypeFilter] = useState<DeliverableType | "all">("all")
  const [statusFilter, setStatusFilter] = useState<DeliverableStatus | "all">("all")

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/portal/deliverables")
        const json = await res.json()
        if (json.data) {
          // Filter to only items with due dates, sorted
          const withDates = (json.data as Deliverable[])
            .filter(d => d.due_date)
            .sort((a, b) => new Date(a.due_date!).getTime() - new Date(b.due_date!).getTime())
          setDeliverables(withDates)
        }
      } catch (error) {
        console.error("Error fetching schedule:", error)
      }
      setLoading(false)
    }
    fetchData()
  }, [])

  const filtered = deliverables.filter((d) => {
    if (typeFilter !== "all" && d.type !== typeFilter) return false
    if (statusFilter !== "all" && d.status !== statusFilter) return false
    return true
  })

  // Group by week
  const byWeek = filtered.reduce<Record<string, Deliverable[]>>((acc, d) => {
    if (!d.due_date) return acc
    const key = getWeekKey(d.due_date)
    if (!acc[key]) acc[key] = []
    acc[key].push(d)
    return acc
  }, {})

  const weeks = Object.keys(byWeek).sort()

  if (loading) {
    return (
      <div>
        <h1 className="text-2xl font-display font-bold text-warmWhite mb-6">Schedule</h1>
        <div className="space-y-4">
          <CardSkeleton />
          <CardSkeleton />
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-display font-bold text-warmWhite">Schedule</h1>
        <div className="flex gap-2">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as DeliverableType | "all")}
            className="h-9 px-3 text-sm rounded-lg bg-navy-800 border border-navy-700 text-warmWhite focus:outline-none"
          >
            <option value="all">All types</option>
            <option value="blog_post">Blog Post</option>
            <option value="social_post">Social Post</option>
            <option value="video">Video</option>
            <option value="newsletter">Newsletter</option>
            <option value="seo_update">SEO Update</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as DeliverableStatus | "all")}
            className="h-9 px-3 text-sm rounded-lg bg-navy-800 border border-navy-700 text-warmWhite focus:outline-none"
          >
            <option value="all">All statuses</option>
            <option value="draft">Draft</option>
            <option value="in_review">In Review</option>
            <option value="approved">Approved</option>
            <option value="scheduled">Scheduled</option>
            <option value="published">Published</option>
          </select>
        </div>
      </div>

      {weeks.length === 0 ? (
        <EmptyState
          title="No scheduled content"
          description="Content with due dates will appear here grouped by week."
        />
      ) : (
        <div className="space-y-6">
          {weeks.map((weekKey) => (
            <div key={weekKey}>
              <h2 className="text-sm font-semibold text-warmWhite/60 uppercase tracking-wider mb-3">
                {getWeekLabel(weekKey)}
              </h2>
              <div className="bg-navy-900 border border-navy-700 rounded-xl overflow-hidden">
                <div className="divide-y divide-navy-800">
                  {byWeek[weekKey].map((d) => (
                    <div key={d.id} className="p-4 flex items-center justify-between hover:bg-navy-800/30">
                      <div className="flex-1 min-w-0 mr-4">
                        <p className="text-sm font-medium text-warmWhite truncate">{d.title}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <TypeBadge type={d.type} />
                          <span className="text-xs text-warmWhite/40">
                            {d.due_date ? new Date(d.due_date).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }) : ""}
                          </span>
                        </div>
                      </div>
                      <StatusBadge status={d.status} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
