"use client"

import { useEffect, useState } from "react"
import { StatusBadge } from "@/components/portal/StatusBadge"
import { TypeBadge } from "@/components/portal/TypeBadge"
import { EmptyState } from "@/components/portal/EmptyState"
import { CardSkeleton } from "@/components/portal/LoadingSkeleton"
import { cn } from "@/lib/utils"
import type { Deliverable, DeliverableStatus } from "@/lib/types/portal"

const TABS: { label: string; filter: DeliverableStatus | "all" }[] = [
  { label: "All", filter: "all" },
  { label: "Published", filter: "published" },
  { label: "Draft", filter: "draft" },
  { label: "In Review", filter: "in_review" },
]

export default function ContentPage() {
  const [deliverables, setDeliverables] = useState<Deliverable[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<DeliverableStatus | "all">("all")

  useEffect(() => {
    fetchDeliverables()
  }, [])

  async function fetchDeliverables() {
    try {
      const res = await fetch("/api/portal/deliverables")
      const json = await res.json()
      if (json.data) setDeliverables(json.data as Deliverable[])
    } catch (error) {
      console.error("Error fetching deliverables:", error)
    }
    setLoading(false)
  }

  const filtered =
    activeTab === "all"
      ? deliverables
      : deliverables.filter((d) => d.status === activeTab)

  if (loading) {
    return (
      <div>
        <h1 className="text-2xl font-display font-bold text-warmWhite mb-6">Content</h1>
        <div className="grid gap-4">
          <CardSkeleton />
          <CardSkeleton />
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-display font-bold text-warmWhite">Content</h1>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-1 bg-navy-900 p-1 rounded-lg mb-6 w-fit">
        {TABS.map((tab) => (
          <button
            key={tab.filter}
            onClick={() => setActiveTab(tab.filter)}
            className={cn(
              "px-4 py-2 text-sm rounded-md transition-colors",
              activeTab === tab.filter
                ? "bg-navy-700 text-warmWhite"
                : "text-warmWhite/50 hover:text-warmWhite"
            )}
          >
            {tab.label}
            <span className="ml-1.5 text-warmWhite/40">
              {tab.filter === "all"
                ? deliverables.length
                : deliverables.filter((d) => d.status === tab.filter).length}
            </span>
          </button>
        ))}
      </div>

      {/* Content list */}
      {filtered.length === 0 ? (
        <EmptyState
          title="No content"
          description={
            activeTab === "all"
              ? "No content items yet."
              : `No items with status "${activeTab.replace("_", " ")}".`
          }
        />
      ) : (
        <div className="bg-navy-900 border border-navy-700 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-navy-700">
                  <th className="text-left p-4 text-warmWhite/50 font-medium">Title</th>
                  <th className="text-left p-4 text-warmWhite/50 font-medium">Type</th>
                  <th className="text-left p-4 text-warmWhite/50 font-medium">Status</th>
                  <th className="text-left p-4 text-warmWhite/50 font-medium">Assigned</th>
                  <th className="text-left p-4 text-warmWhite/50 font-medium">Due</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy-800">
                {filtered.map((d) => (
                  <tr key={d.id} className="hover:bg-navy-800/30">
                    <td className="p-4">
                      <p className="text-warmWhite font-medium">{d.title}</p>
                      {d.notes && (
                        <p className="text-warmWhite/40 text-xs mt-1 line-clamp-1">{d.notes}</p>
                      )}
                    </td>
                    <td className="p-4">
                      <TypeBadge type={d.type} />
                    </td>
                    <td className="p-4">
                      <StatusBadge status={d.status} />
                    </td>
                    <td className="p-4 text-warmWhite/60">{d.assigned_to || "—"}</td>
                    <td className="p-4 text-warmWhite/50">
                      {d.due_date ? new Date(d.due_date).toLocaleDateString() : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
