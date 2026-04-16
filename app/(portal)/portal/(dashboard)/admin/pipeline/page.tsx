"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { StatusBadge } from "@/components/portal/StatusBadge"
import { TypeBadge } from "@/components/portal/TypeBadge"
import { EmptyState } from "@/components/portal/EmptyState"
import { CardSkeleton } from "@/components/portal/LoadingSkeleton"
import { cn } from "@/lib/utils"
import type { DeliverableWithClient, DeliverableStatus, DeliverableType, Profile } from "@/lib/types/portal"
import { DELIVERABLE_STATUS_LABELS } from "@/lib/types/portal"

const COLUMNS: DeliverableStatus[] = ["draft", "in_review", "approved", "scheduled", "published"]

export default function AdminPipelinePage() {
  const supabase = createClient()
  const [deliverables, setDeliverables] = useState<DeliverableWithClient[]>([])
  const [clients, setClients] = useState<Profile[]>([])
  const [loading, setLoading] = useState(true)
  const [view, setView] = useState<"kanban" | "table">("kanban")
  const [clientFilter, setClientFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState<DeliverableType | "all">("all")
  const [updating, setUpdating] = useState<string | null>(null)

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function fetchData() {
    const [delRes, clientsRes] = await Promise.all([
      supabase.from("deliverables").select("*, profiles(firm_name, contact_name, email)").order("created_at", { ascending: false }),
      supabase.from("profiles").select("*").eq("role", "client"),
    ])
    if (delRes.data) setDeliverables(delRes.data as DeliverableWithClient[])
    if (clientsRes.data) setClients(clientsRes.data as Profile[])
    setLoading(false)
  }

  async function changeStatus(id: string, status: DeliverableStatus) {
    setUpdating(id)
    const res = await fetch("/api/portal/deliverables", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    })
    if (res.ok) {
      setDeliverables((prev) =>
        prev.map((d) => (d.id === id ? { ...d, status } : d))
      )
    }
    setUpdating(null)
  }

  const filtered = deliverables.filter((d) => {
    if (clientFilter !== "all" && d.client_id !== clientFilter) return false
    if (typeFilter !== "all" && d.type !== typeFilter) return false
    return true
  })

  if (loading) {
    return (
      <div>
        <h1 className="text-2xl font-display font-bold text-warmWhite mb-6">Pipeline</h1>
        <div className="grid grid-cols-5 gap-4">
          {COLUMNS.map((c) => <CardSkeleton key={c} />)}
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-display font-bold text-warmWhite">Pipeline</h1>
        <div className="flex gap-1 bg-navy-900 rounded-lg p-1">
          <button
            onClick={() => setView("kanban")}
            className={cn("px-3 py-1.5 text-sm rounded-md transition-colors", view === "kanban" ? "bg-navy-700 text-warmWhite" : "text-warmWhite/50")}
          >
            Kanban
          </button>
          <button
            onClick={() => setView("table")}
            className={cn("px-3 py-1.5 text-sm rounded-md transition-colors", view === "table" ? "bg-navy-700 text-warmWhite" : "text-warmWhite/50")}
          >
            Table
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <select value={clientFilter} onChange={(e) => setClientFilter(e.target.value)} className="h-9 px-3 text-sm rounded-lg bg-navy-800 border border-navy-700 text-warmWhite focus:outline-none focus:ring-1 focus:ring-gold-500">
          <option value="all">All clients</option>
          {clients.map((c) => (
            <option key={c.id} value={c.id}>{c.firm_name || c.email}</option>
          ))}
        </select>
        <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value as DeliverableType | "all")} className="h-9 px-3 text-sm rounded-lg bg-navy-800 border border-navy-700 text-warmWhite focus:outline-none focus:ring-1 focus:ring-gold-500">
          <option value="all">All types</option>
          <option value="blog_post">Blog Post</option>
          <option value="social_post">Social Post</option>
          <option value="video">Video</option>
          <option value="newsletter">Newsletter</option>
          <option value="seo_update">SEO Update</option>
          <option value="reputation">Reputation</option>
        </select>
      </div>

      {view === "kanban" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {COLUMNS.map((status) => {
            const items = filtered.filter((d) => d.status === status)
            return (
              <div key={status} className="bg-navy-900/50 rounded-xl p-3">
                <div className="flex items-center justify-between mb-3 px-1">
                  <StatusBadge status={status} />
                  <span className="text-xs text-warmWhite/40">{items.length}</span>
                </div>
                <div className="space-y-2">
                  {items.map((d) => (
                    <div key={d.id} className="bg-navy-900 border border-navy-700 rounded-lg p-3">
                      <p className="text-sm font-medium text-warmWhite mb-1 line-clamp-2">{d.title}</p>
                      <p className="text-xs text-warmWhite/40 mb-2">{d.profiles?.firm_name}</p>
                      <div className="flex items-center justify-between">
                        <TypeBadge type={d.type} />
                        <select
                          value={d.status}
                          onChange={(e) => changeStatus(d.id, e.target.value as DeliverableStatus)}
                          disabled={updating === d.id}
                          className="text-[11px] bg-navy-800 border border-navy-600 text-warmWhite rounded px-1.5 py-0.5 focus:outline-none"
                        >
                          {COLUMNS.map((s) => (
                            <option key={s} value={s}>{DELIVERABLE_STATUS_LABELS[s]}</option>
                          ))}
                          <option value="rejected">Rejected</option>
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="bg-navy-900 border border-navy-700 rounded-xl overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-700">
                <th className="text-left p-3 text-warmWhite/50 font-medium">Title</th>
                <th className="text-left p-3 text-warmWhite/50 font-medium">Client</th>
                <th className="text-left p-3 text-warmWhite/50 font-medium">Type</th>
                <th className="text-left p-3 text-warmWhite/50 font-medium">Status</th>
                <th className="text-left p-3 text-warmWhite/50 font-medium">Due</th>
                <th className="text-left p-3 text-warmWhite/50 font-medium">Assigned</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-800">
              {filtered.length === 0 ? (
                <tr><td colSpan={6} className="p-8 text-center text-warmWhite/40">No deliverables match filters</td></tr>
              ) : filtered.map((d) => (
                <tr key={d.id} className="hover:bg-navy-800/30">
                  <td className="p-3 text-warmWhite">{d.title}</td>
                  <td className="p-3 text-warmWhite/60">{d.profiles?.firm_name}</td>
                  <td className="p-3"><TypeBadge type={d.type} /></td>
                  <td className="p-3">
                    <select
                      value={d.status}
                      onChange={(e) => changeStatus(d.id, e.target.value as DeliverableStatus)}
                      disabled={updating === d.id}
                      className="text-xs bg-navy-800 border border-navy-600 text-warmWhite rounded px-2 py-1 focus:outline-none"
                    >
                      {COLUMNS.map((s) => (
                        <option key={s} value={s}>{DELIVERABLE_STATUS_LABELS[s]}</option>
                      ))}
                      <option value="rejected">Rejected</option>
                    </select>
                  </td>
                  <td className="p-3 text-warmWhite/50">{d.due_date ? new Date(d.due_date).toLocaleDateString() : "—"}</td>
                  <td className="p-3 text-warmWhite/50">{d.assigned_to || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {filtered.length === 0 && <EmptyState title="No deliverables" description="No items match your current filters." />}
    </div>
  )
}
