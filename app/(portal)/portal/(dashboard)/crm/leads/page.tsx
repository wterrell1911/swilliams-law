"use client"

import { Fragment, useEffect, useState, useCallback } from "react"
import { createClient } from "@/lib/supabase/client"
import { cn } from "@/lib/utils"
import type {
  LeadWithClient,
  CrmClient,
  LeadStatus,
} from "@/lib/types/portal"
import {
  LEAD_STATUS_LABELS,
  LEAD_STATUS_COLORS,
  LEAD_SOURCE_TYPE_LABELS,
} from "@/lib/types/portal"

const STATUS_ORDER: LeadStatus[] = ["new", "contacted", "qualified", "converted", "lost"]

const MARKETING_SOURCES = ["organic", "maps", "paid", "lsa", "direct", "referral"] as const

function formatDate(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" }) +
    ", " +
    d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true })
}

function formatPhone(phone: string): string {
  const digits = phone.replace(/\D/g, "")
  if (digits.length === 10) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
  }
  if (digits.length === 11 && digits.startsWith("1")) {
    return `(${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`
  }
  return phone
}

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${s.toString().padStart(2, "0")}`
}

export default function AllLeadsPage() {
  const [leads, setLeads] = useState<LeadWithClient[]>([])
  const [clients, setClients] = useState<Pick<CrmClient, "id" | "firm_name">[]>([])
  const [loading, setLoading] = useState(true)
  const [expandedRow, setExpandedRow] = useState<string | null>(null)

  // Filters
  const [filterClient, setFilterClient] = useState("")
  const [filterSourceType, setFilterSourceType] = useState("")
  const [filterStatus, setFilterStatus] = useState("")
  const [filterMarketingSource, setFilterMarketingSource] = useState("")

  const fetchLeads = useCallback(async () => {
    setLoading(true)
    try {
      const supabase = createClient()

      let query = supabase
        .from("leads")
        .select("*, clients(firm_name, attorney_name)")
        .order("timestamp", { ascending: false })
        .limit(100)

      if (filterClient) {
        query = query.eq("client_id", filterClient)
      }
      if (filterSourceType) {
        query = query.eq("source_type", filterSourceType)
      }
      if (filterStatus) {
        query = query.eq("status", filterStatus)
      }
      if (filterMarketingSource) {
        query = query.eq("marketing_source", filterMarketingSource)
      }

      const { data, error } = await query

      if (error) {
        console.error("Error fetching leads:", error)
        return
      }

      setLeads((data as LeadWithClient[]) || [])
    } catch (err) {
      console.error("Error fetching leads:", err)
    } finally {
      setLoading(false)
    }
  }, [filterClient, filterSourceType, filterStatus, filterMarketingSource])

  const fetchClients = useCallback(async () => {
    try {
      const supabase = createClient()
      const { data } = await supabase
        .from("clients")
        .select("id, firm_name")
        .order("firm_name")

      if (data) setClients(data)
    } catch (err) {
      console.error("Error fetching clients:", err)
    }
  }, [])

  useEffect(() => {
    fetchClients()
  }, [fetchClients])

  useEffect(() => {
    fetchLeads()
  }, [fetchLeads])

  async function cycleStatus(lead: LeadWithClient) {
    const currentIdx = STATUS_ORDER.indexOf(lead.status)
    const nextIdx = (currentIdx + 1) % STATUS_ORDER.length
    const nextStatus = STATUS_ORDER[nextIdx]

    try {
      const supabase = createClient()
      const { error } = await supabase
        .from("leads")
        .update({ status: nextStatus })
        .eq("id", lead.id)

      if (error) {
        console.error("Error updating status:", error)
        return
      }

      setLeads((prev) =>
        prev.map((l) => (l.id === lead.id ? { ...l, status: nextStatus } : l))
      )
    } catch (err) {
      console.error("Error updating status:", err)
    }
  }

  // Count before limit for display purposes
  const totalCount = leads.length

  const selectClass = "h-9 px-3 text-sm rounded-lg bg-navy-800 border border-navy-600 text-warmWhite focus:outline-none focus:ring-1 focus:ring-gold-500"

  return (
    <div>
      {/* Header */}
      <h1 className="text-2xl font-display font-bold text-warmWhite mb-6">
        All Leads
      </h1>

      {/* Filters Row */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <select
          value={filterClient}
          onChange={(e) => setFilterClient(e.target.value)}
          className={selectClass}
        >
          <option value="">All Clients</option>
          {clients.map((c) => (
            <option key={c.id} value={c.id}>
              {c.firm_name}
            </option>
          ))}
        </select>

        <select
          value={filterSourceType}
          onChange={(e) => setFilterSourceType(e.target.value)}
          className={selectClass}
        >
          <option value="">All Source Types</option>
          <option value="call">Call</option>
          <option value="form">Form</option>
          <option value="chat">Chat</option>
        </select>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className={selectClass}
        >
          <option value="">All Statuses</option>
          {STATUS_ORDER.map((s) => (
            <option key={s} value={s}>
              {LEAD_STATUS_LABELS[s]}
            </option>
          ))}
        </select>

        <select
          value={filterMarketingSource}
          onChange={(e) => setFilterMarketingSource(e.target.value)}
          className={selectClass}
        >
          <option value="">All Marketing Sources</option>
          {MARKETING_SOURCES.map((s) => (
            <option key={s} value={s}>
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Lead Count */}
      <p className="text-sm text-warmWhite/50 mb-3">
        Showing {totalCount} of {totalCount} leads
      </p>

      {/* Loading State */}
      {loading ? (
        <div className="bg-navy-900 border border-navy-700 rounded-xl p-12 text-center">
          <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-gold-500 border-t-transparent" />
          <p className="text-sm text-warmWhite/50 mt-3">Loading leads...</p>
        </div>
      ) : leads.length === 0 ? (
        <div className="bg-navy-900 border border-navy-700 rounded-xl p-12 text-center">
          <p className="text-warmWhite/50">No leads found matching your filters.</p>
        </div>
      ) : (
        /* Leads Table */
        <div className="bg-navy-900 border border-navy-700 rounded-xl overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-navy-800/50 border-b border-navy-700">
                <th className="text-left p-4 text-xs font-medium text-warmWhite/60 uppercase tracking-wider">
                  Date
                </th>
                <th className="text-left p-4 text-xs font-medium text-warmWhite/60 uppercase tracking-wider">
                  Client
                </th>
                <th className="text-left p-4 text-xs font-medium text-warmWhite/60 uppercase tracking-wider">
                  Name
                </th>
                <th className="text-left p-4 text-xs font-medium text-warmWhite/60 uppercase tracking-wider">
                  Phone
                </th>
                <th className="text-left p-4 text-xs font-medium text-warmWhite/60 uppercase tracking-wider">
                  Source Type
                </th>
                <th className="text-left p-4 text-xs font-medium text-warmWhite/60 uppercase tracking-wider">
                  Marketing Source
                </th>
                <th className="text-left p-4 text-xs font-medium text-warmWhite/60 uppercase tracking-wider">
                  Status
                </th>
                <th className="text-left p-4 text-xs font-medium text-warmWhite/60 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-800">
              {leads.map((lead) => (
                <Fragment key={lead.id}>
                  <tr
                    className={cn(
                      "hover:bg-navy-800/50 transition-colors cursor-pointer",
                      expandedRow === lead.id && "bg-navy-800/30"
                    )}
                    onClick={() =>
                      setExpandedRow(expandedRow === lead.id ? null : lead.id)
                    }
                  >
                    <td className="p-4 text-warmWhite/70 whitespace-nowrap">
                      {formatDate(lead.timestamp)}
                    </td>
                    <td className="p-4">
                      <span className="text-warmWhite font-medium">
                        {lead.clients?.firm_name || "Unknown"}
                      </span>
                    </td>
                    <td className="p-4 text-warmWhite/80">
                      {lead.name || <span className="text-warmWhite/30">--</span>}
                    </td>
                    <td className="p-4">
                      {lead.phone ? (
                        <a
                          href={`tel:${lead.phone}`}
                          onClick={(e) => e.stopPropagation()}
                          className="text-gold-500 hover:text-gold-400 transition-colors"
                        >
                          {formatPhone(lead.phone)}
                        </a>
                      ) : (
                        <span className="text-warmWhite/30">--</span>
                      )}
                    </td>
                    <td className="p-4">
                      <span
                        className={cn(
                          "px-2 py-0.5 text-xs font-medium rounded-full",
                          lead.source_type === "call"
                            ? "bg-blue-500/20 text-blue-300"
                            : lead.source_type === "form"
                              ? "bg-purple-500/20 text-purple-300"
                              : "bg-cyan-500/20 text-cyan-300"
                        )}
                      >
                        {LEAD_SOURCE_TYPE_LABELS[lead.source_type]}
                      </span>
                    </td>
                    <td className="p-4">
                      {lead.marketing_source ? (
                        <span className="text-warmWhite/70 text-xs capitalize">
                          {lead.marketing_source}
                        </span>
                      ) : (
                        <span className="text-warmWhite/30 text-xs">--</span>
                      )}
                    </td>
                    <td className="p-4">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          cycleStatus(lead)
                        }}
                        className={cn(
                          "px-2 py-0.5 text-xs font-medium rounded-full transition-opacity hover:opacity-80",
                          LEAD_STATUS_COLORS[lead.status]
                        )}
                        title="Click to cycle status"
                      >
                        {LEAD_STATUS_LABELS[lead.status]}
                      </button>
                    </td>
                    <td className="p-4">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          setExpandedRow(
                            expandedRow === lead.id ? null : lead.id
                          )
                        }}
                        className="text-warmWhite/40 hover:text-warmWhite transition-colors text-xs"
                      >
                        {expandedRow === lead.id ? "Collapse" : "Details"}
                      </button>
                    </td>
                  </tr>

                  {/* Expandable Row Detail */}
                  {expandedRow === lead.id && (
                    <tr>
                      <td colSpan={8} className="p-0">
                        <div className="bg-navy-950/50 p-4 border-t border-navy-800">
                          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-sm">
                            <DetailField
                              label="Email"
                              value={
                                lead.email ? (
                                  <a
                                    href={`mailto:${lead.email}`}
                                    className="text-gold-500 hover:text-gold-400 transition-colors"
                                  >
                                    {lead.email}
                                  </a>
                                ) : null
                              }
                            />
                            <DetailField
                              label="Practice Area"
                              value={lead.practice_area}
                            />
                            <DetailField
                              label="Landing Page"
                              value={
                                lead.landing_page ? (
                                  <span
                                    className="text-warmWhite/70 truncate block max-w-[200px]"
                                    title={lead.landing_page}
                                  >
                                    {lead.landing_page}
                                  </span>
                                ) : null
                              }
                            />
                            <DetailField
                              label="Call Duration"
                              value={
                                lead.call_duration
                                  ? formatDuration(lead.call_duration)
                                  : null
                              }
                            />
                            <DetailField
                              label="UTM Source"
                              value={lead.utm_source}
                            />
                            <DetailField
                              label="UTM Medium"
                              value={lead.utm_medium}
                            />
                            <DetailField
                              label="UTM Campaign"
                              value={lead.utm_campaign}
                            />
                            <DetailField
                              label="Attorney"
                              value={lead.clients?.attorney_name}
                            />
                          </div>

                          {lead.message && (
                            <div className="mt-4">
                              <span className="text-xs font-medium text-warmWhite/40 uppercase tracking-wider">
                                Message
                              </span>
                              <p className="text-sm text-warmWhite/70 mt-1 whitespace-pre-wrap">
                                {lead.message}
                              </p>
                            </div>
                          )}

                          {lead.notes && (
                            <div className="mt-4">
                              <span className="text-xs font-medium text-warmWhite/40 uppercase tracking-wider">
                                Notes
                              </span>
                              <p className="text-sm text-warmWhite/70 mt-1 whitespace-pre-wrap">
                                {lead.notes}
                              </p>
                            </div>
                          )}

                          {lead.call_recording_url && (
                            <div className="mt-4">
                              <a
                                href={lead.call_recording_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 text-sm text-gold-500 hover:text-gold-400 transition-colors"
                              >
                                Listen to Call Recording
                              </a>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

function DetailField({
  label,
  value,
}: {
  label: string
  value: React.ReactNode | string | null | undefined
}) {
  return (
    <div>
      <span className="text-xs font-medium text-warmWhite/40 uppercase tracking-wider">
        {label}
      </span>
      <div className="text-warmWhite/70 mt-0.5">
        {value || <span className="text-warmWhite/20">--</span>}
      </div>
    </div>
  )
}
